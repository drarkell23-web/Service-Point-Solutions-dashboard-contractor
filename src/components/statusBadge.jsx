const COLORS = {
  open: "bg-sky-500/15 text-sky-300 border-sky-500/40",
  "in progress": "bg-amber-500/15 text-amber-300 border-amber-500/40",
  completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  cancelled: "bg-rose-500/15 text-rose-300 border-rose-500/40"
};

export default function StatusBadge({ status }) {
  const key = (status || "").toLowerCase();
  const color = COLORS[key] || "bg-slate-700/40 text-slate-200 border-slate-500";
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${color}`}
    >
      {status}
    </span>
  );
}
