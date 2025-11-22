import StatCard from "../components/statcard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/topBar.jsx";
import { useState } from "react";

/* ------------------------------------------
   MINI BAR CHART
------------------------------------------- */
function BarChart({ light }) {
  const bars = [60, 80, 55, 70, 90, 65, 75, 50, 85, 40, 60, 72];

  return (
    <div className="flex h-40 items-end justify-between gap-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-full ${
            light ? "bg-violet-200" : "bg-gradient-to-t from-violet-600 to-violet-400"
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------
   MINI TABLE
------------------------------------------- */
function MiniTable() {
  const rows = [
    { name: "Kabelo M.", city: "Cape Town", date: "22.08.2022", status: "Delivered", price: "R 5 920" },
    { name: "Noluthando P.", city: "Johannesburg", date: "24.08.2022", status: "In progress", price: "R 8 410" },
    { name: "Thabo L.", city: "Durban", date: "26.08.2022", status: "Pending", price: "R 3 100" },
    { name: "Mieke S.", city: "Pretoria", date: "27.08.2022", status: "Delivered", price: "R 10 230" }
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
          key={idx}
          className={`grid grid-cols-[1.5fr_1fr_1.1fr_1fr_1fr] px-4 py-2 text-[11px] ${
            idx % 2 === 0
              ? "bg-white dark:bg-slate-900"
              : "bg-slate-50 dark:bg-slate-950"
          }`}
        >
          <span className="font-medium text-slate-800 dark:text-slate-50">{row.name}</span>
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

          <span className="text-right font-medium text-slate-900 dark:text-slate-50">{row.price}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------
   MAIN DASHBOARD
------------------------------------------- */
export default function ContractorDashboard() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen bg-gray-100 dark:bg-slate-950">

        <Sidebar />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <TopBar toggleDark={() => setDark(!dark)} dark={dark} />

          <div className="p-6 space-y-6">

            {/* TOP CARDS */}
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard title="Orders" value="201" label="last 30 days" trend="+8.2%" trendColor="text-emerald-500" />
              <StatCard title="Approved" value="36" label="awaiting invoicing" trend="+3.4%" trendColor="text-emerald-500" />
              <StatCard title="Active Contractors" value="17" label="on duty" trend="+4 this week" trendColor="text-sky-500" />
              <StatCard title="Revenue" value="R150 256" label="month to date" trend="+11.3%" trendColor="text-emerald-500" />
            </div>

            {/* MIDDLE SECTION */}
            <div className="grid gap-4 lg:grid-cols-[2fr_1.4fr]">

              {/* SALES CHART */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Service dynamics</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Completed jobs · 2024</p>

                <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-950 p-3">
                  <BarChart light={!dark} />
                </div>
              </div>

              {/* RIGHT-SIDE CARDS */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

                {/* PAID INVOICES */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Paid invoices</h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Current year</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold dark:text-white">R302 563</div>
                      <div className="text-[11px] text-emerald-500">+14.5%</div>
                    </div>

                    <div className="relative h-20 w-20">
                      <div className="absolute inset-0 rounded-full border-[6px] border-slate-200 dark:border-slate-700" />
                      <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-emerald-400 border-r-emerald-400 rotate-45" />
                    </div>
                  </div>
                </div>

                {/* SUBSCRIPTIONS */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Subscription income</h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Partner contractors</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold dark:text-white">R150 256</div>
                      <div className="text-[11px] text-sky-500">42 active</div>
                    </div>

                    <div className="relative h-20 w-20">
                      <div className="absolute inset-0 rounded-full border-[6px] border-slate-200 dark:border-slate-700" />
                      <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-sky-400 border-r-sky-400 -rotate-20" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid gap-4 lg:grid-cols-[1.4fr_2fr]">

              <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                <h2 className="text-sm font-semibold dark:text-white">Overall activity</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Logins & updates</p>
                <div className="mt-4 h-40 rounded-2xl bg-gradient-to-t from-violet-200 via-sky-200 to-emerald-200 dark:from-violet-500/40 dark:via-sky-500/40 dark:to-emerald-400/40" />
              </div>

              <div className="rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                <h2 className="text-sm font-semibold dark:text-white">Customer orders</h2>
                <MiniTable />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
