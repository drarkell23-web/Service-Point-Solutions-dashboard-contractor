export default function TopBar() {
  return (
    <header className="h-16 px-4 lg:px-8 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-sp-green">
          ServicePoint SA
        </p>
        <p className="text-sm text-slate-300">
          Contractor dashboard – live job overview
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden sm:inline-flex px-3 py-1.5 text-xs rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200">
          Need help? Chat
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-sp-green/80 text-slate-900 flex items-center justify-center text-sm font-semibold">
            C
          </div>
          <div className="text-xs leading-tight">
            <p className="font-medium text-slate-100">Contractor</p>
            <p className="text-slate-400">Logged in</p>
          </div>
        </div>
      </div>
    </header>
  );
}
