// Simple front-end “live” model.
// Starts empty. Data only appears when:
//  - you add via forms in this dashboard, OR
//  - admin / another page calls the window.addServicePoint* helpers.

let leads = [];
let jobs = [];
let invoices = [];
let activity = [];

// Filters for KPIs & charts
const filters = {
  range: "30", // days or "all"
  region: "all", // region or "all"
};

const charts = {
  leadsTimeline: null,
  channel: null,
  status: null,
};

document.addEventListener("DOMContentLoaded", () => {
  wireThemeToggle();
  wireNavigation();
  wireFilterControls();
  wireOverviewButtons();
  wireLeadModal();
  wireJobModal();
  wireInvoiceModal();
  initCharts();
  renderAll();
});

/* THEME */
function wireThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    document.body.classList.toggle("theme-dark");
  });
}

/* NAVIGATION */
function wireNavigation() {
  const navButtons = document.querySelectorAll(".sp-nav-item");
  const views = document.querySelectorAll(".sp-view");

  function setView(target) {
    views.forEach((view) => {
      view.classList.toggle("sp-view--active", view.dataset.view === target);
    });
    navButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-view-target") === target
      );
    });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-view-target");
      setView(target);
    });
  });

  // Small helpers inside overview cards
  document.querySelectorAll("[data-open-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-open-view");
      setView(target);
    });
  });
}

/* FILTERS */
function wireFilterControls() {
  const rangeSelect = document.getElementById("filterRange");
  const regionSelect = document.getElementById("filterRegion");

  if (rangeSelect) {
    rangeSelect.addEventListener("change", () => {
      filters.range = rangeSelect.value;
      renderAll();
    });
  }

  if (regionSelect) {
    regionSelect.addEventListener("change", () => {
      filters.region = regionSelect.value;
      renderAll();
    });
  }
}

/* HEAD / VIEW BUTTONS */
function wireOverviewButtons() {
  const btnHeaderLead = document.getElementById("btnNewLeadHeader");
  const btnLeadsViewLead = document.getElementById("btnNewLeadLeadsView");

  btnHeaderLead?.addEventListener("click", () => openModal("leadModal"));
  btnLeadsViewLead?.addEventListener("click", () => openModal("leadModal"));

  const btnNewJob = document.getElementById("btnNewJob");
  const btnNewInvoice = document.getElementById("btnNewInvoice");

  btnNewJob?.addEventListener("click", () => openModal("jobModal"));
  btnNewInvoice?.addEventListener("click", () => openModal("invoiceModal"));
}

/* MODAL HELPERS */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("open");
}

/* LEAD MODAL + FORM */
function wireLeadModal() {
  const modal = document.getElementById("leadModal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal("leadModal");
  });

  document
    .querySelectorAll('[data-modal-close="leadModal"]')
    .forEach((btn) =>
      btn.addEventListener("click", () => closeModal("leadModal"))
    );

  const form = document.getElementById("leadForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const client = document.getElementById("leadClient").value.trim();
    const service = document.getElementById("leadService").value.trim();
    const channel = document.getElementById("leadChannel").value;
    const region = document.getElementById("leadRegion").value;
    const status = document.getElementById("leadStatus").value;
    const valueRaw = document.getElementById("leadValue").value.trim();
    const value = valueRaw ? Number(valueRaw) : 0;

    if (!client || !service) return;

    const lead = createLead({
      client,
      service,
      channel,
      region,
      status,
      value,
    });

    leads.push(lead);
    logActivity("lead_created", {
      client: lead.client,
      service: lead.service,
      channel: lead.channel,
    });

    form.reset();
    closeModal("leadModal");
    renderAll();
  });
}

/* JOB MODAL */
function wireJobModal() {
  const modal = document.getElementById("jobModal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal("jobModal");
  });

  document
    .querySelectorAll('[data-modal-close="jobModal"]')
    .forEach((btn) =>
      btn.addEventListener("click", () => closeModal("jobModal"))
    );

  const form = document.getElementById("jobForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("jobDate").value;
    const client = document.getElementById("jobClient").value.trim();
    const title = document.getElementById("jobTitle").value.trim();
    const location = document.getElementById("jobLocation").value.trim();
    const status = document.getElementById("jobStatus").value;
    const valueRaw = document.getElementById("jobValue").value.trim();
    const value = valueRaw ? Number(valueRaw) : 0;

    if (!date || !client || !title) return;

    const job = {
      id: Date.now(),
      date,
      client,
      title,
      location,
      status,
      value,
      createdAt: todayStr(),
    };

    jobs.push(job);
    logActivity("job_created", {
      client: job.client,
      title: job.title,
      date: job.date,
    });

    form.reset();
    closeModal("jobModal");
    renderAll();
  });
}

