// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    document.body.classList.toggle("theme-dark");
  });
}

// TAB SWITCHING
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".tab-panel").forEach((p) => {
      p.classList.toggle("active", p.id === `tab-${tab}`);
    });
  });
});

// MOCK DATA – you can later plug in APIs here
const pipelineData = [
  { stage: "New", count: 2, items: ["WhatsApp – Geyser", "Website – Solar quote"] },
  {
    stage: "Quoted",
    count: 3,
    items: ["Leak detection", "Kitchen renovation", "Complex repaint"],
  },
  {
    stage: "Booked",
    count: 1,
    items: ["Saturday – Fibre trenching"],
  },
  {
    stage: "Completed",
    count: 0,
    items: ["No jobs closed yet this week"],
  },
];

const todayItems = [
  {
    time: "09:00",
    title: "Site visit – Geyser replacement",
    detail: "Umbilo · Meet client S. Khumalo",
  },
  {
    time: "11:30",
    title: "Quote follow-up",
    detail: "Kitchen remodelling · WhatsApp R. Pillay",
  },
  {
    time: "15:00",
    title: "Team check-in",
    detail: "Confirm materials for tomorrow’s jobs",
  },
];

const leads = [
  {
    received: "Today",
    client: "Thandi N.",
    service: "Burst geyser – emergency",
    region: "Durban North",
    status: "Open",
    value: "R4 800",
  },
  {
    received: "Yesterday",
    client: "Cape Property Care",
    service: "Block of flats – solar assessment",
    region: "Cape Town CBD",
    status: "Follow-up",
    value: "R95 000",
  },
];

const invoices = [
  {
    date: "2025-02-03",
    num: "SP-INV-1023",
    client: "M. Dlamini",
    job: "Bathroom renovation – Phase 1",
    amount: "R38 500",
    status: "Paid",
  },
  {
    date: "2025-02-05",
    num: "SP-INV-1024",
    client: "Urban Apartments (Body Corp)",
    job: "Lift lobby repaint – Towers A/B",
    amount: "R62 000",
    status: "Sent",
  },
  {
    date: "2025-02-07",
    num: "SP-INV-1025",
    client: "CAL MEDIA Studio",
    job: "Electrical compliance – studio upgrade",
    amount: "R12 750",
    status: "Draft",
  },
];

const inboxMessages = [
  {
    from: "SP Admin – Finance",
    time: "Today · 09:24",
    body:
      "Reminder: Please upload proof of bank details for EFT payouts.\n" +
      "Reply on email if you need help.",
  },
  {
    from: "SP Admin – Leads",
    time: "Yesterday · 15:02",
    body:
      "New region trial: We’re sending you more leads in Durban North for the next 2 weeks.\n" +
      "Keep your response time under 15 minutes for best ranking.",
  },
  {
    from: "SP Admin – Compliance",
    time: "Mon · 11:45",
    body:
      "Your electrical COC document expires in 30 days.\n" +
      "Please upload the renewed certificate when ready.",
  },
];

// RENDER OPERATIONS / PIPELINE
const pipelineColumnsEl = document.getElementById("pipelineColumns");
if (pipelineColumnsEl) {
  pipelineData.forEach((col) => {
    const div = document.createElement("div");
    div.className = "pipeline-column";
    div.innerHTML = `
      <h3>${col.stage}</h3>
      <div class="pipeline-count">${col.count}</div>
      <ul class="pipeline-items">
        ${col.items.map((i) => `<li>${i}</li>`).join("")}
      </ul>
    `;
    pipelineColumnsEl.appendChild(div);
  });
}

// Today timeline
const timelineEl = document.getElementById("todayTimeline");
if (timelineEl) {
  todayItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `
      <div class="timeline-time">${item.time}</div>
      <div class="timeline-body">
        <strong>${item.title}</strong>
        <span>${item.detail}</span>
      </div>
    `;
    timelineEl.appendChild(li);
  });
}

// METRICS – simple calc from leads + invoices
const metricNewLeadsEl = document.getElementById("metricNewLeads");
const metricJobsBookedEl = document.getElementById("metricJobsBooked");
const metricConversionEl = document.getElementById("metricConversion");
if (metricNewLeadsEl) {
  metricNewLeadsEl.textContent = leads.length.toString();
}
if (metricJobsBookedEl) {
  metricJobsBookedEl.textContent = "0"; // placeholder – wire to real jobs later
}
if (metricConversionEl) {
  metricConversionEl.textContent = "0%"; // placeholder
}

// LEADS TABLE
const leadTableBody = document.getElementById("leadTableBody");
const leadCountLabel = document.getElementById("leadCountLabel");

function renderLeads() {
  if (!leadTableBody) return;
  leadTableBody.innerHTML = "";
  leads.forEach((lead) => {
    const tr = document.createElement("tr");
    const statusClass =
      lead.status === "Open"
        ? "status-open"
        : lead.status === "Follow-up"
        ? "status-followup"
        : "status-closed";
    tr.innerHTML = `
      <td>${lead.received}</td>
      <td>${lead.client}</td>
      <td>${lead.service}</td>
      <td>${lead.region}</td>
      <td><span class="status-pill ${statusClass}">${lead.status}</span></td>
      <td>${lead.value}</td>
    `;
    leadTableBody.appendChild(tr);
  });
  if (leadCountLabel) {
    leadCountLabel.textContent = `${leads.length} open`;
  }
}
renderLeads();

