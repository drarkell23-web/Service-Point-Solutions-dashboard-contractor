// ServicePoint SA — Contractor Dashboard

function offsetDays(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split("T")[0];
}

// ---- Seed data (can be replaced with real backend) ----

const seedBookings = [
  {
    id: 1,
    client: "Umhlanga Ridge Body Corp",
    type: "Plumbing & leak detection",
    date: offsetDays(1),
    time: "10:00",
    location: "Umhlanga Ridge, Block B",
    price: 4850,
    status: "Scheduled",
    paid: false,
  },
  {
    id: 2,
    client: "Smith Family",
    type: "Emergency electrical / power fault",
    date: offsetDays(0),
    time: "18:30",
    location: "Durban North",
    price: 1650,
    status: "On route",
    paid: false,
  },
  {
    id: 3,
    client: "SmartBuild Projects",
    type: "Renovation & maintenance project",
    date: offsetDays(3),
    time: "08:00",
    location: "Westville office park",
    price: 18200,
    status: "In progress",
    paid: true,
  },
  {
    id: 4,
    client: "Ocean View Guesthouse",
    type: "Solar & backup installation",
    date: offsetDays(2),
    time: "07:30",
    location: "La Lucia",
    price: 7200,
    status: "Scheduled",
    paid: false,
  },
];

const seedLeads = [
  {
    name: "Parkview Centre",
    type: "Service contract",
    stage: "Hot",
    value: 28500,
    source: "ServicePoint",
  },
  {
    name: "Bolton Properties",
    type: "Building maintenance & repairs",
    stage: "Hot",
    value: 62400,
    source: "Google Ads",
  },
  {
    name: "Ndlovu Family",
    type: "Emergency call-out",
    stage: "Warm",
    value: 1850,
    source: "WhatsApp",
  },
  {
    name: "Kingsway Flats",
    type: "Leak detection & plumbing",
    stage: "Warm",
    value: 3600,
    source: "Repeat client",
  },
];

const seedClients = [
  {
    name: "Parkview Centre",
    type: "Service contract",
    stage: "Proposal sent",
    value: 28500,
    next: "Confirm monthly scope & SLA",
    email: "centre.manager@parkview.co.za",
    phone: "+27 82 123 4567",
  },
  {
    name: "SmartBuild Projects",
    type: "Renovation & maintenance",
    stage: "Active project",
    value: 18200,
    next: "Site snag walk-through",
    email: "projects@smartbuild.co.za",
    phone: "+27 83 987 6543",
  },
  {
    name: "Ocean View Guesthouse",
    type: "Solar & hot water",
    stage: "Repeat client",
    value: 7200,
    next: "Service backup system before season",
    email: "info@oceanviewstay.co.za",
    phone: "+27 82 555 1212",
  },
  {
    name: "Bolton Properties",
    type: "Estate maintenance",
    stage: "Discovery",
    value: 62400,
    next: "Site inspection & scope",
    email: "maintenance@boltonprops.co.za",
    phone: "+27 82 777 9898",
  },
];

const seedFinanceSummary = [
  {
    label: "Jobs booked this month",
    value: 142800,
  },
  {
    label: "Paid invoices (month)",
    value: 98600,
  },
  {
    label: "Outstanding invoices",
    value: 44200,
  },
  {
    label: "Average job value",
    value: 3240,
  },
];

const seedInvoices = [
  {
    client: "Parkview Centre",
    job: "Service contract – shopping centre",
    amount: 28500,
    status: "Overdue 7 days",
  },
  {
    client: "Ocean View Guesthouse",
    job: "Solar & geyser service",
    amount: 7200,
    status: "Due in 3 days",
  },
  {
    client: "SmartBuild Projects",
    job: "Renovation snag list repairs",
    amount: 18200,
    status: "Sent – awaiting approval",
  },
];

const seedPackages = [
  {
    name: "Standard call-out (Mon–Fri)",
    price: 850,
    includes: "Includes first 30 minutes on site, excl. materials.",
  },
  {
    name: "After-hours emergency call-out",
    price: 1450,
    includes: "24/7 response, priority dispatch, excl. materials.",
  },
  {
    name: "Annual service plan – residential",
    price: 9600,
    includes: "Quarterly inspections, preferential rates, priority response.",
  },
  {
    name: "Commercial maintenance contract",
    price: 39200,
    includes: "Custom SLA for centres, complexes & hotels.",
  },
];

