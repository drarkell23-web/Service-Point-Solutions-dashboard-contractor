import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    const email = localStorage.getItem("contractor_email");
    if (!email) return;

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("assigned_to", email);

    if (!error) setJobs(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Assigned Jobs</h2>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <p className="text-blue-600 font-semibold mt-2">{job.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
