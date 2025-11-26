// Simple data model for this front-end dashboard only.
// Later you can plug this into a backend / Supabase.

const leads = [
  {
    id: 1,
    received: "2025-02-05",
    client: "Thandi M.",
    service: "Geyser replacement – Pinetown",
    channel: "ServicePoint",
    status: "New",
    value: 2800
  },
  {
    id: 2,
    received: "2025-02-04",
    client: "Cal Media",
    service: "Studio renovation – Woodstock",
    channel: "WhatsApp",
    status: "Quoted",
    value: 18500
  },
  {
    id: 3,
    received: "2025-02-01",
    client: "PT Nation Sandton",
    service: "Gym lighting & plugs",
    channel: "ServicePoint",
    status: "Booked",
    value: 12500
  },
  {
    id: 4,
    received: "2025-01-28",
    client: "Mr Naidoo",
    service: "Leak detection – Umhlanga",
    channel: "Repeat client",
    status: "Completed",
    value: 3200
  }
];

const jobs = [
  {
    date: "2025-02-06",
    client: "Thandi M.",
    service: "Geyser replacement",
    location: "Pinetown",
    status: "Site visit"
  },
  {
    date: "2025-02-07",
    client: "Cal Media",
    service: "Studio renovation – day 1",
    location: "Woodstock",
    status: "In progress"
  },
  {
    date: "2025-02-10",
    client: "PT Nation Sandton",
    service: "Gym lighting & plugs",
    location: "Sandton",
    status: "Booked"
  }
];

const financeLog = [
  "Invoice #INV-203 sent to PT Nation – R12 500",
  "Invoice #INV-202 paid by Mr Naidoo – R3 200",
  "Quote #Q-451 for Cal Media – R18 500 (awaiting approval)"
];

const messages = [
  {
    from: "ServicePoint Admin",
    time: "Today · 09:14",
    text: "Welcome to your new HQ dashboard. Leads from the main ServicePoint SA site will appear here once routed to you."
  },
  {
    from: "Assistant – KZN",
    time: "Yesterday · 16:02",
    text: "Client Thandi M. is available Wednesday afternoon or Thursday morning for the geyser replacement. Please confirm which slot you prefer."
  },
  {
    from: "ServicePoint Admin",
    time: "Mon · 11:28",
    text: "Remember to update us if any jobs are cancelled so we can keep your lead quality high."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  wireThemeToggle();
  renderDashboardStats();
  renderJobs();
  renderLeads();
  renderFinance();
  renderMessages();
  renderOpsLeads();
  renderKpiFocus();
  wireLeadPopup();
  wireInboxForm();
});

/* NAVIGATION */
function wireNavigation() {
  const buttons = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".view");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-view");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      views.forEach((view) => {
        view.classList.toggle("active", view.id === `view-${target}`);
      });
    });
  });
}

/* THEME TOGGLE */
function wireThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    document.body.classList.toggle("theme-dark");
  });
}

/* RENDER STATS + PIPELINE + KPIs */
function renderDashboardStats() {
  const totalLeads = leads.length;
  const jobsBooked = jobs.length;

  const quoted = leads.filter((l) => l.status === "Quoted").length;
  const booked = leads.filter((l) => l.status === "Booked").length;
  const completed = leads.filter((l) => l.status === "Completed").length;
  const newLeads = leads.filter((l) => l.status === "New").length;

  const conversionBase = quoted + booked + completed;
  const conversion =
    conversionBase > 0
      ? Math.round(((booked + completed) / conversionBase) * 100)
      : 0;

  document.getElementById("statNewLeads").textContent = totalLeads.toString();
  document.getElementById("statJobsBooked").textContent =
    jobsBooked.toString();
  document.getElementById("statConversion").textContent = `${conversion}%`;

  document.getElementById("pipeNew").textContent = newLeads.toString();
  document.getElementById("pipeQuoted").textContent = quoted.toString();
  document.getElementById("pipeBooked").textContent = booked.toString();
  document.getElementById("pipeCompleted").textContent = completed.toString();

  // KPI: average lead value
  const leadsWithValue = leads.filter((l) => typeof l.value === "number");
  const totalValue = leadsWithValue.reduce(
    (sum, l) => sum + (l.value || 0),
    0
  );
  const avgValue =
    leadsWithValue.length > 0 ? totalValue / leadsWithValue.length : 0;

  const avgValueEl = document.getElementById("kpiAvgValue");
  if (avgValueEl) {
    avgValueEl.textContent =
      "R" + Math.round(avgValue).toLocaleString("en-ZA");
  }

  // KPI: share of leads from ServicePoint channel
  const spLeads = leads.filter((l) => l.channel === "ServicePoint").length;
  const share =
    totalLeads > 0 ? Math.round((spLeads / totalLeads) * 100) : 0;
  const shareEl = document.getElementById("kpiSPShare");
  if (shareEl) {
    shareEl.textContent = `${share}%`;
  }
}

/* JOBS TABLE */
function renderJobs() {
  const tbody = document.getElementById("jobsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  jobs
    .slice()
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .forEach((job) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${job.date}</td>
        <td>${job.client}</td>
        <td>${job.service}</td>
        <td>${job.location}</td>
        <td>${job.status}</td>
      `;
      tbody.appendChild(tr);
    });
}

/* LEADS TABLE (FULL) */
function renderLeads() {
  const tbody = document.getElementById("leadsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  leads
    .slice()
    .sort((a, b) => (a.received < b.received ? 1 : -1))
    .forEach((lead) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${lead.received}</td>
        <td>${lead.client}</td>
        <td>${lead.service}</td>
        <td>${lead.channel}</td>
        <td>${lead.status}</td>
        <td>${lead.value ? `R${lead.value.toLocaleString("en-ZA")}` : "-"}</td>
      `;
      tr.addEventListener("click", () => {
        alert(
          `Lead details:\n\nClient: ${lead.client}\nService: ${lead.service}\nChannel: ${
            lead.channel
          }\nStatus: ${lead.status}\nEstimated value: ${
            lead.value ? "R" + lead.value.toLocaleString("en-ZA") : "n/a"
          }`
        );
      });
      tbody.appendChild(tr);
    });
}

