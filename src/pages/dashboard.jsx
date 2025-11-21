import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import StatCard from "../components/StatCard";
import LeadsTable from "../components/LeadsTable";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // NOTE: we assume a "leads" table with columns:
  // id, customer_name, customer_phone, service_type, suburb,
  // status ('Open','In Progress','Completed','Cancelled'),
  // assigned_to (contractor email), created_at.
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        const contractorEmail = user?.email || null;

        let query = supabase.from("leads").select("*").order("created_at", {
          ascending: false
        });

        if (contractorEmail) {
          query = query.eq("assigned_to", contractorEmail);
        }

        const { data, error } = await query;
        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        console.error(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const total = jobs.length;
  const open = jobs.filter(j => j.status === "Open").length;
  const inProgress = jobs.filter(j => j.status === "In Progress").length;
  const completed = jobs.filter(j => j.status === "Completed").length;
  const cancelled = jobs.filter(j => j.status === "Cancelled").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
            Welcome back, Contractor
          </h1>
          <p className="text-sm text-slate-400">
            Track all ServicePoint SA jobs assigned to you in real time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Open jobs"
          value={open}
          sub="Waiting to be accepted or scheduled."
          accent="Today’s focus"
        />
        <StatCard
          label="In progress"
          value={inProgress}
          sub="Currently on-site or being worked on."
        />
        <StatCard
          label="Completed"
          value={completed}
          sub="Marked as finished by you."
        />
        <StatCard
          label="Cancelled"
          value={cancelled}
          sub="Declined or cancelled by client."
        />
      </div>

      <section className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
            Recent Jobs
          </h2>
          <p className="text-xs text-slate-400">
            Total assigned:{" "}
            <span className="font-semibold text-slate-100">{total}</span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60">
          <LeadsTable leads={jobs} loading={loading} />
        </div>
      </section>
    </div>
  );
}
