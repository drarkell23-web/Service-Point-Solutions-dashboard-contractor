import StatCard from "../components/StatCard";

export default function ContractorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contractor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Jobs" value="12" />
        <StatCard title="Completed" value="8" />
        <StatCard title="Pending" value="4" />
      </div>
    </div>
  );
}