/* INVOICE MODAL */
function wireInvoiceModal() {
  const modal = document.getElementById("invoiceModal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal("invoiceModal");
  });

  document
    .querySelectorAll('[data-modal-close="invoiceModal"]')
    .forEach((btn) =>
      btn.addEventListener("click", () => closeModal("invoiceModal"))
    );

  const form = document.getElementById("invoiceForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("invoiceDate").value;
    const number = document.getElementById("invoiceNumber").value.trim();
    const client = document.getElementById("invoiceClient").value.trim();
    const amountRaw = document.getElementById("invoiceAmount").value.trim();
    const amount = amountRaw ? Number(amountRaw) : 0;
    const status = document.getElementById("invoiceStatus").value;

    if (!date || !number || !client || !amount) return;

    const invoice = {
      id: Date.now(),
      date,
      number,
      client,
      amount,
      status,
      createdAt: date, // use invoice date for filter
    };

    invoices.push(invoice);
    logActivity("invoice_created", {
      client: invoice.client,
      amount: invoice.amount,
      status: invoice.status,
    });

    form.reset();
    closeModal("invoiceModal");
    renderAll();
  });
}

/* DATA HELPERS */

function createLead({
  client,
  service,
  channel = "ServicePoint SA",
  region = "Other",
  status = "New",
  value = 0,
  createdAt = null,
}) {
  const dateStr = createdAt || todayStr();
  return {
    id: Date.now(),
    createdAt: dateStr,
    client,
    service,
    channel,
    region,
    status,
    value,
  };
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// Apply filter window (range + region)
function filterLeadsForView() {
  return leads.filter((lead) => {
    if (!matchesRegion(lead.region)) return false;
    if (!matchesRange(lead.createdAt)) return false;
    return true;
  });
}

function matchesRegion(region) {
  if (filters.region === "all") return true;
  if (filters.region === "Other") {
    return !region || region === "Other" || region === "Unassigned";
  }
  return region === filters.region;
}

function matchesRange(dateStr) {
  if (filters.range === "all") return true;
  const days = Number(filters.range);
  const date = new Date(dateStr + "T00:00:00");
  if (isNaN(date.getTime())) return true;
  const today = new Date();
  const diffMs = today - date;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

/* ACTIVITY LOG */
function logActivity(type, payload) {
  const now = new Date();
  const timeLabel = now.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateLabel = now.toLocaleDateString("en-ZA");

  let text = "";
  switch (type) {
    case "lead_created":
      text = `New lead: ${payload.client} – ${payload.service} (${payload.channel}).`;
      break;
    case "lead_status":
      text = `Lead status updated: ${payload.client} → ${payload.status}.`;
      break;
    case "job_created":
      text = `Job created for ${payload.client}: ${payload.title} (${payload.date}).`;
      break;
    case "invoice_created":
      text = `Invoice for ${payload.client} added · R${payload.amount.toLocaleString(
        "en-ZA"
      )} (${payload.status}).`;
      break;
    default:
      text = payload?.text || "";
  }

  activity.unshift({
    id: Date.now() + Math.random(),
    type,
    text,
    timeLabel,
    dateLabel,
  });

  // Limit feed length
  if (activity.length > 50) {
    activity.length = 50;
  }
}

/* RENDERING */

function renderAll() {
  renderKpis();
  renderOverviewLeadsPreview();
  renderActivityFeed();
  renderMiniToday();
  renderLeadsTable();
  renderJobsTable();
  renderInvoicesTable();
  updateCharts();
}

/* KPIs */
function renderKpis() {
  const filteredLeads = filterLeadsForView();

  const kpiLeadsEl = document.getElementById("kpiLeads");
  const kpiActiveJobsEl = document.getElementById("kpiActiveJobs");
  const kpiPipelineEl = document.getElementById("kpiPipeline");
  const kpiPaidEl = document.getElementById("kpiPaid");

  const activeJobs = jobs.filter(
    (job) => !["Completed", "Cancelled"].includes(job.status)
  );

  const pipelineValue = filteredLeads
    .filter((lead) =>
      ["Quoted", "Booked", "In progress", "Completed"].includes(lead.status)
    )
    .reduce((sum, lead) => sum + (lead.value || 0), 0);

  const paidInRange = invoices
    .filter((inv) => inv.status === "Paid" && matchesRange(inv.createdAt))
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  kpiLeadsEl.textContent = filteredLeads.length.toString();
  kpiActiveJobsEl.textContent = activeJobs.length.toString();
  kpiPipelineEl.textContent = "R" + pipelineValue.toLocaleString("en-ZA");
  kpiPaidEl.textContent = "R" + paidInRange.toLocaleString("en-ZA");
}

/* OVERVIEW – LEADS PREVIEW */
function renderOverviewLeadsPreview() {
  const tbody = document.getElementById("overviewLeadsBody");
  const emptyEl = document.getElementById("overviewLeadsEmpty");
  tbody.innerHTML = "";

  const sorted = [...leads].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  const preview = sorted.slice(0, 10);

  if (preview.length === 0) {
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  preview.forEach((lead) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${lead.createdAt}</td>
      <td>${escapeHtml(lead.client)}</td>
      <td>${escapeHtml(lead.service)}</td>
      <td>${escapeHtml(lead.channel)}</td>
      <td>${escapeHtml(lead.status)}</td>
      <td>${formatCurrency(lead.value)}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ACTIVITY FEED */
function renderActivityFeed() {
  const list = document.getElementById("activityFeed");
  const empty = document.getElementById("activityEmpty");
  list.innerHTML = "";

  if (activity.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  activity.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="sp-activity-meta">
        <span>${item.dateLabel}</span>
        <span>${item.timeLabel}</span>
      </div>
      <div>${escapeHtml(item.text)}</div>
    `;
    list.appendChild(li);
  });
}

/* MINI TODAY SUMMARY */
function renderMiniToday() {
  const today = todayStr();

  const leadsToday = leads.filter((lead) => lead.createdAt === today);
  const jobsToday = jobs.filter((job) => job.date === today);
  const valueToday = jobsToday.reduce(
    (sum, job) => sum + (job.value || 0),
    0
  );

  document.getElementById("miniLeadsToday").textContent =
    leadsToday.length.toString();
  document.getElementById("miniJobsToday").textContent =
    jobsToday.length.toString();
  document.getElementById("miniValueToday").textContent =
    "R" + valueToday.toLocaleString("en-ZA");
}

/* LEADS TABLE VIEW */
function wireLeadsFilters() {
  const searchInput = document.getElementById("leadsSearch");
  const statusSelect = document.getElementById("leadsStatusFilter");
  const channelSelect = document.getElementById("leadsChannelFilter");

  searchInput?.addEventListener("input", renderLeadsTable);
  statusSelect?.addEventListener("change", renderLeadsTable);
  channelSelect?.addEventListener("change", renderLeadsTable);
}

// Ensure filters are wired once
wireLeadsFilters();

function renderLeadsTable() {
  const tbody = document.getElementById("leadsTableBody");
  const emptyEl = document.getElementById("leadsEmptyState");
  const countEl = document.getElementById("leadsCount");

  const search = (document.getElementById("leadsSearch")?.value || "")
    .toLowerCase()
    .trim();
  const statusFilter =
    document.getElementById("leadsStatusFilter")?.value || "all";
  const channelFilter =
    document.getElementById("leadsChannelFilter")?.value || "all";

  tbody.innerHTML = "";

  let filtered = leads.slice();
  if (search) {
    filtered = filtered.filter((lead) => {
      return (
        lead.client.toLowerCase().includes(search) ||
        lead.service.toLowerCase().includes(search) ||
        lead.channel.toLowerCase().includes(search)
      );
    });
  }
  if (statusFilter !== "all") {
    filtered = filtered.filter((lead) => lead.status === statusFilter);
  }
  if (channelFilter !== "all") {
    filtered = filtered.filter((lead) => lead.channel === channelFilter);
  }

  countEl.textContent = filtered.length.toString();

  if (filtered.length === 0) {
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  filtered
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .forEach((lead) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${lead.createdAt}</td>
        <td>${escapeHtml(lead.client)}</td>
        <td>${escapeHtml(lead.service)}</td>
        <td>${escapeHtml(lead.channel)}</td>
        <td>${escapeHtml(lead.region || "Other")}</td>
        <td>
          <select class="sp-input sp-input-status" data-lead-id="${lead.id}">
            ${statusOptionsHtml(lead.status)}
          </select>
        </td>
        <td>${formatCurrency(lead.value)}</td>
      `;
      tbody.appendChild(tr);
    });

  // Wire status dropdowns
  tbody.querySelectorAll(".sp-input-status").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const id = Number(e.target.getAttribute("data-lead-id"));
      const newStatus = e.target.value;
      const lead = leads.find((l) => l.id === id);
      if (!lead) return;
      lead.status = newStatus;
      logActivity("lead_status", {
        client: lead.client,
        status: newStatus,
      });
      renderAll();
    });
  });
}

