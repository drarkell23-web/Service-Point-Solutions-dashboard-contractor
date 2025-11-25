// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("theme-light");
    if (isDark) {
      themeToggle.textContent = "☀ Light";
    } else {
      themeToggle.textContent = "☾ Dark";
    }
  });
}

// ===== NAV TABS =====
const tabs = document.querySelectorAll(".nav-tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});

// ===== MOCK DATA (replace with real API later) =====
const pipelineData = [
  { stage: "New", count: 3 },
  { stage: "Contacted", count: 2 },
  { stage: "Quoted", count: 1 },
  { stage: "Booked", count: 0 }
];

const activityData = [
  "New lead: Kitchen renovation in Durban North.",
  "Quote awaiting approval: Leak detection in Randburg.",
  "Job booked: Solar install in Ballito for Friday.",
  "Reminder: Follow up on unpaid invoice INV-104."
];

const jobsData = [
  {
    date: "Today",
    time: "10:00",
    client: "Thandi N.",
    service: "Leak detection – Morningside, Durban"
  },
  {
    date: "Today",
    time: "14:30",
    client: "Johan V.",
    service: "DB board upgrade – Randburg"
  },
  {
    date: "Tomorrow",
    time: "09:00",
    client: "Cape Property Care",
    service: "Solar maintenance – Stellenbosch"
  }
];

const leadsData = [
  {
    received: "Today",
    client: "Cal Media",
    service: "Real-estate photography",
    region: "CPT – Southern Suburbs",
    budget: "R 2 500",
    status: "New",
    source: "ServicePoint SA"
  },
  {
    received: "Yesterday",
    client: "PT Nation Sandton",
    service: "Gym fit-out – electrical & flooring",
    region: "JHB – Sandton",
    budget: "R 85 000",
    status: "Quoted",
    source: "WhatsApp"
  },
  {
    received: "2 days ago",
    client: "KZN PowerWorks",
    service: "Roof waterproofing",
    region: "KZN – Durban North",
    budget: "R 32 000",
    status: "Booked",
    source: "Website"
  },
  {
    received: "3 days ago",
    client: "Homeowner – Msomi family",
    service: "Geyser replacement",
    region: "KZN – Umlazi",
    budget: "R 7 500",
    status: "Closed",
    source: "Repeat"
  }
];

const financeRows = [
  {
    invoice: "INV-104",
    client: "Msomi family",
    service: "Geyser replacement",
    amount: "R 7 500",
    status: "Awaiting payment",
    due: "3 days"
  },
  {
    invoice: "INV-103",
    client: "PT Nation Sandton",
    service: "Electrical & flooring",
    amount: "R 74 000",
    status: "Part paid",
    due: "10 days"
  },
  {
    invoice: "INV-102",
    client: "Cal Media",
    service: "Studio rewiring",
    amount: "R 18 500",
    status: "Paid",
    due: "Paid"
  }
];

// ===== POPULATE OPERATIONS TAB =====
const pipelineGrid = document.getElementById("pipelineGrid");
const activityList = document.getElementById("activityList");

if (pipelineGrid) {
  pipelineData.forEach((stage) => {
    const div = document.createElement("div");
    div.className = "pipeline-stage";
    div.innerHTML = `
      <div class="pipeline-label">${stage.stage}</div>
      <div class="pipeline-value">${stage.count}</div>
    `;
    pipelineGrid.appendChild(div);
  });
}

if (activityList) {
  activityData.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    activityList.appendChild(li);
  });
}

// Simple stats from leads
const statLeadsMonth = document.getElementById("statLeadsMonth");
const statJobsBooked = document.getElementById("statJobsBooked");
const statConversion = document.getElementById("statConversion");

if (statLeadsMonth && statJobsBooked && statConversion) {
  const totalLeads = leadsData.length;
  const booked = leadsData.filter((l) => l.status === "Booked").length;
  const conversion = totalLeads ? Math.round((booked / totalLeads) * 100) : 0;

  statLeadsMonth.textContent = totalLeads;
  statJobsBooked.textContent = booked;
  statConversion.textContent = conversion + "%";
}

// ===== JOBS TAB =====
const jobsList = document.getElementById("jobsList");
const calendarStrip = document.getElementById("calendarStrip");

if (jobsList) {
  jobsData.forEach((job) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${job.date}</strong> · ${job.time} · ${job.client} – ${job.service}`;
    jobsList.appendChild(li);
  });
}

if (calendarStrip) {
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const div = document.createElement("div");
    div.className = "calendar-day";
    const day = d.toLocaleDateString("en-ZA", { weekday: "short" });
    const date = d.getDate();
    div.innerHTML = `<span class="date">${date}</span><span>${day}</span>`;
    calendarStrip.appendChild(div);
  }
}

// ===== LEADS TAB =====
const leadsTableBody = document.querySelector("#leadsTable tbody");
const filterButtons = document.querySelectorAll(".pill-filter-btn");

function renderLeads(filterStatus = "all") {
  if (!leadsTableBody) return;
  leadsTableBody.innerHTML = "";

  leadsData
    .filter((lead) => filterStatus === "all" || lead.status === filterStatus)
    .forEach((lead, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${lead.received}</td>
        <td>${lead.client}</td>
        <td>${lead.service}</td>
        <td>${lead.region}</td>
        <td>${lead.budget}</td>
        <td><span class="lead-status ${lead.status}">${lead.status}</span></td>
        <td>${lead.source}</td>
        <td><button class="btn btn-ghost btn-small" data-lead-index="${index}">View</button></td>
      `;
      leadsTableBody.appendChild(tr);
    });
}