const seedTasks = [
  {
    title: "Confirm Parkview Centre SLA",
    date: offsetDays(1),
    category: "Jobs",
  },
  {
    title: "Send invoices for SmartBuild & Ocean View",
    date: offsetDays(0),
    category: "Finance",
  },
  {
    title: "Order consumables & fittings",
    date: offsetDays(2),
    category: "Vehicles & stock",
  },
];

const seedGalleries = [
  {
    client: "Smith Family",
    type: "Bathroom renovation",
    status: "Completed",
    photos: "12",
    link: "#JOB-1842",
  },
  {
    client: "Umhlanga Ridge Body Corp",
    type: "Leak detection & repairs",
    status: "Completed",
    photos: "8",
    link: "#JOB-1798",
  },
  {
    client: "Ocean View Guesthouse",
    type: "Solar & geyser upgrade",
    status: "Completed",
    photos: "16",
    link: "#JOB-1811",
  },
];

// State (persisted where useful)
let bookings =
  JSON.parse(localStorage.getItem("grs-bookings") || "null") ||
  seedBookings.slice();
let tasksState =
  JSON.parse(localStorage.getItem("grs-tasks-all") || "null") ||
  seedTasks.slice();
let expensesState =
  JSON.parse(localStorage.getItem("grs-expenses") || "null") || [];

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  initCharts();
  renderOverviewBlocks();
  renderClients();
  renderFinance();
  renderGalleries();
  initNotes();
  initCalendar();
  initLeadForm();
  initBookings();
  initTasks();
  initExpenses();
  initTopButtons();
  initModals();
  applySavedTheme();
});

// Helpers
function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timeout);
  showToast._timeout = setTimeout(
    () => toast.classList.remove("show"),
    2500
  );
}

// Navigation
function wireNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");
  const title = document.getElementById("section-title");

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      navItems.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.section;
      sections.forEach((sec) => {
        sec.classList.toggle(
          "section-active",
          sec.id === `section-${target}`
        );
      });

      const mapTitle = {
        overview: "Operations overview",
        calendar: "Jobs calendar & dispatch",
        clients: "Leads, clients & pipeline",
        finance: "Finance & service mix",
        galleries: "Job sheets & compliance",
        tasks: "Tasks & workflow",
      };

      title.textContent =
        mapTitle[target] || "ServicePoint SA — Contractor dashboard";
    });
  });

  document
    .getElementById("toggle-theme")
    .addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  if (next === "dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  localStorage.setItem("grs-theme", next);
}

function applySavedTheme() {
  const saved = localStorage.getItem("grs-theme");
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

// Charts
let revenueChart, jobTypesChart, packagesChart;

function initCharts() {
  const revCtx = document
    .getElementById("chart-revenue")
    .getContext("2d");
  const typesCtx = document
    .getElementById("chart-shoot-types")
    .getContext("2d");
  const pkgCtx = document
    .getElementById("chart-packages")
    .getContext("2d");

  revenueChart = new Chart(revCtx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue (ZAR)",
          data: [
            42000, 48600, 51200, 62800, 70400, 81200, 92800, 97400, 88600,
            102400, 112800, 118600,
          ],
          tension: 0.3,
          borderWidth: 2,
        },
        {
          label: "Jobs completed",
          data: [32, 36, 41, 47, 52, 58, 63, 66, 61, 72, 78, 81],
          tension: 0.3,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: { font: { size: 10 } },
        },
      },
      scales: {
        x: { ticks: { font: { size: 10 } } },
        y: { ticks: { font: { size: 9 } } },
      },
    },
  });

  jobTypesChart = new Chart(typesCtx, {
    type: "doughnut",
    data: {
      labels: [
        "Emergency call-outs",
        "Solar & backup",
        "Electrical",
        "Plumbing",
        "Projects / renovations",
        "Maintenance contracts",
      ],
      datasets: [
        {
          data: [22, 14, 18, 26, 12, 8],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 9 } },
        },
      },
    },
  });

  packagesChart = new Chart(pkgCtx, {
    type: "bar",
    data: {
      labels: seedPackages.map((p) => p.name),
      datasets: [
        {
          label: "Package price (ZAR)",
          data: seedPackages.map((p) => p.price),
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: { ticks: { font: { size: 9 } } },
        y: { ticks: { font: { size: 9 } } },
      },
    },
  });
}

