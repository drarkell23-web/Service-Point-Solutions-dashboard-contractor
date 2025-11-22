import StatCard from "../components/statcard";       // ⬅ statcard.jsx
import LeadsTable from "../components/leadstable";   // ⬅ leadstable.jsx

export default function ContractorDashboard() {
  // You can later load these from Supabase
  const stats = [
    { label: "Open Jobs", value: 7, trend: "+2 this week" },
    { label: "In Progress", value: 4, trend: "On track" },
    { label: "Completed", value: 12, trend: "+5 this month" },
    { label: "Cancelled", value: 1, trend: "Low" },
  ];

  const leads = [
    {
      id: "SP-1023",
      customer: "John Smith",
      service: "Plumbing – Burst Pipe",
      status: "In Progress",
      created_at: "2025-11-18",
      budget: "R2 300",
    },
    {
      id: "SP-1022",
      customer: "Mary Jacobs",
      service: "Electrical – DB Inspection",
      status: "Open",
      created_at: "2025-11-18",
      budget: "R1 200",
    },
    {
      id: "SP-1019",
      customer: "K. Naidoo",
      service: "Handyman – General Repairs",
      status: "Completed",
      created_at: "2025-11-17",
      budget: "R850",
    },
    {
      id: "SP-1015",
      customer: "D. Williams",
      service: "Appliance – Washing Machine",
      status: "In Progress",
      created_at: "2025-11-16",
      budget: "R1 050",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ServicePoint SA – Contractor Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Track your leads, jobs and performance in one place.
          </p>
        </div>

        <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          Go Online
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Leads table */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Latest Leads
            </h2>
            <p className="text-xs text-gray-500">
              These are the most recent leads assigned to you.
            </p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