if (leadsTableBody) {
  renderLeads();

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderLeads(btn.dataset.status);
    });
  });

  // When clicking "View", open popup pre-filled (could be expanded later)
  leadsTableBody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("button[data-lead-index]")) {
      const idx = target.getAttribute("data-lead-index");
      const lead = leadsData[idx];
      if (lead) {
        openPopup(`Lead: ${lead.client} · ${lead.service}`);
      }
    }
  });
}

// ===== FINANCE TAB =====
const financeTableBody = document.querySelector("#financeTable tbody");
const statQuoted = document.getElementById("statQuoted");
const statInvoiced = document.getElementById("statInvoiced");
const statOutstanding = document.getElementById("statOutstanding");

if (financeTableBody) {
  financeRows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.invoice}</td>
      <td>${row.client}</td>
      <td>${row.service}</td>
      <td>${row.amount}</td>
      <td>${row.status}</td>
      <td>${row.due}</td>
    `;
    financeTableBody.appendChild(tr);
  });

  // simple totals for demo
  statQuoted.textContent = "R 110 000";
  statInvoiced.textContent = "R 100 000";
  statOutstanding.textContent = "R 17 500";
}

// ===== POPUP + TELEGRAM LEAD (same style as main site, ready for backend hook) =====
const popupEl = document.getElementById("popup");
const selectedServiceEl = document.getElementById("selectedService");

function openPopup(serviceName) {
  if (!popupEl || !selectedServiceEl) return;
  selectedServiceEl.textContent = serviceName || "General service request";
  popupEl.style.display = "flex";
}

function openPopupFromCTA() {
  openPopup("General service request");
}

function closePopup() {
  if (!popupEl) return;
  popupEl.style.display = "none";
}

// expose to HTML
window.openPopupFromCTA = openPopupFromCTA;
window.scrollToWhy = function () {
  const el = document.getElementById("why-section");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// SEND LEAD -> Telegram (same token you already use)
function sendLead() {
  const nameInput = document.getElementById("clientName");
  const phoneInput = document.getElementById("clientPhone");
  if (!nameInput || !phoneInput || !selectedServiceEl) return;

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const service = selectedServiceEl.textContent.trim();

  if (!name || !phone) {
    alert("Please fill in your name and contact number.");
    return;
  }

  const botToken = "8526401033:AAFrG8IH8xqQL_RTD7s7JLyxZpc8e8GOyyg";
  const chatId = "8187670531";

  const msg = `🔥 *New ServicePoint Contractor Lead*
📌 Service: ${service}
👤 Contractor: ${name}
📱 Phone: ${phone}`;

  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      msg
    )}&parse_mode=Markdown`
  )
    .then(() => {
      alert(
        "Thanks! ServicePoint HQ has received this and will route leads your way."
      );
      nameInput.value = "";
      phoneInput.value = "";
      closePopup();
    })
    .catch(() => {
      alert(
        "We couldn't reach the assistant right now. Please try again in a moment."
      );
    });
}

window.sendLead = sendLead;
window.closePopup = closePopup;

// ===== INBOX =====
const inboxThread = document.getElementById("inboxThread");
const inboxForm = document.getElementById("inboxForm");
const inboxMessageInput = document.getElementById("inboxMessage");

const starterMessages = [
  {
    from: "hq",
    text: "Hi! Welcome to your ServicePoint SA contractor dashboard.",
    time: "09:00"
  },
  {
    from: "hq",
    text: "When we send you a new lead, we’ll drop a note here as well.",
    time: "09:02"
  }
];

function renderMessage(msg) {
  if (!inboxThread) return;
  const row = document.createElement("div");
  row.className = "message-row " + (msg.from === "hq" ? "message-hq" : "message-me");

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = `
    <div>${msg.text}</div>
    <div class="message-meta">${msg.from === "hq" ? "ServicePoint HQ" : "You"} · ${
    msg.time
  }</div>
  `;

  row.appendChild(bubble);
  inboxThread.appendChild(row);
  inboxThread.scrollTop = inboxThread.scrollHeight;
}

if (inboxThread) {
  starterMessages.forEach(renderMessage);
}

if (inboxForm && inboxMessageInput) {
  inboxForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inboxMessageInput.value.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit"
    });
    renderMessage({ from: "me", text, time });
    inboxMessageInput.value = "";
  });
}

// Buttons for new job / quick lead (just send you to inbox for now)
const btnNewJob = document.getElementById("btnNewJob");
const btnQuickLead = document.getElementById("btnQuickLead");

if (btnNewJob) {
  btnNewJob.addEventListener("click", () => {
    // In a real build you’d open a job form; for now push a note into Inbox.
    renderMessage({
      from: "me",
      text: "New job created – please link incoming leads for this project.",
      time: new Date().toLocaleTimeString("en-ZA", {
        hour: "2-digit",
        minute: "2-digit"
      })
    });
    // switch to Inbox
    document.querySelector('[data-tab="inbox"]').click();
  });
}

if (btnQuickLead) {
  btnQuickLead.addEventListener("click", () => {
    document.querySelector('[data-tab="leads"]').click();
  });
}