// Overview metrics + lists
function renderOverviewBlocks() {
  const leadsMetric = document.getElementById("metric-leads");
  const jobsMetric = document.getElementById("metric-shoots");
  const revenueMetric = document.getElementById("metric-revenue");
  const urgentMetric = document.getElementById("metric-invoices");
  const upcomingList = document.getElementById("upcoming-list");
  const hotLeadsList = document.getElementById("hot-leads");

  const totalJobs = bookings.length;
  const urgentJobs = bookings.filter(
    (b) => b.status === "On route" || b.status === "Scheduled"
  ).length;
  const revenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  leadsMetric.textContent = seedLeads.length + 64;
  jobsMetric.textContent = totalJobs;
  revenueMetric.textContent = `R ${revenue.toLocaleString("en-ZA")}`;
  urgentMetric.textContent = urgentJobs;

  // Upcoming list
  upcomingList.innerHTML = "";
  bookings
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((b) => {
      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `
        <button class="link" data-job-id="${b.id}">
          <div class="list-main">
            <span class="list-title">${b.client}</span>
            <span class="list-sub">${b.type}</span>
          </div>
          <div class="list-meta">
            <span>${formatDateShort(b.date)} · ${b.time}</span>
            <span>${b.location}</span>
          </div>
        </button>
      `;
      upcomingList.appendChild(li);
    });

  // Hot leads
  hotLeadsList.innerHTML = "";
  seedLeads.forEach((l) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <div class="list-main">
        <span class="list-title">${l.name}</span>
        <span class="list-sub">${l.type}</span>
      </div>
      <div class="list-meta">
        <span>${l.stage}</span>
        <span>~ R ${l.value.toLocaleString("en-ZA")}</span>
        <span>${l.source}</span>
      </div>
    `;
    hotLeadsList.appendChild(li);
  });
}

// Calendar
function initCalendar() {
  const dateInput = document.getElementById("calendar-date");
  const dayList = document.getElementById("calendar-day-list");
  if (!dateInput) return;

  dateInput.value = offsetDays(0);

  function renderForDate(dateStr) {
    dayList.innerHTML = "";
    const jobs = bookings.filter((b) => b.date === dateStr);
    if (!jobs.length) {
      dayList.innerHTML =
        '<li class="list-simple">No jobs scheduled for this date.</li>';
      return;
    }
    jobs.forEach((b) => {
      const li = document.createElement("li");
      li.className = "list-item";
      li.innerHTML = `
        <button class="link" data-job-id="${b.id}">
          <div class="list-main">
            <span class="list-title">${b.client}</span>
            <span class="list-sub">${b.type}</span>
          </div>
          <div class="list-meta">
            <span>${b.time}</span>
            <span>${b.location}</span>
          </div>
        </button>
      `;
      dayList.appendChild(li);
    });
  }

  dateInput.addEventListener("change", () => renderForDate(dateInput.value));
  renderForDate(dateInput.value);
}

// Clients / pipeline
function renderClients() {
  const tableBody = document.getElementById("clients-table");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  seedClients.forEach((c, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><button class="link" data-client-index="${index}">${c.name}</button></td>
      <td>${c.type}</td>
      <td>${c.stage}</td>
      <td>R ${c.value.toLocaleString("en-ZA")}</td>
      <td>${c.next}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Finance
function renderFinance() {
  const summaryList = document.getElementById("finance-summary");
  const invoicesList = document.getElementById("finance-invoices");
  const packageList = document.getElementById("package-list");

  summaryList.innerHTML = "";
  seedFinanceSummary.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.label}: R ${item.value.toLocaleString("en-ZA")}`;
    summaryList.appendChild(li);
  });

  invoicesList.innerHTML = "";
  seedInvoices.forEach((inv) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${inv.client}</strong> · ${inv.job} ·
      <span>R ${inv.amount.toLocaleString("en-ZA")}</span> ·
      <span>${inv.status}</span>
    `;
    invoicesList.appendChild(li);
  });

  packageList.innerHTML = "";
  seedPackages.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.name}</strong> · R ${p.price.toLocaleString("en-ZA")}
      <br /><span>${p.includes}</span>
    `;
    packageList.appendChild(li);
  });
}

