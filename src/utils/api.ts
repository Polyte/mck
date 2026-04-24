type EndpointKey = "contact" | "chat";
class NonRetriableApiError extends Error {}

const ENDPOINTS: Record<EndpointKey, string[]> = {
  contact: ["/api/contact", "/.netlify/functions/contact"],
  chat: ["/api/chat", "/.netlify/functions/chat"],
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

export async function postToApi<TResponse = any>(
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
        return (parsed as TResponse) ?? ({} as TResponse);
      }

      const message =
        (parsed && typeof parsed === "object" && "message" in parsed && typeof parsed.message === "string"
          ? parsed.message
          : null) ?? `Request failed with status ${response.status}`;

      // Try fallback endpoint for gateway/server errors.
      if (response.status >= 500) {
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
