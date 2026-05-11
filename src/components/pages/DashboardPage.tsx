import { memo, useEffect, useMemo, useState } from "react";
import { PageHeader } from "../PageHeader";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  BarChart3,
  Bot,
  Contact,
  Mail,
  MessageSquare,
  Phone,
  RefreshCcw,
  TrendingUp,
  Users,
  Bell,
} from "lucide-react";

interface DashboardStats {
  enquiries: number;
  chatbotLeads: number;
  websiteLeads: number;
  chatSessions: number;
  chatMessages: number;
  chatbotContactCaptures: number;
  successfulSessions: number;
  failedSessions: number;
  averageUserMessagesPerSession: number;
  lastUpdatedAt: string;
}

interface Enquiry {
  id: string;
  source: "chatbot" | "website-form";
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  createdAt: string;
}

interface ChatbotContact {
  id: string;
  emails: string[];
  phones: string[];
  message: string;
  createdAt: string;
}

interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  formEnquiries: Enquiry[];
  chatbotContacts: ChatbotContact[];
  chatActivity: {
    id: string;
    userMessageCount: number;
    success: boolean;
    createdAt: string;
  }[];
  conversations: {
    id: string;
    sessionId: string;
    userMessage: string;
    assistantReply: string;
    success: boolean;
    byAdmin?: boolean;
    adminName?: string;
    createdAt: string;
  }[];
  liveSessions?: Record<
    string,
    {
      takeoverActive?: boolean;
      adminName?: string;
      adminMessages?: { id: string; message: string; adminName?: string; createdAt: string }[];
    }
  >;
}

function formatDateTime(iso: string): string {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-ZA");
}

function sourceBadge(source: Enquiry["source"]): string {
  return source === "chatbot" ? "Chatbot" : "Website Form";
}