// Job sheets
function renderGalleries() {
  const tableBody = document.getElementById("galleries-table");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  seedGalleries.forEach((g) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.client}</td>
      <td>${g.type}</td>
      <td>${g.status}</td>
      <td>${g.photos}</td>
      <td>${g.link}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Notes
function initNotes() {
  const notesArea = document.getElementById("quick-notes");
  const status = document.getElementById("notes-status");
  const btn = document.getElementById("save-notes");
  if (!notesArea || !btn) return;

  const saved = localStorage.getItem("grs-notes");
  if (saved) {
    notesArea.value = saved;
    status.textContent = "Notes loaded.";
  }

  btn.addEventListener("click", () => {
    localStorage.setItem("grs-notes", notesArea.value);
    status.textContent = "Saved just now.";
    showToast("Notes saved.");
  });
}

// Lead form
function initLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("lead-name").value.trim();
    const contact = document.getElementById("lead-contact").value.trim();
    const type = document.getElementById("lead-type").value;
    const msg = document.getElementById("lead-message").value.trim();

    if (!name || !contact) {
      showToast("Name and contact are required.");
      return;
    }

    console.log("New lead captured:", { name, contact, type, msg });
    showToast("Lead captured to dashboard.");
    form.reset();
  });
}

// Bookings / jobs
function initBookings() {
  const form = document.getElementById("booking-form");

  function nextId() {
    return bookings.length
      ? Math.max(...bookings.map((b) => b.id)) + 1
      : 1;
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const client = document.getElementById("booking-client").value.trim();
    const type = document.getElementById("booking-type").value;
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const price = Number(
      document.getElementById("booking-price").value || 0
    );
    const location =
      document.getElementById("booking-location").value.trim() || "-";

    if (!client || !date || !time) {
      showToast("Client, date and time are required.");
      return;
    }

    const booking = {
      id: nextId(),
      client,
      type,
      date,
      time,
      location,
      price,
      status: "Scheduled",
      paid: false,
    };

    bookings.push(booking);
    localStorage.setItem("grs-bookings", JSON.stringify(bookings));

    renderOverviewBlocks();
    initCalendar();

    console.log("New job:", booking);
    showToast(`Job added for ${client}.`);
    form.reset();
  });
}