// Simulate adding a lead (until you have real API wired)
const btnSimLead = document.getElementById("btnSimLead");
if (btnSimLead) {
  btnSimLead.addEventListener("click", () => {
    leads.unshift({
      received: "Just now",
      client: "New SP website lead",
      service: "General service request",
      region: "KZN · Durban",
      status: "Open",
      value: "TBC",
    });
    renderLeads();
    if (metricNewLeadsEl) {
      metricNewLeadsEl.textContent = leads.length.toString();
    }
    alert("Example lead added – wire this to your real API later.");
  });
}

// FINANCE
const metricInvoiced = document.getElementById("metricInvoiced");
const metricPaid = document.getElementById("metricPaid");
const metricOutstanding = document.getElementById("metricOutstanding");
const invoiceTableBody = document.getElementById("invoiceTableBody");

function renderFinance() {
  if (!invoiceTableBody) return;
  let total = 0;
  invoices.forEach((inv) => {
    const amount = parseFloat(inv.amount.replace(/[R\s,]/g, "")) || 0;
    total += amount;
  });

  const paidTotal = invoices
    .filter((i) => i.status === "Paid")
    .reduce(
      (sum, i) => sum + (parseFloat(i.amount.replace(/[R\s,]/g, "")) || 0),
      0
    );
  const outstandingTotal = total - paidTotal;

  if (metricInvoiced) metricInvoiced.textContent = `R${total.toLocaleString()}`;
  if (metricPaid) metricPaid.textContent = `R${paidTotal.toLocaleString()}`;
  if (metricOutstanding)
    metricOutstanding.textContent = `R${outstandingTotal.toLocaleString()}`;

  invoiceTableBody.innerHTML = "";
  invoices.forEach((inv) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${inv.date}</td>
      <td>${inv.num}</td>
      <td>${inv.client}</td>
      <td>${inv.job}</td>
      <td>${inv.amount}</td>
      <td>${inv.status}</td>
    `;
    invoiceTableBody.appendChild(tr);
  });
}
renderFinance();

// INBOX
const inboxList = document.getElementById("inboxList");
if (inboxList) {
  inboxMessages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "inbox-msg";
    div.innerHTML = `
      <div class="inbox-meta">
        <span>${msg.from}</span>
        <span>${msg.time}</span>
      </div>
      <div class="inbox-body">${msg.body}</div>
    `;
    inboxList.appendChild(div);
  });
}

// JOBS CALENDAR – simple week generator
const calendarGrid = document.getElementById("calendarGrid");
const weekRangeLabel = document.getElementById("weekRangeLabel");

function buildWeekCalendar() {
  if (!calendarGrid) return;
  calendarGrid.innerHTML = "";
  const now = new Date();
  const day = now.getDay(); // 0-6
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  const formatter = new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    day: "numeric",
  });

  const jobsMap = {
    1: ["09:00 – Geyser replacement"],
    3: ["11:00 – Solar site check", "15:30 – Body corp meeting"],
    4: ["14:00 – CCTV quote"],
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const label = formatter.format(date);
    const div = document.createElement("div");
    div.className = "calendar-day";

    const header = document.createElement("div");
    header.className = "calendar-day-header";
    header.innerHTML = `<span>${label}</span>`;

    const jobsBox = document.createElement("div");
    jobsBox.className = "calendar-day-jobs";

    const dayJobs = jobsMap[i] || [];
    if (dayJobs.length === 0) {
      jobsBox.innerHTML = `<span style="color:var(--text-muted);font-size:10px;">No jobs yet</span>`;
    } else {
      dayJobs.forEach((j) => {
        const chip = document.createElement("div");
        chip.className = "calendar-job";
        chip.textContent = j;
        jobsBox.appendChild(chip);
      });
    }

    div.appendChild(header);
    div.appendChild(jobsBox);
    calendarGrid.appendChild(div);
  }

  if (weekRangeLabel) {
    const end = new Date(monday);
    end.setDate(monday.getDate() + 6);
    const shortFmt = new Intl.DateTimeFormat("en-ZA", {
      day: "numeric",
      month: "short",
    });
    weekRangeLabel.textContent = `${shortFmt.format(monday)} – ${shortFmt.format(
      end
    )}`;
  }
}
buildWeekCalendar();

/* POPUP + TELEGRAM LEAD
   Same idea as main site: human assistant chat.
*/
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

window.openPopupFromCTA = openPopupFromCTA;
window.openPopup = openPopup;
window.closePopup = closePopup;

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

  const msg = `🔥 *New Contractor HQ Lead*
📌 Service: ${service}
👤 Name: ${name}
📱 Phone: ${phone}
💼 Source: Contractor HQ dashboard`;

  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}` +
      `&text=${encodeURIComponent(msg)}&parse_mode=Markdown`
  )
    .then(() => {
      alert(
        "Thanks! Our human assistant has received your request and will follow up."
      );
      nameInput.value = "";
      phoneInput.value = "";
      closePopup();
    })
    .catch(() => {
      alert("We could not send the request right now. Please try again.");
    });
}

window.sendLead = sendLead;

// Buttons that open popup from Operations
const btnNewJob = document.getElementById("btnNewJob");
if (btnNewJob) {
  btnNewJob.addEventListener("click", () =>
    openPopup("New job – specify details with assistant")
  );
}
const btnQuickLead = document.getElementById("btnQuickLead");
if (btnQuickLead) {
  btnQuickLead.addEventListener("click", () =>
    openPopup("Quick ServicePoint enquiry")
  );
}
const btnAddJobFromCalendar = document.getElementById("btnAddJobFromCalendar");
if (btnAddJobFromCalendar) {
  btnAddJobFromCalendar.addEventListener("click", () =>
    openPopup("Calendar job – specify date/time")
  );
}