function statusOptionsHtml(selected) {
  const statuses = [
    "New",
    "Contacted",
    "Quoted",
    "Booked",
    "In progress",
    "Completed",
    "Lost",
  ];
  return statuses
    .map(
      (s) =>
        `<option value="${s}" ${
          s === selected ? "selected" : ""
        }>${s}</option>`
    )
    .join("");
}

/* JOBS TABLE */
function renderJobsTable() {
  const tbody = document.getElementById("jobsTableBody");
  const emptyEl = document.getElementById("jobsEmptyState");
  tbody.innerHTML = "";

  if (jobs.length === 0) {
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  const today = new Date();
  const sixtyDaysAhead = new Date();
  sixtyDaysAhead.setDate(today.getDate() + 60);

  const filtered = jobs.filter((job) => {
    const jobDate = new Date(job.date + "T00:00:00");
    if (isNaN(jobDate.getTime())) return true;
    return jobDate <= sixtyDaysAhead;
  });

  filtered
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .forEach((job) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${job.date}</td>
        <td>${escapeHtml(job.title)}</td>
        <td>${escapeHtml(job.client)}</td>
        <td>${escapeHtml(job.location || "")}</td>
        <td>${escapeHtml(job.status)}</td>
        <td>${formatCurrency(job.value)}</td>
      `;
      tbody.appendChild(tr);
    });
}

/* INVOICES TABLE + BILLING KPIs */
function renderInvoicesTable() {
  const tbody = document.getElementById("invoicesTableBody");
  const emptyEl = document.getElementById("invoicesEmptyState");
  tbody.innerHTML = "";

  if (invoices.length === 0) {
    emptyEl.style.display = "block";
    updateBillingKpis();
    return;
  }
  emptyEl.style.display = "none";

  invoices
    .slice()
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .forEach((inv) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${inv.date}</td>
        <td>${escapeHtml(inv.number)}</td>
        <td>${escapeHtml(inv.client)}</td>
        <td>${formatCurrency(inv.amount)}</td>
        <td>${escapeHtml(inv.status)}</td>
      `;
      tbody.appendChild(tr);
    });

  updateBillingKpis();
}