// Tasks
function initTasks() {
  const tasksAll = document.getElementById("tasks-all");
  const tasksToday = document.getElementById("tasks-today");
  const form = document.getElementById("task-form");
  if (!tasksAll || !tasksToday || !form) return;

  function saveTasks() {
    localStorage.setItem("grs-tasks-all", JSON.stringify(tasksState));
  }

  function render() {
    tasksAll.innerHTML = "";
    tasksToday.innerHTML = "";
    const todayStr = offsetDays(0);

    tasksState.forEach((t, index) => {
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <div class="task-main">
          <div>${t.title}</div>
          <div class="task-meta">${formatDateShort(
            t.date
          )} · ${t.category}</div>
        </div>
        <div>
          <span class="task-tag">${t.category}</span>
          <button class="task-delete" data-index="${index}">×</button>
        </div>
      `;
      tasksAll.appendChild(li);

      const diffDays =
        (new Date(t.date) - new Date(todayStr)) /
        (1000 * 60 * 60 * 24);
      if (diffDays <= 0) {
        const liToday = li.cloneNode(true);
        tasksToday.appendChild(liToday);
      }
    });

    tasksAll.querySelectorAll(".task-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.index, 10);
        tasksState.splice(i, 1);
        saveTasks();
        render();
      });
    });

    if (!tasksToday.children.length) {
      tasksToday.innerHTML =
        '<li class="list-simple">Nothing urgent for today.</li>';
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const date = document.getElementById("task-date").value;
    const category = document.getElementById("task-category").value;
    if (!title || !date) {
      showToast("Task and due date are required.");
      return;
    }
    tasksState.push({ title, date, category });
    saveTasks();
    render();
    form.reset();
    showToast("Task added.");
  });

  render();
}

// Expenses & profit
function initExpenses() {
  const form = document.getElementById("expense-form");
  const list = document.getElementById("expense-list");
  const summary = document.getElementById("profit-summary");
  if (!form || !list || !summary) return;

  function saveExpenses() {
    localStorage.setItem("grs-expenses", JSON.stringify(expensesState));
  }

  function render() {
    list.innerHTML = "";
    let total = 0;
    expensesState.forEach((e, index) => {
      total += e.amount;
      const li = document.createElement("li");
      li.innerHTML = `
        ${e.item} · R ${e.amount.toLocaleString(
        "en-ZA"
      )} · ${e.category} · ${formatDateShort(e.date)}
      `;
      list.appendChild(li);
    });

    const revenueThisMonth =
      seedFinanceSummary.find(
        (x) => x.label === "Jobs booked this month"
      )?.value || 0;
    const profit = revenueThisMonth - total;
    summary.textContent = `Estimated profit this month: R ${profit.toLocaleString(
      "en-ZA"
    )} (Revenue: R ${revenueThisMonth.toLocaleString(
      "en-ZA"
    )} − Expenses: R ${total.toLocaleString("en-ZA")})`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const item = document.getElementById("expense-item").value.trim();
    const amount = Number(
      document.getElementById("expense-amount").value || 0
    );
    const category =
      document.getElementById("expense-category").value;
    const date = document.getElementById("expense-date").value;
    if (!item || !amount || !date) {
      showToast("Item, amount and date are required.");
      return;
    }
    expensesState.push({ item, amount, category, date });
    saveExpenses();
    render();
    form.reset();
    showToast("Expense added.");
  });

  render();
}

// Top buttons
function initTopButtons() {
  const btnNewBooking = document.getElementById("btn-new-booking");
  const btnAddLead = document.getElementById("btn-add-lead");

  if (btnNewBooking) {
    btnNewBooking.addEventListener("click", () => {
      document
        .querySelector('[data-section="calendar"]')
        .click();
      document
        .getElementById("booking-client")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  if (btnAddLead) {
    btnAddLead.addEventListener("click", () => {
      document
        .querySelector('[data-section="clients"]')
        .click();
      document
        .getElementById("lead-name")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

// Modals
function initModals() {
  const jobModalBackdrop = document.getElementById(
    "job-modal-backdrop"
  );
  const jobModalBody = document.getElementById("job-modal-body");
  const clientModalBackdrop = document.getElementById(
    "client-modal-backdrop"
  );
  const clientModalBody = document.getElementById(
    "client-modal-body"
  );
  const printBtn = document.getElementById("btn-print-invoice");

  document.body.addEventListener("click", (e) => {
    const jobBtn = e.target.closest("[data-job-id]");
    if (jobBtn) {
      const id = Number(jobBtn.dataset.job-id);
      const job = bookings.find((b) => b.id === id);
      if (job) {
        jobModalBody.innerHTML = `
          <p><strong>Client:</strong> ${job.client}</p>
          <p><strong>Job type:</strong> ${job.type}</p>
          <p><strong>Date:</strong> ${formatDateShort(
            job.date
          )} at ${job.time}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Quoted value:</strong> R ${job.price.toLocaleString(
            "en-ZA"
          )}</p>
          <p><strong>Status:</strong> ${job.status}</p>
          <p><strong>Paid:</strong> ${job.paid ? "Yes" : "No"}</p>
        `;
        jobModalBackdrop.classList.add("show");
      }
    }

    const clientBtn = e.target.closest("[data-client-index]");
    if (clientBtn) {
      const idx = Number(clientBtn.dataset.clientIndex);
      const c = seedClients[idx];
      if (c) {
        clientModalBody.innerHTML = `
          <p><strong>Client:</strong> ${c.name}</p>
          <p><strong>Job type:</strong> ${c.type}</p>
          <p><strong>Stage:</strong> ${c.stage}</p>
          <p><strong>Value:</strong> R ${c.value.toLocaleString(
            "en-ZA"
          )}</p>
          <p><strong>Next step:</strong> ${c.next}</p>
          <p><strong>Email:</strong> ${c.email}</p>
          <p><strong>Phone:</strong> ${c.phone}</p>
        `;
        clientModalBackdrop.classList.add("show");
      }
    }

    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) {
      const id = closeBtn.dataset.close;
      document.getElementById(id)?.classList.remove("show");
    }
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}
