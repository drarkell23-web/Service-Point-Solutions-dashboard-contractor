// CONTRACTOR DASHBOARD — PREMIUM VERSION
// matches your directory structure exactly

import StatCard from "../components/statcard.jsx";
import LeadsTable from "../components/leadstable.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import TopBar from "../components/topBar.jsx";

// Small bar chart used in the analytics section
function BarChart({ light }) {
  const bars = [60, 80, 55, 70, 90, 65, 75, 50, 85, 40, 60, 72];

  return (
    <div className="flex h-40 items-end justify-between gap-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-full ${
            light
              ? "bg-violet-200"
              : "bg-gradient-to-t from-violet-600 to-violet-400"
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

// Mini customer order table (bottom-right)
function MiniTable() {
  const rows = [
    {
      name: "Kabelo M.",
      city: "Cape Town",
      date: "22.08.2022",
      status: "Delivered",
      price: "R 5 920",
    },
    {
      name: "Noluthando P.",
      city: "Johannesburg",
      date: "24.08.2022",
      status: "In progress",
      price: "R 8 410",
    },
    {
      name: "Thabo L.",
      city: "Durban",
      date: "26.08.2022",
      status: "Pending",
      price: "R 3 100",
    },
    {
      name: "Mieke S.",
      city: "Pretoria",
      date: "27.08.2022",
      status: "Delivered",
      price: "R 10 230",
    },
  ];

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white text-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-[1.5fr_1fr_1.1fr_1fr_1fr] bg-slate-50 px-4 py-2 font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <span>Customer</span>
        <span>City</span>
        <span>Date</span>
        <span>Status</span>
        <span className="text-right">Price</span>
      </div>

      {rows.map((row, idx) => (
        <div
          key={row.name}
          className={`grid grid-cols-[1.5fr_1fr_1.1fr_1fr_1fr] px-4 py-2 text-[11px] ${
            idx % 2 === 0
              ? "bg-white dark:bg-slate-900"
              : "bg-slate-50 dark:bg-slate-950"
          }`}
        >
          <span className="font-medium text-slate-800 dark:text-slate-50">
            {row.name}
          </span>
          <span>{row.city}</span>
          <span>{row.date}</span>

          <span
            className={`rounded-full px-2 py-[2px] text-center text-[10px] font-semibold ${
              row.status === "Delivered"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                : row.status === "In progress"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-200"
            }`}
          >
            {row.status}
          </span>

          <span className="text-right font-medium text-slate-900 dark:text-slate-50">
            {row.price}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ContractorDashboard() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBar />

        {/* ============ MAIN CONTENT ============ */}
        <div className="p-6 space-y-6">

          {/* === TOP FOUR CARDS === */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard
              title="Jobs Completed"
              value="201"
              label="last 30 days"
              trend="+8.2% vs previous"
              trendColor="text-emerald-500"
            />
            <StatCard
              title="Approved Quotes"
              value="36"
              label="awaiting invoice"
              trend="+3.4% improved"
              trendColor="text-emerald-500"
            />
            <StatCard
              title="Active Contractors"
              value="17"
              label="on duty"
              trend="4 new this week"
              trendColor="text-sky-500"
            />
            <StatCard
              title="Revenue"
              value="R150 256"
              label="month to date"
              trend="+11.3% vs target"
              trendColor="text-emerald-500"
            />
          </div>

          {/* === MIDDLE GRID (CHART + DONUT CARDS) === */}
          <div className="grid gap-4 lg:grid-cols-[2fr_1.3fr]">
            
            {/* MAIN CHART */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Service Dynamics
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Completed jobs by month (2024)
                  </p>
                </div>

                <div className="flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-violet-500"></span>
                    Plumbing
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    Electrical
                  </span>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                <BarChart light={false} />
              </div>
            </div>

            {/* RIGHT COLUMN CARDS */}
            <div className="grid gap-4">
              
              {/* PAID INVOICES CARD */}
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Paid Invoices
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Current Financial Year
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                      R302 563
                    </div>
                    <div className="text-[11px] text-emerald-500 mt-1">
                      +14.5% vs last year
                    </div>
                  </div>

                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 border-[6px] border-slate-200 dark:border-slate-700 rounded-full" />
                    <div className="absolute inset-0 border-[6px] border-transparent border-t-emerald-400 border-r-emerald-400 rotate-45 rounded-full" />
                  </div>
                </div>
              </div>

              {/* SUBSCRIPTION INCOME CARD */}
              <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Subscription Income
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Partner Contractors
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                      R150 256
                    </div>
                    <div className="text-[11px] text-sky-500 mt-1">
                      42 active subscriptions
                    </div>
                  </div>

                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 border-[6px] border-slate-200 dark:border-slate-700 rounded-full" />
                    <div className="absolute inset-0 border-[6px] border-transparent border-t-sky-400 border-r-sky-400 -rotate-20 rounded-full" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* === BOTTOM GRID (ACTIVITY + ORDERS TABLE) === */}
          <div className="grid gap-4 lg:grid-cols-[1.4fr_2fr]">

            {/* USER ACTIVITY GRAPH */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Overall User Activity
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Platform logins & job updates
              </p>

              <div className="mt-4 h-40 rounded-2xl bg-gradient-to-t from-violet-200 via-sky-200 to-emerald-200 dark:from-violet-500/40 dark:via-sky-500/40 dark:to-emerald-400/40" />
            </div>

            {/* ORDERS MINI TABLE */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Customer Orders
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Latest maintenance jobs on Service Point SA
              </p>

              <MiniTable />
            </div>

          </div>

          {/* LEADS TABLE (YOUR EXISTING TABLE) */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
            <LeadsTable />
          </div>

        </div>
      </div>
    </div>
  );
}