function updateBillingKpis() {
  const invoiced = invoices
    .filter((inv) => matchesRange(inv.createdAt))
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const paid = invoices
    .filter((inv) => inv.status === "Paid" && matchesRange(inv.createdAt))
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const outstanding = Math.max(0, invoiced - paid);

  document.getElementById("billInvoiced").textContent =
    "R" + invoiced.toLocaleString("en-ZA");
  document.getElementById("billPaid").textContent =
    "R" + paid.toLocaleString("en-ZA");
  document.getElementById("billOutstanding").textContent =
    "R" + outstanding.toLocaleString("en-ZA");
}

/* CHARTS – INIT + UPDATE */
function initCharts() {
  const timelineCtx = document
    .getElementById("chartLeadsTimeline")
    ?.getContext("2d");
  const channelCtx = document
    .getElementById("chartChannelBreakdown")
    ?.getContext("2d");
  const statusCtx = document
    .getElementById("chartStatusBreakdown")
    ?.getContext("2d");

  if (timelineCtx) {
    charts.leadsTimeline = new Chart(timelineCtx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Leads per day",
            data: [],
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { font: { size: 10 } },
          },
          y: {
            ticks: { font: { size: 10 } },
            beginAtZero: true,
          },
        },
      },
    });
  }

  if (channelCtx) {
    charts.channel = new Chart(channelCtx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Leads by channel",
            data: [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { font: { size: 10 } },
          },
          y: {
            beginAtZero: true,
            ticks: { font: { size: 10 } },
          },
        },
      },
    });
  }

  if (statusCtx) {
    charts.status = new Chart(statusCtx, {
      type: "doughnut",
      data: {
        labels: [],
        datasets: [
          {
            label: "Lead status",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { size: 10 } },
          },
        },
      },
    });
  }
}

