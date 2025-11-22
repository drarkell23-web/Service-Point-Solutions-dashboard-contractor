function StatusPill({ status }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
  const map = {
    Open: "bg-blue-50 text-blue-700",
    "In Progress": "bg-amber-50 text-amber-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return <span className={`${base} ${map[status] || ""}`}>{status}</span>;
}

export default function LeadsTable({ leads }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Lead ID</th>
            <th className="px-4 py-3 text-left">Customer</th>
            <th className="px-4 py-3 text-left">Service</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Budget</th>
            <th className="px-4 py-3 text-left">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-mono text-xs text-gray-600">
                {lead.id}
              </td>
              <td className="px-4 py-3 text-gray-900">{lead.customer}</td>
              <td className="px-4 py-3 text-gray-600">{lead.service}</td>
              <td className="px-4 py-3">
                <StatusPill status={lead.status} />
              </td>
              <td className="px-4 py-3 text-gray-900">{lead.budget}</td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {lead.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
