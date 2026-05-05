type EndpointKey = "contact" | "chat";
class NonRetriableApiError extends Error {}

function apiBase(): string {
  const raw = typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL;
  if (!raw || typeof raw !== "string") return "";
  return raw.replace(/\/+$/, "");
}

function prefixPath(path: string): string {
  const base = apiBase();
  return base ? `${base}${path}` : path;
}

const ENDPOINTS: Record<EndpointKey, string[]> = {
  contact: [prefixPath("/api/contact"), prefixPath("/.netlify/functions/contact")],
  chat: [prefixPath("/api/chat"), prefixPath("/.netlify/functions/chat")],
};

async function safeJsonParse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function shouldTryAlternateUrl(status: number): boolean {
  return status === 404 || status === 405 || status === 408 || status >= 500;
}

export async function postToApi<TResponse = unknown>(
  endpoint: EndpointKey,
  payload: unknown,
): Promise<TResponse> {
  let lastError: Error | null = null;

  for (const url of ENDPOINTS[endpoint]) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const parsed = await safeJsonParse(response);

      if (response.ok) {
        const ct = (response.headers.get("content-type") ?? "").toLowerCase();
        if (!ct.includes("application/json")) {
          lastError = new Error(
            ct.includes("text/html")
              ? "The server returned a web page instead of JSON (often static hosting without an API). Use Netlify with functions, run server.js behind nginx, or use the production Docker image."
              : "The server returned an unexpected content type (expected JSON).",
          );
          continue;
        }
        if (parsed === null) {
          lastError = new Error("The server returned an empty JSON body.");
          continue;
        }
        return parsed as TResponse;
      }

      const message =
        (parsed && typeof parsed === "object" && "message" in parsed && typeof parsed.message === "string"
          ? parsed.message
          : null) ?? `Request failed with status ${response.status}`;

      if (shouldTryAlternateUrl(response.status)) {
        lastError = new Error(message);
        continue;
      }

      throw new NonRetriableApiError(message);
    } catch (error) {
      if (error instanceof NonRetriableApiError) {
        throw error;
      }
      lastError = error instanceof Error ? error : new Error("Request failed");
    }
  }

  throw lastError ?? new Error("Request failed");
}
