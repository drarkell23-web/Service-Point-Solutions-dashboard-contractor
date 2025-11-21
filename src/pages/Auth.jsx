import { useState } from "react";
import { supabase } from "../supabaseClient.js"; // FIXED PATH & EXTENSION

export default function Auth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setStatus("Sending login link...");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setStatus("Error sending link. Check Supabase settings.");
      setLoading(false);
      return;
    }

    // Save email for session
    localStorage.setItem("contractor_email", email);

    setStatus("Login link sent! Check your email.");
    setLoading(false);

    // Redirect to dashboard home
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 shadow-lg rounded-xl w-full max-w-sm">
        
        <h2 className="text-2xl font-bold mb-4 text-center">
          Contractor Login
        </h2>

        <p className="text-gray-600 text-sm text-center mb-4">
          Enter your email to receive a magic login link.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-500"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Login Link"}
        </button>

        {status && (
          <p className="text-center mt-3 text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
}