function updateCharts() {
  updateLeadsTimelineChart();
  updateChannelChart();
  updateStatusChart();
}

function updateLeadsTimelineChart() {
  const chart = charts.leadsTimeline;
  const emptyEl = document.getElementById("chartLeadsTimelineEmpty");
  if (!chart) return;

  // Build last N days (based on range) or 30 days default
  const daysRange = filters.range === "all" ? 30 : Number(filters.range) || 30;
  const labels = [];
  const counts = [];

  const today = new Date();
  for (let i = daysRange - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const str = d.toISOString().slice(0, 10);
    labels.push(str);
    const count = leads.filter(
      (lead) => lead.createdAt === str && matchesRegion(lead.region)
    ).length;
    counts.push(count);
  }

  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) {
    emptyEl?.classList.remove("hidden");
  } else {
    emptyEl?.classList.add("hidden");
  }

  chart.data.labels = labels;
  chart.data.datasets[0].data = counts;
  chart.update();
}

function updateChannelChart() {
  const chart = charts.channel;
  const emptyEl = document.getElementById("chartChannelEmpty");
  if (!chart) return;

  const filteredLeads = filterLeadsForView();
  const map = {};
  filteredLeads.forEach((lead) => {
    map[lead.channel] = (map[lead.channel] || 0) + 1;
  });

  const labels = Object.keys(map);
  const data = Object.values(map);

  if (data.length === 0) {
    emptyEl?.classList.remove("hidden");
  } else {
    emptyEl?.classList.add("hidden");
  }

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

function updateStatusChart() {
  const chart = charts.status;
  const emptyEl = document.getElementById("chartStatusEmpty");
  if (!chart) return;

  const filteredLeads = filterLeadsForView();
  const map = {};
  filteredLeads.forEach((lead) => {
    map[lead.status] = (map[lead.status] || 0) + 1;
  });

  const labels = Object.keys(map);
  const data = Object.values(map);

  if (data.length === 0) {
    emptyEl?.classList.remove("hidden");
  } else {
    emptyEl?.classList.add("hidden");
  }

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

/* GLOBAL HELPERS */

function formatCurrency(value) {
  if (!value || isNaN(value)) return "-";
  return "R" + Number(value).toLocaleString("en-ZA");
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* PUBLIC API FOR ADMIN / OTHER PAGES
   These can be called from another page as long as this dashboard
   is loaded in the same window (or you expose it via window.postMessage later).
*/

window.addServicePointLead = function ({
  client,
  service,
  channel = "ServicePoint SA",
  region = "Other",
  status = "New",
  value = 0,
  createdAt = null,
}) {
  if (!client || !service) return;
  const lead = createLead({
    client,
    service,
    channel,
    region,
    status,
    value,
    createdAt,
  });
  leads.push(lead);
  logActivity("lead_created", {
    client: lead.client,
    service: lead.service,
    channel: lead.channel,
  });
  renderAll();
};

window.addServicePointJob = function ({
  date,
  client,
  title,
  location = "",
  status = "Booked",
  value = 0,
}) {
  if (!date || !client || !title) return;
  const job = {
    id: Date.now(),
    date,
    client,
    title,
    location,
    status,
    value,
    createdAt: todayStr(),
  };
  jobs.push(job);
  logActivity("job_created", {
    client: job.client,
    title: job.title,
    date: job.date,
  });
  renderAll();
};

window.addServicePointInvoice = function ({
  date,
  number,
  client,
  amount,
  status = "Sent",
}) {
  if (!date || !number || !client || !amount) return;
  const invoice = {
    id: Date.now(),
    date,
    number,
    client,
    amount,
    status,
    createdAt: date,
  };
  invoices.push(invoice);
  logActivity("invoice_created", {
    client: invoice.client,
    amount: invoice.amount,
    status: invoice.status,
  });
  renderAll();
};
