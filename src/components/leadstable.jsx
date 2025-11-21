import StatusBadge from "./StatusBadge";

export default function LeadsTable({ leads, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Loading jobs…
      </div>
    );
  }

  if (!leads?.length) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
        No jobs assigned yet. New jobs will appear here.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-xs lg:text-sm">
        <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
          <tr>
            <th className="py-2.5 px-3 font-medium">Job ID</th>
            <th className="py-2.5 px-3 font-medium">Client</th>
            <th className="py-2.5 px-3 font-medium">Service</th>
            <th className="py-2.5 px-3 font-medium hidden md:table-cell">
              Suburb
            </th>
            <th className="py-2.5 px-3 font-medium">Status</th>
            <th className="py-2.5 px-3 font-medium hidden lg:table-cell">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {leads.map(job => (
            <tr
              key={job.id}
              className="hover:bg-slate-900/80 transition-colors"
            >
              <td className="py-2.5 px-3 text-slate-200 text-xs lg:text-sm">
                #{job.id}
              </td>
              <td className="py-2.5 px-3 text-slate-100">
                {job.customer_name || "Client"}
                <p className="text-[11px] text-slate-400">
                  {job.customer_phone}
                </p>
              </td>
              <td className="py-2.5 px-3 text-slate-200">
                {job.service_type}
              </td>
              <td className="py-2.5 px-3 text-slate-300 hidden md:table-cell">
                {job.suburb || job.city || "-"}
              </td>
              <td className="py-2.5 px-3">
                <StatusBadge status={job.status} />
              </td>
              <td className="py-2.5 px-3 text-slate-400 hidden lg:table-cell">
                {job.created_at
                  ? new Date(job.created_at).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
