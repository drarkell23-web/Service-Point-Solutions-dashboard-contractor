import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-50">Profile</h1>
        <p className="text-sm text-slate-400">
          Contractor details used for ServicePoint SA dispatch.
        </p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Email</p>
          <p className="text-sm text-slate-100">{user?.email ?? "-"}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Role</p>
          <p className="text-sm text-slate-100">ServicePoint SA Contractor</p>
        </div>
        <button
          onClick={logout}
          className="mt-4 inline-flex px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-sm font-medium text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
