// Simple fake data so the dashboard looks alive.
// Later you can replace this with real API / Supabase data.

const LEADS = [
  {
    received: "Today · 09:14",
    client: "Thandi N.",
    contact: "Hidden by ServicePoint",
    area: "Durban North",
    service: "Burst geyser & ceiling damage",
    budget: "R4 000 – R8 000",
    status: "new",
  },
  {
    received: "Today · 08:32",
    client: "Michael P.",
    contact: "Hidden by ServicePoint",
    area: "Pinetown",
    service: "New DB board + COC",
    budget: "R6 000 – R12 000",
    status: "open",
  },
  {
    received: "Yesterday · 16:48",
    client: "Karin L.",
    contact: "Hidden by ServicePoint",
    area: "Umhlanga",
    service: "Bathroom renovation – plumbing only",
    budget: "R25 000 – R40 000",
    status: "open",
  },
  {
    received: "2 days ago · 11:07",
    client: "Sibusiso G.",
    contact: "Hidden by ServicePoint",
    area: "Durban CBD",
    service: "Leak detection – townhouse block",
    budget: "To quote",
    status: "done",
  },
];

const ADMIN_MESSAGES = [
  {
    title: "Lead quality reminder",
    ref: "SP-LEADS-2024-11-01",
    date: "Today · 08:05",
    body: "Please acknowledge new leads within 30 minutes during office hours. If you cannot take a job, decline it so we can re-route.",
  },
  {
    title: "Job photos & proof",
    ref: "SP-QA-2024-10-27",
    date: "Yesterday · 15:32",
    body: "For insurance and comeback protection, upload before/after photos to our shared folder when jobs are completed.",
  },
  {
    title: "Rating improvements",
    ref: "SP-RATE-2024-10-20",
    date: "Last week",
    body: "Your average rating is 4.7★. Keep greeting clients on site, explaining pricing upfront and confirming work done before leaving.",
  },
];

// ---- Helpers ----
function statusTag(status) {
  const span = document.createElement("span");
  span.classList.add("sp-status-tag");

  const dot = document.createElement("span");
  dot.classList.add("sp-status-dot-mini");

  if (status === "new") {
    span.classList.add("sp-status-tag--new");
  } else if (status === "open") {
    span.classList.add("sp-status-tag--open");
  } else {
    span.classList.add("sp-status-tag--done");
  }

  span.appendChild(dot);
  span.appendChild(document.createTextNode(status === "done" ? "Completed" : status === "open" ? "In progress" : "New"));
  return span;
}

// ---- Populate leads tables ----
function renderLeadsTables() {
  const shortBody = document.getElementById("leadsTableBody");
  const fullBody = document.getElementById("leadsTableBodyFull");
  if (!shortBody || !fullBody) return;

  shortBody.innerHTML = "";
  fullBody.innerHTML = "";

  LEADS.forEach((lead) => {
    // overview table
    const trShort = document.createElement("tr");
    trShort.innerHTML = `
      <td>${lead.received}</td>
      <td>${lead.client}</td>
      <td>${lead.area}</td>
      <td>${lead.service}</td>
      <td>${lead.budget}</td>
      <td></td>
    `;
    const statusCellShort = trShort.lastElementChild;
    statusCellShort.appendChild(statusTag(lead.status));
    shortBody.appendChild(trShort);

    // full table
    const trFull = document.createElement("tr");
    trFull.innerHTML = `
      <td>${lead.received}</td>
      <td>${lead.client}</td>
      <td>${lead.contact}</td>
      <td>${lead.area}</td>
      <td>${lead.service}</td>
      <td>${lead.budget}</td>
      <td></td>
    `;
    const statusCellFull = trFull.lastElementChild;
    statusCellFull.appendChild(statusTag(lead.status));
    fullBody.appendChild(trFull);
  });
}

// ---- Populate messages ----
function renderMessages() {
  const list = document.getElementById("messagesList");
  const listFull = document.getElementById("messagesListFull");
  if (!list || !listFull) return;

  list.innerHTML = "";
  listFull.innerHTML = "";

  ADMIN_MESSAGES.forEach((msg) => {
    const el = document.createElement("article");
    el.className = "sp-message";
    el.innerHTML = `
      <div class="sp-message-top">
        <div class="sp-message-title">${msg.title}</div>
        <div class="sp-message-meta">${msg.date}</div>
      </div>
      <div class="sp-message-meta">Ref: ${msg.ref}</div>
      <div class="sp-message-body">${msg.body}</div>
    `;
    list.appendChild(el);

    const elFull = el.cloneNode(true);
    listFull.appendChild(elFull);
  });
}

// ---- Nav switching ----
function setupNav() {
  const navButtons = document.querySelectorAll(".sp-nav-item");
  const views = {
    overview: document.getElementById("view-overview"),
    leads: document.getElementById("view-leads"),
    messages: document.getElementById("view-messages"),
  };

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view");
      navButtons.forEach((b) => b.classList.remove("sp-nav-item--active"));
      btn.classList.add("sp-nav-item--active");

      Object.keys(views).forEach((key) => {
        if (views[key]) {
          views[key].classList.toggle("sp-view--active", key === view);
        }
      });
    });
  });
}

// ---- Download CSV ----
function setupCsvDownload() {
  const btn = document.getElementById("downloadLeadsBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const rows = [
      ["Received", "Client", "Contact", "Area", "Service", "Budget", "Status"],
      ...LEADS.map((l) => [
        l.received,
        l.client,
        l.contact,
        l.area,
        l.service,
        l.budget,
        l.status,
      ]),
    ];

    const csvContent = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "servicepoint_leads.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  renderLeadsTables();
  renderMessages();
  setupNav();
  setupCsvDownload();
});
