import { supabase } from "../lib/supabaseClient.js";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("contractor_email", email);
    window.location.href = "/";
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Contractor Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Send Login Link
        </button>
      </div>
    </div>
  );
}
