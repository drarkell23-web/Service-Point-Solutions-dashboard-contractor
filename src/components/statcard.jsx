export default function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-5 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
