// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 🔧 Replace with your real env values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const STATUS_COLORS = {
  "New Lead": "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [contractorName, setContractorName] = useState("ServicePoint SA Contractor");

  // Stats
  const [openCount, setOpenCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);

  // 🔌 Load leads for this contractor from Supabase (optional)
  useEffect(() => {
    async function fetchLeads() {
      try {
        if (!supabase) {
          // No Supabase config – use mock data so UI still works
          const mock = [
            {
              id: 1234,
              customer_name: "John Smith",
              service_type: "Plumbing – Fix Sink Leak",
              status: "New Lead",
              budget: "R1 200",
              created_at: "2025-04-20",
              suburb: "Table View",
            },
            {
              id: 1235,
              customer_name: "Ayesha Naidoo",
              service_type: "Electrical – Ceiling Fan Install",
              status: "In Progress",
              budget: "R2 400",
              created_at: "2025-04-18",
              suburb: "Century City",
            },
            {
              id: 1236,
              customer_name: "Pieter van Zyl",
              service_type: "Painting – 2 Rooms",
              status: "Completed",
              budget: "R4 800",
              created_at: "2025-04-12",
              suburb: "Bellville",
            },
            {
              id: 1237,
              customer_name: "Thando Mkhize",
              service_type: "Handyman – General Repairs",
              status: "Cancelled",
              budget: "R950",
              created_at: "2025-04-10",
              suburb: "Observatory",
            },
          ];
          updateStats(mock);
          setLeads(mock);
          setLoading(false);
          return;
        }

        setLoading(true);

        // Example: leads table with "assigned_to" equal to contractor email
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .eq("assigned_to", contractorName); // adjust to your column / value

        if (error) throw error;
        updateStats(data);
        setLeads(data);
      } catch (err) {
        console.error("Error loading leads:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [contractorName]);

  function updateStats(list) {
    const open = list.filter((l) => l.status === "New Lead").length;
    const prog = list.filter((l) => l.status === "In Progress").length;
    const comp = list.filter((l) => l.status === "Completed").length;
    const canc = list.filter((l) => l.status === "Cancelled").length;

    setOpenCount(open);
    setInProgressCount(prog);
    setCompletedCount(comp);
    setCancelledCount(canc);
  }

  const filteredLeads =
    filteredStatus === "All"
      ? leads
      : leads.filter((l) => l.status === filteredStatus);

  const chartData = [
    { name: "Open", value: openCount },
    { name: "In Progress", value: inProgressCount },
    { name: "Completed", value: completedCount },
    { name: "Cancelled", value: cancelledCount },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-500 text-white flex flex-col">
        <div className="px-6 py-5 border-b border-emerald-400 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">
            SP
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide opacity-80">
              ServicePoint SA
            </p>
            <p className="font-semibold">Contractor Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <SidebarLink label="Dashboard" active />
          <SidebarLink label="My Jobs" />
          <SidebarLink label="Calendar" />
          <SidebarLink label="Payments" />
          <SidebarLink label="Support" />
        </nav>

        <div className="px-4 py-4 border-t border-emerald-400 text-xs opacity-80">
          Logged in as
          <div className="font-semibold truncate">{contractorName}</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/70 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold">Welcome back, contractor 👋</h1>
            <p className="text-xs text-slate-400">
              Track your ServicePoint SA leads and jobs in one place.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-3 py-1.5 text-xs rounded-full border border-slate-700 hover:border-emerald-400 hover:text-emerald-300 transition">
              View main site
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-semibold">
                SP
              </div>
              <div className="text-xs">
                <div className="font-medium">{contractorName}</div>
                <div className="text-slate-400">ServicePoint SA</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6 bg-slate-950">
          {/* Stats row */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="New Leads"
              value={openCount}
              badge="Today"
              color="bg-blue-500/10 text-blue-300 border-blue-500/40"
            />
            <StatCard
              title="In Progress"
              value={inProgressCount}
              badge="On the go"
              color="bg-amber-500/10 text-amber-300 border-amber-500/40"
            />
            <StatCard
              title="Completed Jobs"
              value={completedCount}
              badge="This month"
              color="bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
            />
            <StatCard
              title="Cancelled"
              value={cancelledCount}
              badge="Need review"
              color="bg-rose-500/10 text-rose-300 border-rose-500/40"
            />
          </section>

          {/* Chart + quick info */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-semibold">
                    Job pipeline overview
                  </h2>
                  <p className="text-xs text-slate-400">
                    Quick view of your current workload.
                  </p>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #1e293b",
                        borderRadius: "0.75rem",
                        fontSize: "0.75rem",
                      }}
                    />
                    <Bar dataKey="value" fill="#22c55e" radius={6} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col gap-3">
              <h2 className="text-sm font-semibold">Today&apos;s summary</h2>
              <SummaryRow label="Site visits booked" value="3" />
              <SummaryRow label="Quotes waiting" value="2" />
              <SummaryRow label="Average response time" value="18 min" />
              <SummaryRow label="Rating (last 10 jobs)" value="4.8 / 5" />
            </div>
          </section>

          {/* Filters + table */}
          <section className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold">Assigned jobs</h2>
                <p className="text-xs text-slate-400">
                  Leads that ServicePoint SA has routed to you.
                </p>
              </div>
              <div className="flex gap-2">
                {["All", "New Lead", "In Progress", "Completed", "Cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setFilteredStatus(status)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition ${
                        filteredStatus === status
                          ? "border-emerald-400 text-emerald-200 bg-emerald-500/10"
                          : "border-slate-700 text-slate-300 hover:border-emerald-400/70 hover:text-emerald-200"
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-800/60 text-slate-300">
                  <tr>
                    <th className="py-2 px-3 text-left font-medium">Job #</th>
                    <th className="py-2 px-3 text-left font-medium">
                      Customer
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Service
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Area
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Budget
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Status
                    </th>
                    <th className="py-2 px-3 text-left font-medium">
                      Created
                    </th>
                    <th className="py-2 px-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-6 text-center text-slate-400"
                      >
                        Loading jobs…
                      </td>
                    </tr>
                  )}

                  {!loading && filteredLeads.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-6 text-center text-slate-400"
                      >
                        No jobs in this status yet.
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-t border-slate-800 hover:bg-slate-800/40"
                      >
                        <td className="py-2 px-3 whitespace-nowrap text-slate-300">
                          #{lead.id}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          {lead.customer_name}
                        </td>
                        <td className="py-2 px-3 min-w-[180px]">
                          {lead.service_type}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          {lead.suburb || "-"}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          {lead.budget || "TBC"}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                              STATUS_COLORS[lead.status] ||
                              "bg-slate-700 text-slate-100"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap text-slate-400">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-3 text-right whitespace-nowrap">
                          <button className="px-2 py-1 mr-1 rounded border border-slate-700 text-[11px] hover:border-emerald-400">
                            View
                          </button>
                          <button className="px-2 py-1 rounded border border-slate-700 text-[11px] hover:border-emerald-400">
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ label, active }) {
  return (
    <button
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
        active
          ? "bg-emerald-600/90 font-semibold shadow-sm"
          : "hover:bg-emerald-600/40"
      }`}
    >
      <span>{label}</span>
      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-200 shadow-sm" />
      )}
    </button>
  );
}

function StatCard({ title, value, badge, color }) {
  return (
    <div className={`rounded-2xl border p-4 ${color || "border-slate-800"}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">
          {title}
        </p>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/70 border border-slate-700 text-slate-300">
          {badge}
        </span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-300">{label}</span>
      <span className="font-semibold text-emerald-300">{value}</span>
    </div>
  );
}