/* LEADS TABLE (OPS MINI) */
function renderOpsLeads() {
  const tbody = document.getElementById("opsLeadsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  leads
    .slice()
    .sort((a, b) => (a.received < b.received ? 1 : -1))
    .slice(0, 5)
    .forEach((lead) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${lead.received}</td>
        <td>${lead.client}</td>
        <td>${lead.service}</td>
        <td>${lead.status}</td>
      `;
      tbody.appendChild(tr);
    });
}

/* FINANCE */
function renderFinance() {
  const invoiced = leads
    .filter((l) => l.status === "Completed")
    .reduce((sum, l) => sum + (l.value || 0), 0);

  const pipeline = leads
    .filter((l) => l.status === "Quoted" || l.status === "Booked")
    .reduce((sum, l) => sum + (l.value || 0), 0);

  const invoicedEl = document.getElementById("finInvoiced");
  const pipelineEl = document.getElementById("finPipeline");
  const paidEl = document.getElementById("finPaid");

  if (invoicedEl) {
    invoicedEl.textContent =
      "R" + invoiced.toLocaleString("en-ZA");
  }
  if (pipelineEl) {
    pipelineEl.textContent =
      "R" + pipeline.toLocaleString("en-ZA");
  }
  if (paidEl) {
    paidEl.textContent = "R" + (0).toLocaleString("en-ZA");
  }

  const logEl = document.getElementById("financeLog");
  if (!logEl) return;
  logEl.innerHTML = "";
  financeLog.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    logEl.appendChild(li);
  });
}

/* MESSAGES */
function renderMessages() {
  const list = document.getElementById("messageList");
  if (!list) return;
  list.innerHTML = "";

  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message" + (msg.self ? " self" : "");
    div.innerHTML = `
      <div class="message-header">
        <span>${msg.from}</span>
        <span>${msg.time}</span>
      </div>
      <div class="message-body">${msg.text}</div>
    `;
    list.appendChild(div);
  });

  list.scrollTop = list.scrollHeight;
}

function wireInboxForm() {
  const form = document.getElementById("messageForm");
  const textarea = document.getElementById("messageText");
  if (!form || !textarea) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textarea.value.trim();
    if (!text) return;

    messages.push({
      from: "You",
      time: "Just now",
      text,
      self: true
    });

    textarea.value = "";
    renderMessages();
  });
}

/* LEAD POPUP / MANUAL CAPTURE */
function wireLeadPopup() {
  const popup = document.getElementById("leadPopup");
  const btnNewLead = document.getElementById("btnNewLead");
  const btnCancel = document.getElementById("popupCancel");
  const btnSave = document.getElementById("popupSave");

  if (!popup || !btnNewLead || !btnCancel || !btnSave) return;

  btnNewLead.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  btnCancel.addEventListener("click", () => {
    popup.style.display = "none";
    clearPopupFields();
  });

  btnSave.addEventListener("click", () => {
    const name = document.getElementById("popupClientName").value.trim();
    const service = document.getElementById("popupService").value.trim();
    const valueRaw = document.getElementById("popupValue").value.trim();

    if (!name || !service) {
      alert("Please add at least a client name and service.");
      return;
    }

    const value = valueRaw ? Number(valueRaw) : 0;

    leads.push({
      id: Date.now(),
      received: new Date().toISOString().slice(0, 10),
      client: name,
      service,
      channel: "Manual capture",
      status: "New",
      value
    });

    popup.style.display = "none";
    clearPopupFields();
    renderDashboardStats();
    renderLeads();
    renderOpsLeads();
    renderFinance();
    renderKpiFocus();
  });

  function clearPopupFields() {
    document.getElementById("popupClientName").value = "";
    document.getElementById("popupService").value = "";
    document.getElementById("popupValue").value = "";
  }
}

/* FOCUS KPI TAGS (services that appear most) */
function renderKpiFocus() {
  const container = document.getElementById("kpiFocusChips");
  if (!container) return;

  const counts = {};
  leads.forEach((l) => {
    const base = l.service.split("–")[0].trim(); // group by main service label
    counts[base] = (counts[base] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  container.innerHTML = "";
  sorted.forEach(([label, count]) => {
    const chip = document.createElement("div");
    chip.className = "kpi-chip";
    chip.textContent = `${label} · ${count}`;
    container.appendChild(chip);
  });

  if (sorted.length === 0) {
    const chip = document.createElement("div");
    chip.className = "kpi-chip";
    chip.textContent = "No data yet – leads will show here.";
    container.appendChild(chip);
  }
}

/*
  NOTE FOR FUTURE:
  If you want to push a lead into this dashboard from another page,
  you can call window.addServicePointLead({client, service, value, channel, status})
  as long as this script is loaded.
*/
window.addServicePointLead = function ({
  client,
  service,
  value = 0,
  channel = "ServicePoint",
  status = "New"
}) {
  leads.push({
    id: Date.now(),
    received: new Date().toISOString().slice(0, 10),
    client,
    service,
    channel,
    status,
    value
  });
  renderDashboardStats();
  renderLeads();
  renderOpsLeads();
  renderFinance();
  renderKpiFocus();
};
