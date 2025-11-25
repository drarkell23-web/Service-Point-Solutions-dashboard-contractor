// ======== DEMO DATA (you can later replace with real API) =========
const demoMetrics = {
  newLeadsMonth: 8,
  jobsBookedMonth: 5,
  conversionRate: 42,
  pipeline: {
    New: 3,
    Quoted: 4,
    Scheduled: 2,
    Progress: 1,
    Done: 7
  },
  today: {
    newLeads: 2,
    openJobs: 5,
    unreadMessages: 3
  },
  finance: {
    invoiced: 48500,
    paid: 37200,
    average: 3450
  }
};

const demoLeads = [
  {
    date: "2025-11-24",
    client: "Nomsa M.",
    service: "Geyser replacement",
    region: "Durban North",
    status: "New",
    value: "R4 500"
  },
  {
    date: "2025-11-23",
    client: "Thabo L.",
    service: "Solar + inverter install",
    region: "Randburg, JHB",
    status: "Quoted",
    value: "R85 000"
  },
  {
    date: "2025-11-22",
    client: "Ayesha K.",
    service: "Interior repaint – 3 rooms",
    region: "Cape Town CBD",
    status: "Scheduled",
    value: "R12 800"
  }
];

const demoMessages = [
  {
    date: "2025-11-24",
    title: "New SLA: respond within 2 hours",
    body: "Please confirm new leads within 2 business hours to keep your account in good standing."
  },
  {
    date: "2025-11-22",
    title: "Client rating 5★ – great work!",
    body: "Client for Job #1032 mentioned your team was on time and left the site spotless."
  },
  {
    date: "2025-11-20",
    title: "Docs reminder",
    body: "COC and insurance letter expire next month. Reply with updated copies so we can keep you live on the network."
  }
];

// ======== POPULATE UI =========
function formatCurrency(amount) {
  return "R" + amount.toLocaleString("en-ZA");
}

function initMetrics() {
  document.getElementById("metric-new-leads").textContent =
    demoMetrics.newLeadsMonth;
  document.getElementById("metric-jobs-booked").textContent =
    demoMetrics.jobsBookedMonth;
  document.getElementById(
    "metric-conversion"
  ).textContent = `${demoMetrics.conversionRate}%`;

  document.getElementById("pipe-new").textContent = demoMetrics.pipeline.New;
  document.getElementById("pipe-quoted").textContent =
    demoMetrics.pipeline.Quoted;
  document.getElementById("pipe-scheduled").textContent =
    demoMetrics.pipeline.Scheduled;
  document.getElementById("pipe-progress").textContent =
    demoMetrics.pipeline.Progress;
  document.getElementById("pipe-done").textContent = demoMetrics.pipeline.Done;

  document.getElementById(
    "today-new"
  ).textContent = `${demoMetrics.today.newLeads} new leads today`;
  document.getElementById(
    "today-open"
  ).textContent = `${demoMetrics.today.openJobs} open jobs`;
  document.getElementById(
    "today-messages"
  ).textContent = `${demoMetrics.today.unreadMessages} unread admin messages`;

  document.getElementById("fin-invoiced").textContent = formatCurrency(
    demoMetrics.finance.invoiced
  );
  document.getElementById("fin-paid").textContent = formatCurrency(
    demoMetrics.finance.paid
  );
  document.getElementById("fin-average").textContent = formatCurrency(
    demoMetrics.finance.average
  );
}

function initLeadsTable() {
  const tbody = document.querySelector("#leadsTable tbody");
  tbody.innerHTML = "";

  demoLeads.forEach((lead) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${lead.date}</td>
      <td>${lead.client}</td>
      <td>${lead.service}</td>
      <td>${lead.region}</td>
      <td>${lead.status}</td>
      <td>${lead.value}</td>
    `;
    tbody.appendChild(tr);
  });
}

function initMessages() {
  const list = document.getElementById("adminMessages");
  list.innerHTML = "";

  demoMessages.forEach((m) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="sp-timeline-date">${m.date}</div>
      <div><strong>${m.title}</strong></div>
      <div>${m.body}</div>
    `;
    list.appendChild(li);
  });
}

// ======== NAVIGATION =========
function initNav() {
  const buttons = document.querySelectorAll(".sp-nav-item");
  const sections = {
    overview: document.getElementById("section-overview"),
    leads: document.getElementById("section-leads"),
    messages: document.getElementById("section-messages"),
    finance: document.getElementById("section-finance")
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("sp-nav-item-active"));
      btn.classList.add("sp-nav-item-active");

      const target = btn.getAttribute("data-section");
      Object.keys(sections).forEach((key) => {
        sections[key].classList.toggle(
          "sp-section-active",
          key === target
        );
      });
    });
  });
}

// ======== THEME TOGGLE (OPTIONAL) =========
function initThemeToggle() {
  const btn = document.getElementById("toggleTheme");
  btn.addEventListener("click", () => {
    document.body.classList.toggle("sp-light");
  });
}

// ======== DOWNLOAD CSV (FRONTEND ONLY) =========
function initDownloadCsv() {
  document
    .getElementById("btnDownloadCsv")
    .addEventListener("click", () => {
      let csv = "date,client,service,region,status,value\n";
      demoLeads.forEach((l) => {
        csv += `${l.date},${l.client},${l.service},${l.region},${l.status},${l.value}\n`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "servicepoint_leads.csv";
      a.click();
      URL.revokeObjectURL(url);
    });
}

// ======== POPUP PLACEHOLDERS FOR NEW JOB / QUICK LEAD ========
function initButtons() {
  document.getElementById("btnNewJob").addEventListener("click", () => {
    alert(
      "In the live system this would open a form to add a manual job to your pipeline."
    );
  });
  document.getElementById("btnQuickLead").addEventListener("click", () => {
    alert(
      "In the live system this would open a quick form to add a walk-in / call-in lead."
    );
  });
}

// ======== INIT ALL =========
document.addEventListener("DOMContentLoaded", () => {
  initMetrics();
  initLeadsTable();
  initMessages();
  initNav();
  initThemeToggle();
  initDownloadCsv();
  initButtons();
});
