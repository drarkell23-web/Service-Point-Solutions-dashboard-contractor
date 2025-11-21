export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col gap-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-semibold text-slate-50">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
      {accent && (
        <span className="mt-2 inline-flex self-start px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sp-green/10 text-sp-green border border-sp-green/30">
          {accent}
        </span>
      )}
    </div>
  );
}