const DashboardPage = memo(() => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<"all" | "chatbot" | "website-form">("all");
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "7d" | "30d">("all");
  const [enquiryPage, setEnquiryPage] = useState(1);
  const [contactPage, setContactPage] = useState(1);
  const [adminName, setAdminName] = useState("Agent");
  const [adminToken, setAdminToken] = useState(() => {
    try {
      return window.localStorage.getItem("mck_dashboard_admin_token") || "";
    } catch {
      return "";
    }
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [routePin, setRoutePin] = useState("");
  const [routeUnlocked, setRouteUnlocked] = useState(() => {
    try {
      return window.localStorage.getItem("mck_dashboard_unlocked") === "yes";
    } catch {
      return false;
    }
  });
  const [routePinError, setRoutePinError] = useState<string | null>(null);
  const [adminDrafts, setAdminDrafts] = useState<Record<string, string>>({});
  const [unreadBySession, setUnreadBySession] = useState<Record<string, number>>({});
  const [lastSeenBySession, setLastSeenBySession] = useState<Record<string, string>>(() => {
    try {
      const raw = window.localStorage.getItem("mck_dashboard_last_seen");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const pageSize = 8;

  const loadDashboard = async (options?: { silent?: boolean }) => {
    const isSilent = Boolean(options?.silent);
    if (isSilent) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setError(null);
    }
    try {
      const response = await fetch("/api/dashboard", {
        headers: adminToken ? { "x-dashboard-token": adminToken } : {},
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || `Request failed with status ${response.status}`);
      }
      const parsed = (await response.json()) as DashboardResponse;
      const responseData = parsed;
      setData(responseData);
    } catch (err) {
      if (!isSilent) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      }
    } finally {
      if (isSilent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (routeUnlocked) loadDashboard();
  }, [routeUnlocked]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (routeUnlocked) loadDashboard({ silent: true });
    }, 2500);
    return () => window.clearInterval(timer);
  }, [routeUnlocked, adminToken]);

  useEffect(() => {
    try {
      window.localStorage.setItem("mck_dashboard_admin_token", adminToken);
    } catch {
      // ignore storage issues
    }
  }, [adminToken]);

  const statsCards = useMemo(() => {
    if (!data) return [];
    return [
      {
        label: "Total Leads",
        value: data.stats.enquiries,
        icon: Users,
        helper: `${data.stats.chatbotLeads} via chatbot`,
      },
      {
        label: "Chatbot Leads",
        value: data.stats.chatbotLeads,
        icon: Bot,
        helper: "Lead form from chatbot",
      },
      {
        label: "Website Leads",
        value: data.stats.websiteLeads,
        icon: Contact,
        helper: "Main contact page",
      },
      {
        label: "Chat Sessions",
        value: data.stats.chatSessions,
        icon: MessageSquare,
        helper: `${data.stats.successfulSessions} successful`,
      },
      {
        label: "Chat Messages",
        value: data.stats.chatMessages,
        icon: BarChart3,
        helper: `${data.stats.averageUserMessagesPerSession} avg per session`,
      },
      {
        label: "Contact Captures",
        value: data.stats.chatbotContactCaptures,
        icon: TrendingUp,
        helper: "Email/phone detected in chat",
      },
    ];
  }, [data]);

  const leadSplit = useMemo(() => {
    if (!data) return { chatbotPct: 0, websitePct: 0 };
    const total = Math.max(data.stats.enquiries, 1);
    return {
      chatbotPct: Math.round((data.stats.chatbotLeads / total) * 100),
      websitePct: Math.round((data.stats.websiteLeads / total) * 100),
    };
  }, [data]);

  const sessionTrend = useMemo(() => {
    if (!data?.chatActivity) return [];
    const now = new Date();
    const days = Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - idx));
      const key = d.toISOString().slice(0, 10);
      return { key, label: d.toLocaleDateString("en-ZA", { weekday: "short" }), count: 0 };
    });
    const index = new Map(days.map((d, idx) => [d.key, idx]));
    data.chatActivity.forEach((entry) => {
      const key = new Date(entry.createdAt).toISOString().slice(0, 10);
      const idx = index.get(key);
      if (idx !== undefined) days[idx].count += 1;
    });
    return days;
  }, [data]);

  const filteredEnquiries = useMemo(() => {
    if (!data) return [];
    const now = Date.now();
    const queryValue = query.trim().toLowerCase();
    return data.formEnquiries.filter((entry) => {
      if (sourceFilter !== "all" && entry.source !== sourceFilter) return false;
      if (dateFilter !== "all") {
        const maxAge = dateFilter === "7d" ? 7 : 30;
        const ageMs = now - new Date(entry.createdAt).getTime();
        if (ageMs > maxAge * 24 * 60 * 60 * 1000) return false;
      }
      if (!queryValue) return true;
      return [
        entry.name,
        entry.email,
        entry.phone,
        entry.projectType,
        entry.message,
      ]
        .join(" ")
        .toLowerCase()
        .includes(queryValue);
    });
  }, [data, sourceFilter, dateFilter, query]);

  const filteredContacts = useMemo(() => {
    if (!data) return [];
    const queryValue = query.trim().toLowerCase();
    if (!queryValue) return data.chatbotContacts;
    return data.chatbotContacts.filter((entry) =>
      [entry.message, ...entry.emails, ...entry.phones].join(" ").toLowerCase().includes(queryValue),
    );
  }, [data, query]);

  const pagedEnquiries = useMemo(() => {
    const start = (enquiryPage - 1) * pageSize;
    return filteredEnquiries.slice(start, start + pageSize);
  }, [filteredEnquiries, enquiryPage]);

  const pagedContacts = useMemo(() => {
    const start = (contactPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, contactPage]);

  const enquiryTotalPages = Math.max(1, Math.ceil(filteredEnquiries.length / pageSize));
  const contactTotalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));
  const groupedConversations = useMemo(() => {
    if (!data?.conversations) return [];
    const map = new Map<string, DashboardResponse["conversations"]>();
    data.conversations.forEach((entry) => {
      const key = entry.sessionId || "anonymous";
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(entry);
    });
    return Array.from(map.entries()).map(([sessionId, entries]) => ({
      sessionId,
      entries: entries.slice(0, 8),
      latestAt: entries[0]?.createdAt || "",
      takeoverActive: Boolean(data.liveSessions?.[sessionId]?.takeoverActive),
    }));
  }, [data]);

  useEffect(() => {
    if (!groupedConversations.length) return;
    const nextUnread: Record<string, number> = {};
    let hasNew = false;
    groupedConversations.forEach((session) => {
      const seenAt = lastSeenBySession[session.sessionId] || "";
      const unseen = session.entries.filter(
        (entry) =>
          entry.userMessage &&
          !entry.byAdmin &&
          (!seenAt || new Date(entry.createdAt).getTime() > new Date(seenAt).getTime()),
      ).length;
      nextUnread[session.sessionId] = unseen;
      if (unseen > 0) hasNew = true;
    });
    setUnreadBySession(nextUnread);
    if (hasNew) {
      try {
        const ctx = new window.AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.03;
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch {
        // ignore audio errors
      }
    }
  }, [groupedConversations, lastSeenBySession]);

  const toggleTakeover = async (sessionId: string, active: boolean) => {
    setAuthError(null);
    const response = await fetch("/api/dashboard/takeover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-dashboard-token": adminToken,
      },
      body: JSON.stringify({ sessionId, active, adminName }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setAuthError(payload?.message || "Takeover action failed");
      return;
    }
    await loadDashboard();
  };

  const unlockDashboard = async () => {
    setRoutePinError(null);
    try {
      const response = await fetch("/api/dashboard/auth", {
        headers: routePin ? { "x-dashboard-token": routePin } : {},
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setRoutePinError(payload?.message || "Invalid PIN/token");
        return;
      }
      setAdminToken(routePin);
      setRouteUnlocked(true);
      try {
        window.localStorage.setItem("mck_dashboard_unlocked", "yes");
        window.localStorage.setItem("mck_dashboard_admin_token", routePin);
      } catch {
        // ignore storage errors
      }
      await loadDashboard();
    } catch {
      setRoutePinError("Unable to verify PIN right now.");
    }
  };

  const downloadCsv = (filename: string, rows: string[][]) => {
    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportEnquiriesCsv = () => {
    const rows = [
      ["ID", "Source", "Name", "Email", "Phone", "ProjectType", "Message", "CreatedAt"],
      ...filteredEnquiries.map((entry) => [
        entry.id,
        entry.source,
        entry.name,
        entry.email,
        entry.phone,
        entry.projectType,
        entry.message,
        entry.createdAt,
      ]),
    ];
    downloadCsv("enquiries-export.csv", rows);
  };

  const exportConversationsCsv = () => {
    const rows = [
      ["ID", "SessionId", "UserMessage", "AssistantReply", "ByAdmin", "Success", "CreatedAt"],
      ...(data?.conversations || []).map((entry) => [
        entry.id,
        entry.sessionId,
        entry.userMessage,
        entry.assistantReply,
        entry.byAdmin ? "yes" : "no",
        entry.success ? "yes" : "no",
        entry.createdAt,
      ]),
    ];
    downloadCsv("conversations-export.csv", rows);
  };

  const sendAdminReply = async (sessionId: string) => {
    const message = (adminDrafts[sessionId] || "").trim();
    if (!message) return;
    setAuthError(null);
    const response = await fetch("/api/dashboard/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-dashboard-token": adminToken,
      },
      body: JSON.stringify({ sessionId, message, adminName }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setAuthError(payload?.message || "Reply failed");
      return;
    }
    setAdminDrafts((prev) => ({ ...prev, [sessionId]: "" }));
    await loadDashboard();
  };

  const markSessionRead = (sessionId: string, latestAt: string) => {
    const next = { ...lastSeenBySession, [sessionId]: latestAt };
    setLastSeenBySession(next);
    try {
      window.localStorage.setItem("mck_dashboard_last_seen", JSON.stringify(next));
    } catch {
      // ignore storage issues
    }
  };

  useEffect(() => {
    setEnquiryPage(1);
    setContactPage(1);
  }, [query, sourceFilter, dateFilter]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <PageHeader
        title="Operations Dashboard"
        subtitle="Leads & Chatbot Analytics"
        description="Track chatbot performance, form enquiries, and all captured contact details in one place."
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
        breadcrumbs={[{ label: "Home", href: "home" }, { label: "Dashboard" }]}
      />

      {!routeUnlocked ? (
        <section className="section-padding text-slate-900 dark:text-slate-100">
          <div className="max-w-md mx-auto container-padding">
            <Card className="border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Dashboard Access</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Enter your dashboard PIN/token to unlock monitoring tools.
                </p>
                <input
                  type="password"
                  value={routePin}
                  onChange={(e) => setRoutePin(e.target.value)}
                  placeholder="Dashboard PIN"
                  className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
                />
                {routePinError && <p className="text-xs text-red-600">{routePinError}</p>}
                <Button onClick={unlockDashboard} className="w-full">
                  Unlock Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
      <section className="section-padding text-slate-900 dark:text-slate-100">
        <div className="max-w-7xl mx-auto container-padding space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:bg-slate-900 dark:border-slate-700">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">Live Dashboard</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last updated: {data?.stats?.lastUpdatedAt ? formatDateTime(data.stats.lastUpdatedAt) : "-"}
              </p>
            </div>
            <Button onClick={() => loadDashboard({ silent: true })} disabled={loading || refreshing} className="bg-slate-900 hover:bg-slate-800 text-white">
              <RefreshCcw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {loading && (
            <Card className="border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
              <CardContent className="p-8 text-center text-slate-600 dark:text-slate-300">Loading dashboard data...</CardContent>
            </Card>
          )}
          {error && (
            <Card className="border border-red-200 bg-red-50">
              <CardContent className="p-8 text-center text-red-700">{error}</CardContent>
            </Card>
          )}

          {!loading && !error && data && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {statsCards.map((card) => (
                  <Card
                    key={card.label}
                    className="border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{card.label}</p>
                          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{card.value}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{card.helper}</p>
                        </div>
                        <div className="h-11 w-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                          <card.icon className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Lead Source Split</h3>
                      <Badge className="bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600">Distribution</Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300">Chatbot</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{leadSplit.chatbotPct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-2 bg-orange-500 rounded-full" style={{ width: `${leadSplit.chatbotPct}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300">Website Form</span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{leadSplit.websitePct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-2 bg-slate-700 rounded-full" style={{ width: `${leadSplit.websitePct}%` }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">7-Day Session Trend</h3>
                      <Badge className="bg-sky-50 text-sky-700 border border-sky-200">Sessions</Badge>
                    </div>
                    <div className="h-28 flex items-end gap-2">
                      {sessionTrend.map((point) => {
                        const maxCount = Math.max(...sessionTrend.map((p) => p.count), 1);
                        const height = Math.max(8, Math.round((point.count / maxCount) * 100));
                        return (
                          <div key={point.key} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full rounded-t-md bg-sky-500/80 hover:bg-sky-600 transition-colors" style={{ height: `${height}%` }} />
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">{point.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                <CardContent className="p-4 text-slate-900 dark:text-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name, phone, email, message..."
                      className="md:col-span-2 h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-orange-200 bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
                    />
                    <select
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value as "all" | "chatbot" | "website-form")}
                      className="h-10 rounded-lg border border-slate-300 px-3 text-sm bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
                    >
                      <option value="all">All sources</option>
                      <option value="chatbot">Chatbot</option>
                      <option value="website-form">Website Form</option>
                    </select>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value as "all" | "7d" | "30d")}
                      className="h-10 rounded-lg border border-slate-300 px-3 text-sm bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
                    >
                      <option value="all">All time</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                <CardContent className="p-6 text-slate-900 dark:text-slate-100">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Chatbot Performance</h3>
                    <Badge className="bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600">Session Health</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Successful Sessions</p>
                      <p className="mt-2 text-2xl font-bold text-emerald-900">{data.stats.successfulSessions}</p>
                    </div>
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-rose-700 font-semibold">Failed Sessions</p>
                      <p className="mt-2 text-2xl font-bold text-rose-900">{data.stats.failedSessions}</p>
                    </div>
                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-sky-700 font-semibold">Avg Messages / Session</p>
                      <p className="mt-2 text-2xl font-bold text-sky-900">{data.stats.averageUserMessagesPerSession}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Live Conversation Monitor</h3>
                    <div className="flex items-center gap-2">
                      <input
                        value={adminToken}
                        onChange={(e) => setAdminToken(e.target.value)}
                        placeholder="Admin token"
                        className="h-8 rounded border border-slate-300 px-2 text-xs bg-white text-slate-900"
                      />
                      <input
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="Agent name"
                        className="h-8 rounded border border-slate-300 px-2 text-xs bg-white text-slate-900"
                      />
                      <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {groupedConversations.length} active sessions
                      </Badge>
                      <Button size="sm" variant="outline" onClick={exportConversationsCsv}>
                        Export Conversations CSV
                      </Button>
                    </div>
                  </div>
                  {authError && <div className="px-5 py-2 text-xs text-red-600">{authError}</div>}
                  {groupedConversations.length === 0 ? (
                    <div className="p-6 text-slate-600 dark:text-slate-300">No conversation activity yet.</div>
                  ) : (
                    <div className="max-h-[520px] overflow-auto divide-y divide-slate-100 dark:divide-slate-800">
                      {groupedConversations.map((session) => (
                        <div key={session.sessionId} className="p-5 hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/60">
                          <div className="flex items-center justify-between mb-3 gap-2">
                            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              Session: <span className="font-mono text-xs">{session.sessionId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {(unreadBySession[session.sessionId] || 0) > 0 && (
                                <Badge className="bg-red-100 text-red-700 border border-red-200">
                                  <Bell className="w-3.5 h-3.5 mr-1" />
                                  {unreadBySession[session.sessionId]} new
                                </Badge>
                              )}
                              <Badge className={session.takeoverActive ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-slate-100 text-slate-700 border border-slate-200"}>
                                {session.takeoverActive ? "Takeover Active" : "Bot Active"}
                              </Badge>
                              <Button size="sm" variant="outline" onClick={() => markSessionRead(session.sessionId, session.latestAt)}>
                                Mark Read
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleTakeover(session.sessionId, !session.takeoverActive)}
                              >
                                {session.takeoverActive ? "Release Bot" : "Take Over"}
                              </Button>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{formatDateTime(session.latestAt)}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 mb-3">
                            {[
                              "Hi, this is support. I’m taking over your chat now.",
                              "Thanks for your message. Could you share your phone number?",
                              "We can help right away. Are you available for a call?",
                            ].map((preset) => (
                              <Button
                                key={preset}
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setAdminDrafts((prev) => ({ ...prev, [session.sessionId]: preset }))
                                }
                              >
                                Quick Reply
                              </Button>
                            ))}
                          </div>
                          <div className="flex gap-2 mb-3">
                            <input
                              value={adminDrafts[session.sessionId] || ""}
                              onChange={(e) =>
                                setAdminDrafts((prev) => ({ ...prev, [session.sessionId]: e.target.value }))
                              }
                              placeholder="Type message as human agent..."
                              className="flex-1 h-9 rounded border border-slate-300 px-3 text-sm bg-white text-slate-900"
                            />
                            <Button size="sm" onClick={() => sendAdminReply(session.sessionId)}>
                              Send
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {session.entries.map((entry) => {
                              const hasUser = Boolean(entry.userMessage && entry.userMessage.trim());
                              const hasReply = Boolean(entry.assistantReply && entry.assistantReply.trim());
                              if (!hasUser && !hasReply) return null;
                              return (
                                <div key={entry.id} className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-900">
                                  {hasUser && (
                                    <>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">User</p>
                                      <p className="text-sm text-slate-800 dark:text-slate-200">{entry.userMessage}</p>
                                    </>
                                  )}
                                  {hasReply && (
                                    <>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-1">
                                        {entry.byAdmin ? (entry.adminName ? `Human Agent (${entry.adminName})` : "Human Agent") : "Bot"}
                                      </p>
                                      <p className="text-sm text-slate-800 dark:text-slate-200">{entry.assistantReply}</p>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">All Form Enquiries</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-50 text-orange-700 border border-orange-200">
                        {filteredEnquiries.length} records
                      </Badge>
                      <Button size="sm" variant="outline" onClick={exportEnquiriesCsv}>
                        Export Enquiries CSV
                      </Button>
                    </div>
                  </div>
                  {filteredEnquiries.length === 0 ? (
                    <div className="p-6 text-slate-600 dark:text-slate-300">No enquiries yet.</div>
                  ) : (
                    <div className="overflow-x-auto text-slate-900 dark:text-slate-100">
                      <div className="min-w-[860px]">
                        <div className="grid grid-cols-12 gap-3 border-b border-slate-200 bg-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                          <div className="col-span-2">Name</div>
                          <div className="col-span-2">Contact</div>
                          <div className="col-span-2">Source</div>
                          <div className="col-span-2">Project</div>
                          <div className="col-span-2">Message</div>
                          <div className="col-span-2">Date</div>
                        </div>
                      {pagedEnquiries.map((enquiry) => (
                          <div
                            key={enquiry.id}
                            className="grid grid-cols-12 gap-3 border-b border-slate-100 px-5 py-4 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:border-slate-800"
                          >
                            <div className="col-span-2 font-semibold text-slate-900 dark:text-slate-100">{enquiry.name || "Unknown"}</div>
                            <div className="col-span-2 space-y-1 text-xs">
                              <p className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {enquiry.phone || "-"}
                              </p>
                              <p className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                {enquiry.email || "-"}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                {sourceBadge(enquiry.source)}
                              </Badge>
                            </div>
                            <div className="col-span-2 truncate">{enquiry.projectType || "-"}</div>
                            <div className="col-span-2 text-xs text-slate-600 line-clamp-2">
                              {enquiry.message || "-"}
                            </div>
                            <div className="col-span-2 text-xs text-slate-500 dark:text-slate-400">{formatDateTime(enquiry.createdAt)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {filteredEnquiries.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Page {enquiryPage} of {enquiryTotalPages}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={enquiryPage <= 1}
                          onClick={() => setEnquiryPage((p) => Math.max(1, p - 1))}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={enquiryPage >= enquiryTotalPages}
                          onClick={() => setEnquiryPage((p) => Math.min(enquiryTotalPages, p + 1))}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-700">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Contact Captured From Chatbot</h3>
                    <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {filteredContacts.length} captures
                    </Badge>
                  </div>
                  {filteredContacts.length === 0 ? (
                    <div className="p-6 text-slate-600 dark:text-slate-300">No chatbot contact details captured yet.</div>
                  ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                      {pagedContacts.map((entry) => (
                        <div key={entry.id} className="p-5 hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/60">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">Captured Contact</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{formatDateTime(entry.createdAt)}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {entry.emails.length ? (
                              entry.emails.map((email) => (
                                <Badge key={`${entry.id}-${email}`} className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <Mail className="w-3.5 h-3.5 mr-1" />
                                  {email}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="secondary">No email captured</Badge>
                            )}
                            {entry.phones.length ? (
                              entry.phones.map((phone) => (
                                <Badge key={`${entry.id}-${phone}`} className="bg-sky-50 text-sky-700 border border-sky-200">
                                  <Phone className="w-3.5 h-3.5 mr-1" />
                                  {phone}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="secondary">No phone captured</Badge>
                            )}
                          </div>
                          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                            {entry.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {filteredContacts.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Page {contactPage} of {contactTotalPages}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={contactPage <= 1}
                          onClick={() => setContactPage((p) => Math.max(1, p - 1))}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={contactPage >= contactTotalPages}
                          onClick={() => setContactPage((p) => Math.min(contactTotalPages, p + 1))}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
      )}
    </div>
  );
});

DashboardPage.displayName = "DashboardPage";

export { DashboardPage };
