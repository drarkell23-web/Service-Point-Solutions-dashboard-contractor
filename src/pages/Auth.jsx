import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async e => {
    e.preventDefault();
    setError("");
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            window.location.origin === "http://localhost:5173"
              ? "http://localhost:5173/"
              : `${window.location.origin}/`
        }
      });
      if (err) throw err;
      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sp-green mb-1">
            ServicePoint SA
          </p>
          <h1 className="text-xl font-semibold mb-1">
            Contractor sign-in link
          </h1>
          <p className="text-xs text-slate-400">
            Enter the email address registered with ServicePoint SA and we will
            send you a secure login link.
          </p>
        </div>

        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1 text-slate-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sp-green"
              placeholder="you@yourcompany.co.za"
            />
          </div>
          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/60 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg bg-sp-green hover:bg-sp-greenDark text-sm font-semibold text-slate-950"
          >
            Send magic link
          </button>
        </form>

        {sent && !error && (
          <p className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-900/60 rounded-lg px-3 py-2">
            Link sent! Check your inbox and open the email from ServicePoint SA
            on this device.
          </p>
        )}
      </div>
    </div>
  );
}
