const STORAGE_KEY = "campusSpend.dashboard.v1";
const STORAGE_VERSION = 6;
const OPENING_BALANCE = 4250;
const DEFAULT_MONTHLY_BUDGET = 15000;
const CURRENCY_LOCALES = { INR: "en-IN", USD: "en-US", EUR: "de-DE", GBP: "en-GB" };
const DEFAULT_PROFILE = {
  fullName: "Jordan Davis",
  email: "jordan.davis@campus.edu",
  collegeName: "Northstar University",
  course: "B.Sc. Computer Science",
  academicYear: "Year 2",
};
const DEFAULT_SETTINGS = {
  currency: "INR",
  theme: "light",
  notifications: { budgetAlerts: true, weeklySummary: true, goalMilestones: true },
};
const CATEGORY_COLORS = ["#4776e6", "#42b991", "#e7a64b", "#8d78e6", "#e56e77", "#3b9ab2", "#78869a"];
const TRANSACTION_CATEGORIES = {
  expense: ["Food", "Transportation", "Education", "Hostel/Rent", "Shopping", "Entertainment", "Health", "Other"],
  income: ["Pocket Money", "Scholarship", "Part-time Job", "Freelancing", "Other"],
};
const PAYMENT_METHODS = ["Cash", "UPI", "Debit Card", "Credit Card", "Bank Transfer"];
const BUDGET_CATEGORY_ICONS = {
  Food: "icon-food",
  Transportation: "icon-transit",
  Education: "icon-book",
  "Hostel/Rent": "icon-home",
  Shopping: "icon-bag",
  Entertainment: "icon-star",
  Health: "icon-health",
  Other: "icon-grid",
};
const BUDGET_CATEGORY_COLORS = {
  Food: ["#d28b36", "#fff4e3"],
  Transportation: ["#438bc4", "#eaf5ff"],
  Education: ["#7f70d5", "#f1efff"],
  "Hostel/Rent": ["#3d9b84", "#eaf7f2"],
  Shopping: ["#cb6680", "#fff0f4"],
  Entertainment: ["#d1913d", "#fff5e5"],
  Health: ["#d56469", "#fff0f0"],
  Other: ["#5b83d4", "#eef3ff"],
};
const DEFAULT_CATEGORY_BUDGETS = [
  { category: "Food", amount: 5000 },
  { category: "Transportation", amount: 2000 },
  { category: "Education", amount: 3000 },
  { category: "Hostel/Rent", amount: 7000 },
];
const SAVINGS_GOAL_CATEGORIES = ["Electronics", "Emergency Fund", "Travel", "Education", "Personal", "Other"];
const SAVINGS_GOAL_ICONS = {
  Electronics: "icon-bag",
  "Emergency Fund": "icon-health",
  Travel: "icon-transit",
  Education: "icon-book",
  Personal: "icon-star",
  Other: "icon-target",
};
const SAVINGS_GOAL_COLORS = {
  Electronics: ["#7f70d5", "#f1efff"],
  "Emergency Fund": ["#3d9b84", "#eaf7f2"],
  Travel: ["#438bc4", "#eaf5ff"],
  Education: ["#d28b36", "#fff4e3"],
  Personal: ["#cb6680", "#fff0f4"],
  Other: ["#5b83d4", "#eef3ff"],
};
const DEFAULT_SAVINGS_GOALS = [
  { id: "goal-laptop", name: "Buy a Laptop", targetAmount: 60000, savedAmount: 24000, targetDate: "2027-08-15", category: "Electronics", description: "A reliable laptop for coursework and projects." },
  { id: "goal-emergency", name: "Emergency Fund", targetAmount: 15000, savedAmount: 8500, targetDate: "2027-03-01", category: "Emergency Fund", description: "A little cushion for unexpected costs." },
  { id: "goal-trip", name: "College Trip", targetAmount: 10000, savedAmount: 4200, targetDate: "2027-04-15", category: "Travel", description: "Save up for the end-of-year college trip." },
  { id: "goal-phone", name: "New Smartphone", targetAmount: 25000, savedAmount: 12500, targetDate: "2027-01-30", category: "Electronics", description: "Replace my current phone without using credit." },
];
const SAMPLE_MIGRATIONS = {
  "sample-grant": { amount: 12500, category: "Scholarship", payment: "Bank Transfer" },
  "sample-campus-job": { amount: 2800, category: "Part-time Job", payment: "Bank Transfer" },
  "sample-cafe": { amount: 145, category: "Food", payment: "UPI" },
  "sample-bookstore": { amount: 1290, category: "Education", payment: "UPI" },
  "sample-metro": { amount: 900, category: "Transportation", payment: "UPI" },
  "sample-groceries": { amount: 2575, category: "Food", payment: "UPI" },
  "sample-laundry": { amount: 250, category: "Hostel/Rent", payment: "UPI" },
  "sample-coffee": { amount: 180, category: "Food", payment: "Cash" },
  "sample-supplies": { amount: 248, category: "Education", payment: "Debit Card" },
  "sample-previous-income": { amount: 7000, category: "Pocket Money", payment: "Bank Transfer" },
  "sample-previous-expense": { amount: 850, category: "Education", payment: "Credit Card" },
};
const viewNames = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  "add-expense": "Add expense",
  budgets: "Budgets",
  analytics: "Analytics",
  "savings-goals": "Savings goals",
  settings: "Settings",
};

const pageTitle = document.querySelector("#page-title");
const dashboardView = document.querySelector("[data-dashboard-view]");
const placeholderView = document.querySelector("[data-placeholder-view]");
const transactionsView = document.querySelector("[data-transactions-view]");
const budgetsView = document.querySelector("[data-budgets-view]");
const analyticsView = document.querySelector("[data-analytics-view]");
const settingsView = document.querySelector("[data-settings-view]");
const savingsGoalsView = document.querySelector("[data-savings-goals-view]");
const placeholderTitle = document.querySelector("#placeholder-title");
const sidebar = document.querySelector("#sidebar");
const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const sidebarScrim = document.querySelector("[data-sidebar-close]");
const notificationToggle = document.querySelector("[data-notification-toggle]");
const notificationMenu = document.querySelector("[data-notification-menu]");
const profileMenus = document.querySelectorAll("[data-profile-menu]");
const profileToggles = document.querySelectorAll("[data-profile-toggle]");
const searchInput = document.querySelector("#global-search");
const transactionList = document.querySelector("#transaction-list");
const managementList = document.querySelector("#management-transaction-list");
const managementSearch = document.querySelector("#transactions-search");
const emptySearch = document.querySelector("#empty-search");
const actionDialog = document.querySelector("#action-dialog");
const deleteDialog = document.querySelector("#delete-confirm-dialog");
const transactionForm = document.querySelector("#transaction-form");
const budgetForm = document.querySelector("#budget-form");
const categoryBudgetForm = document.querySelector("#category-budget-form");
const savingsGoalForm = document.querySelector("#savings-goal-form");
const profileSettingsForm = document.querySelector("#profile-settings-form");
const preferencesForm = document.querySelector("#preferences-form");
const profilePictureFile = document.querySelector("#profile-picture-file");
const importDataFile = document.querySelector("#import-data-file");
const toast = document.createElement("div");

toast.className = "toast";
toast.setAttribute("role", "status");
toast.setAttribute("aria-live", "polite");
document.body.append(toast);

let editingTransactionId = null;
let pendingDelete = null;
let editingBudgetCategory = null;
let editingSavingsGoalId = null;
let profilePicturePreviewUrl = null;
let transactionSubmitConsumed = false;

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDateKey(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && localDateKey(date) === value;
}

function dateOffset(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return localDateKey(date);
}

function newId() {
  return globalThis.crypto?.randomUUID?.() || `txn-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createSampleTransactions() {
  return [
    { id: "sample-grant", name: "Student scholarship", category: "Scholarship", date: dateOffset(15), payment: "Bank Transfer", type: "income", amount: 12500 },
    { id: "sample-campus-job", name: "Library assistant shift", category: "Part-time Job", date: dateOffset(3), payment: "Bank Transfer", type: "income", amount: 2800 },
    { id: "sample-cafe", name: "Campus Café", category: "Food", date: dateOffset(0), payment: "UPI", type: "expense", amount: 145 },
    { id: "sample-bookstore", name: "University Bookstore", category: "Education", date: dateOffset(1), payment: "UPI", type: "expense", amount: 1290 },
    { id: "sample-metro", name: "Metro student pass", category: "Transportation", date: dateOffset(2), payment: "UPI", type: "expense", amount: 900 },
    { id: "sample-groceries", name: "Residence hall groceries", category: "Food", date: dateOffset(3), payment: "UPI", type: "expense", amount: 2575 },
    { id: "sample-laundry", name: "Campus laundry", category: "Hostel/Rent", date: dateOffset(4), payment: "UPI", type: "expense", amount: 250 },
    { id: "sample-coffee", name: "Study group coffee", category: "Food", date: dateOffset(5), payment: "Cash", type: "expense", amount: 180 },
    { id: "sample-supplies", name: "Lab notebook and pens", category: "Education", date: dateOffset(10), payment: "Debit Card", type: "expense", amount: 248 },
    { id: "sample-previous-income", name: "Family support", category: "Pocket Money", date: dateOffset(38), payment: "Bank Transfer", type: "income", amount: 7000 },
    { id: "sample-previous-expense", name: "Textbook rental", category: "Education", date: dateOffset(40), payment: "Credit Card", type: "expense", amount: 850 },
  ];
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object" && Array.isArray(saved.transactions)) {
      const needsMigration = Number(saved.version || 0) < STORAGE_VERSION;
      const onlySamples = saved.transactions.length > 0 && saved.transactions.every((item) => item && typeof item.id === "string" && item.id.startsWith("sample-"));
      const savedMonthlyBudget = Number(saved.monthlyBudget);
      const savedProfile = saved.profile && typeof saved.profile === "object" ? saved.profile : {};
      const savedSettings = saved.settings && typeof saved.settings === "object" ? saved.settings : {};
      const savedNotifications = savedSettings.notifications && typeof savedSettings.notifications === "object"
        ? savedSettings.notifications
        : {};
      return {
        version: STORAGE_VERSION,
        transactions: saved.transactions
          .filter((item) => item && typeof item.id === "string" && item.id
            && typeof item.name === "string" && item.name.trim()
            && ["income", "expense"].includes(item.type)
            && Number.isFinite(Number(item.amount)) && Number(item.amount) > 0
            && isValidDateKey(item.date)
            && typeof item.category === "string" && item.category.trim()
            && typeof item.payment === "string" && item.payment.trim())
          .map((item) => needsMigration && SAMPLE_MIGRATIONS[item.id] ? { ...item, ...SAMPLE_MIGRATIONS[item.id] } : { ...item, amount: Number(item.amount) }),
        monthlyBudget: needsMigration && onlySamples && Number(saved.monthlyBudget) === 900
          ? 15000
          : Number.isFinite(savedMonthlyBudget) && savedMonthlyBudget > 0 ? savedMonthlyBudget : DEFAULT_MONTHLY_BUDGET,
        categoryBudgets: Array.isArray(saved.categoryBudgets)
          ? saved.categoryBudgets
            .filter((budget, index, budgets) => budget && TRANSACTION_CATEGORIES.expense.includes(budget.category)
              && Number.isFinite(Number(budget.amount)) && Number(budget.amount) > 0
              && budgets.findIndex((entry) => entry?.category === budget.category) === index)
            .map((budget) => ({ category: budget.category, amount: Number(budget.amount) }))
          : DEFAULT_CATEGORY_BUDGETS.map((budget) => ({ ...budget })),
        savingsGoals: Array.isArray(saved.savingsGoals)
          ? saved.savingsGoals
            .filter((goal, index, goals) => goal && typeof goal.name === "string"
              && Number.isFinite(Number(goal.targetAmount)) && Number(goal.targetAmount) > 0
              && Number.isFinite(Number(goal.savedAmount)) && Number(goal.savedAmount) >= 0
              && typeof goal.targetDate === "string" && SAVINGS_GOAL_CATEGORIES.includes(goal.category)
              && goals.findIndex((entry) => entry?.id === goal.id) === index)
            .map((goal) => ({ ...goal, targetAmount: Number(goal.targetAmount), savedAmount: Number(goal.savedAmount), description: String(goal.description || "") }))
          : DEFAULT_SAVINGS_GOALS.map((goal) => ({ ...goal })),
        profile: Object.fromEntries(Object.entries(DEFAULT_PROFILE).map(([key, fallback]) => [
          key,
          typeof savedProfile[key] === "string" && savedProfile[key].trim() ? savedProfile[key].trim() : fallback,
        ])),
        settings: {
          currency: Object.hasOwn(CURRENCY_LOCALES, savedSettings.currency) ? savedSettings.currency : DEFAULT_SETTINGS.currency,
          theme: ["light", "dark"].includes(savedSettings.theme) ? savedSettings.theme : DEFAULT_SETTINGS.theme,
          notifications: Object.fromEntries(Object.entries(DEFAULT_SETTINGS.notifications).map(([key, fallback]) => [
            key,
            typeof savedNotifications[key] === "boolean" ? savedNotifications[key] : fallback,
          ])),
        },
      };
    }
  } catch (error) {
    console.warn("CampusSpend could not load saved data; starting with sample transactions.", error);
  }
  return {
    version: STORAGE_VERSION,
    transactions: createSampleTransactions(),
    monthlyBudget: 15000,
    categoryBudgets: DEFAULT_CATEGORY_BUDGETS.map((budget) => ({ ...budget })),
    savingsGoals: DEFAULT_SAVINGS_GOALS.map((goal) => ({ ...goal })),
    profile: { ...DEFAULT_PROFILE },
    settings: { ...DEFAULT_SETTINGS, notifications: { ...DEFAULT_SETTINGS.notifications } },
  };
}

function createEmptyState() {
  return {
    version: STORAGE_VERSION,
    transactions: [],
    monthlyBudget: DEFAULT_MONTHLY_BUDGET,
    categoryBudgets: [],
    savingsGoals: [],
    profile: { ...DEFAULT_PROFILE },
    settings: { ...DEFAULT_SETTINGS, notifications: { ...DEFAULT_SETTINGS.notifications } },
  };
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: STORAGE_VERSION }));
  } catch (error) {
    showToast("Changes are active for this session but could not be saved.");
    console.warn("CampusSpend could not save dashboard data.", error);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function currency(amount) {
  const code = state.settings.currency;
  return new Intl.NumberFormat(CURRENCY_LOCALES[code] || "en-IN", { style: "currency", currency: code }).format(amount);
}

function currencySymbol() {
  const code = state.settings.currency;
  return new Intl.NumberFormat(CURRENCY_LOCALES[code] || "en-IN", { style: "currency", currency: code })
    .formatToParts(0).find((part) => part.type === "currency")?.value || code;
}

function syncCurrencyDisplay() {
  document.querySelectorAll("[data-currency-symbol]").forEach((element) => { element.textContent = currencySymbol(); });
  const chartUnit = document.querySelector("#analytics-chart-unit");
  if (chartUnit) chartUnit.textContent = state.settings.currency;
}

function monthKey(dateString) {
  return dateString.slice(0, 7);
}

function currentMonthKey() {
  return localDateKey(new Date()).slice(0, 7);
}

function previousMonthKey() {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  return localDateKey(date).slice(0, 7);
}

function sumType(transactions, type) {
  return transactions.reduce((total, transaction) => total + (transaction.type === type ? Number(transaction.amount) : 0), 0);
}

function currentMonthTransactions() {
  const month = currentMonthKey();
  return state.transactions.filter((transaction) => monthKey(transaction.date) === month);
}

function changePercent(current, previous) {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

function renderTrend(element, current, previous, lowerIsBetter = false) {
  const change = changePercent(current, previous);
  const isLower = change !== null && change < 0;
  const isBetter = lowerIsBetter ? isLower || change === 0 : !isLower;
  element.classList.remove("status-positive", "status-negative", "status-neutral");
  element.classList.add(change === null ? "status-neutral" : (isBetter ? "status-positive" : "status-negative"));
  element.textContent = change === null ? "New" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
}

function renderSummary() {
  const month = currentMonthTransactions();
  const previousMonth = state.transactions.filter((transaction) => monthKey(transaction.date) === previousMonthKey());
  const monthlyIncome = sumType(month, "income");
  const monthlyExpenses = sumType(month, "expense");
  const previousIncome = sumType(previousMonth, "income");
  const previousExpenses = sumType(previousMonth, "expense");
  const balance = OPENING_BALANCE + sumType(state.transactions, "income") - sumType(state.transactions, "expense");
  const previousBalance = balance - monthlyIncome + monthlyExpenses;
  const remaining = state.monthlyBudget - monthlyExpenses;
  const usedPercent = state.monthlyBudget ? (monthlyExpenses / state.monthlyBudget) * 100 : 0;
  const budgetCard = document.querySelector(".budget-summary");
  const budgetTrack = document.querySelector("#budget-progress");

  document.querySelector("#total-balance").textContent = currency(balance);
  document.querySelector("#monthly-income").textContent = currency(monthlyIncome);
  document.querySelector("#monthly-expenses").textContent = currency(monthlyExpenses);
  document.querySelector("#remaining-budget").textContent = currency(remaining);
  document.querySelector("#budget-used-label").textContent = `${Math.round(usedPercent)}% used`;
  document.querySelector("#budget-limit-label").textContent = `of ${currency(state.monthlyBudget)}`;
  budgetTrack.querySelector("span").style.width = `${Math.min(100, Math.max(0, usedPercent))}%`;
  const warning = usedPercent >= 80;
  budgetCard.classList.toggle("is-warning", warning);
  budgetTrack.classList.toggle("is-warning", warning);
  document.querySelector("#budget-notice").textContent = warning
    ? `You have used ${Math.round(usedPercent)}% of your monthly budget.`
    : `${currency(Math.max(0, remaining))} remains in your monthly budget.`;
  renderTrend(document.querySelector("#balance-change"), balance, previousBalance);
  renderTrend(document.querySelector("#income-change"), monthlyIncome, previousIncome);
  renderTrend(document.querySelector("#expense-change"), monthlyExpenses, previousExpenses, true);
  document.querySelector("#dashboard-date").textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(new Date()).toUpperCase();
}

function formatShortDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  const today = localDateKey(new Date());
  const yesterday = dateOffset(1);
  if (dateString === today) return "Today";
  if (dateString === yesterday) return "Yesterday";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function renderTransactions() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = [...state.transactions]
    .sort((first, second) => second.date.localeCompare(first.date))
    .filter((transaction) => [transaction.name, transaction.category, transaction.payment, transaction.type, transaction.date]
      .join(" ").toLowerCase().includes(query));

  transactionList.innerHTML = visible.map((transaction) => {
    const isIncome = transaction.type === "income";
    const name = escapeHtml(transaction.name);
    const category = escapeHtml(transaction.category);
    const payment = escapeHtml(transaction.payment);
    const id = escapeHtml(transaction.id);
    const date = formatShortDate(transaction.date);
    const amount = `${isIncome ? "+" : "−"}${currency(Number(transaction.amount))}`;
    const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || "?");
    return `<tr>
      <td><span class="merchant-icon ${isIncome ? "merchant-income" : "merchant-book"}">${initial}</span><span class="merchant-name">${name}<small>${escapeHtml(transaction.description || category)}</small></span></td>
      <td><span class="table-category">${category}</span></td>
      <td class="table-date">${date}</td>
      <td class="payment-method">${payment}</td>
      <td class="${isIncome ? "amount-income" : "amount-expense"}">${amount}</td>
      <td><span class="type-badge ${isIncome ? "type-income" : ""}">${isIncome ? "Income" : "Expense"}</span></td>
      <td><button class="delete-transaction" type="button" data-delete-transaction="${id}" aria-label="Delete transaction: ${name}"><svg class="icon" aria-hidden="true"><use href="#icon-close"/></svg></button></td>
    </tr>`;
  }).join("");

  emptySearch.hidden = visible.length > 0;
  emptySearch.textContent = state.transactions.length === 0
    ? "No transactions yet. Add an expense or income to get started."
    : "No matching transactions found.";
}

function renderTransactionFilters() {
  const categoryFilter = document.querySelector("#filter-category");
  const paymentFilter = document.querySelector("#filter-payment");
  const selectedCategory = categoryFilter.value;
  const selectedPayment = paymentFilter.value;
  const categories = [...new Set([...Object.values(TRANSACTION_CATEGORIES).flat(), ...state.transactions.map((transaction) => transaction.category)])]
    .sort((first, second) => first.localeCompare(second));
  const paymentMethods = [...new Set([...PAYMENT_METHODS, ...state.transactions.map((transaction) => transaction.payment)])]
    .filter(Boolean)
    .sort((first, second) => first.localeCompare(second));

  categoryFilter.innerHTML = `<option value="all">All categories</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
  paymentFilter.innerHTML = `<option value="all">All methods</option>${paymentMethods.map((method) => `<option value="${escapeHtml(method)}">${escapeHtml(method)}</option>`).join("")}`;
  categoryFilter.value = categories.includes(selectedCategory) ? selectedCategory : "all";
  paymentFilter.value = paymentMethods.includes(selectedPayment) ? selectedPayment : "all";
}

function renderManagementTransactions() {
  const type = document.querySelector("#filter-type").value;
  const category = document.querySelector("#filter-category").value;
  const payment = document.querySelector("#filter-payment").value;
  const fromDate = document.querySelector("#filter-date-from").value;
  const toDate = document.querySelector("#filter-date-to").value;
  const sort = document.querySelector("#sort-transactions").value;
  const query = managementSearch.value.trim().toLowerCase();
  const filtered = state.transactions.filter((transaction) => {
    const searchable = [transaction.name, transaction.category, transaction.description || ""].join(" ").toLowerCase();
    return (!query || searchable.includes(query))
      && (type === "all" || transaction.type === type)
      && (category === "all" || transaction.category === category)
      && (payment === "all" || transaction.payment === payment)
      && (!fromDate || transaction.date >= fromDate)
      && (!toDate || transaction.date <= toDate);
  });

  const sorters = {
    newest: (first, second) => second.date.localeCompare(first.date),
    oldest: (first, second) => first.date.localeCompare(second.date),
    highest: (first, second) => Number(second.amount) - Number(first.amount),
    lowest: (first, second) => Number(first.amount) - Number(second.amount),
  };
  filtered.sort((first, second) => sorters[sort](first, second) || second.id.localeCompare(first.id));

  managementList.innerHTML = filtered.map((transaction) => {
    const isIncome = transaction.type === "income";
    const id = escapeHtml(transaction.id);
    const name = escapeHtml(transaction.name);
    const categoryName = escapeHtml(transaction.category);
    const paymentMethod = escapeHtml(transaction.payment);
    return `<tr>
      <td><span class="merchant-icon ${isIncome ? "merchant-income" : "merchant-book"}">${escapeHtml(name.charAt(0).toUpperCase() || "?")}</span><span class="merchant-name">${name}<small>${escapeHtml(transaction.description || "Transaction")}</small></span></td>
      <td><span class="table-category">${categoryName}</span></td>
      <td class="table-date">${formatShortDate(transaction.date)}</td>
      <td class="payment-method">${paymentMethod}</td>
      <td><span class="type-badge ${isIncome ? "type-income" : ""}">${isIncome ? "Income" : "Expense"}</span></td>
      <td class="${isIncome ? "amount-income" : "amount-expense"}">${isIncome ? "+" : "−"}${currency(Number(transaction.amount))}</td>
      <td><div class="transaction-actions"><button class="transaction-action" type="button" aria-label="Edit transaction: ${name}" data-edit-transaction="${id}">Edit</button><button class="transaction-action transaction-action-delete" type="button" aria-label="Delete transaction: ${name}" data-delete-transaction="${id}">Delete</button></div></td>
    </tr>`;
  }).join("");

  const hasTransactions = state.transactions.length > 0;
  document.querySelector("#transaction-result-count").textContent = `Showing ${filtered.length} of ${state.transactions.length} transactions`;
  document.querySelector("#management-table-wrap").hidden = !hasTransactions;
  document.querySelector("#management-empty-state").hidden = hasTransactions;
  document.querySelector("#management-no-results").hidden = !hasTransactions || filtered.length > 0;
}

function renderCategories() {
  const totals = new Map();
  currentMonthTransactions().filter((transaction) => transaction.type === "expense").forEach((transaction) => {
    totals.set(transaction.category, (totals.get(transaction.category) || 0) + Number(transaction.amount));
  });
  const categories = [...totals.entries()].sort((first, second) => second[1] - first[1]);
  const total = categories.reduce((sum, [, amount]) => sum + amount, 0);
  const container = document.querySelector("#category-breakdown");

  if (categories.length === 0) {
    container.innerHTML = '<p class="category-empty">Your category breakdown will appear after you add an expense.</p>';
    return;
  }

  container.innerHTML = categories.slice(0, 5).map(([name, amount], index) => {
    const share = total ? (amount / total) * 100 : 0;
    const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
    return `<div class="category-item" style="--category-color:${color};--share:${share}%">
      <div class="category-item-head"><i class="category-color"></i><span class="category-item-name">${escapeHtml(name)}</span><strong class="category-item-amount">${currency(amount)}</strong><span class="category-item-percent">${Math.round(share)}%</span></div>
      <div class="category-track"><span></span></div>
    </div>`;
  }).join("");
}

function renderBudgetView() {
  const expenses = currentMonthTransactions().filter((transaction) => transaction.type === "expense");
  const spent = sumType(expenses, "expense");
  const remaining = state.monthlyBudget - spent;
  const utilization = state.monthlyBudget > 0 ? (spent / state.monthlyBudget) * 100 : 0;
  const overviewProgress = document.querySelector(".overview-progress");
  const utilizationStatus = document.querySelector("#overview-budget-status");
  const categoryGrid = document.querySelector("#category-budget-grid");

  document.querySelector("#overview-budget-total").textContent = currency(state.monthlyBudget);
  document.querySelector("#overview-budget-spent").textContent = currency(spent);
  document.querySelector("#overview-budget-remaining").textContent = currency(remaining);
  document.querySelector("#overview-budget-remaining").classList.toggle("is-negative", remaining < 0);
  document.querySelector("#overview-budget-remaining-note").textContent = remaining < 0
    ? `${currency(Math.abs(remaining))} over budget`
    : "Available to spend";
  document.querySelector("#overview-budget-utilization").textContent = `${utilization.toFixed(1)}%`;
  document.querySelector("#overview-budget-progress").style.width = `${Math.min(100, Math.max(0, utilization))}%`;
  overviewProgress.classList.toggle("is-warning", utilization >= 80 && utilization <= 100);
  overviewProgress.classList.toggle("is-exceeded", utilization > 100);
  utilizationStatus.classList.toggle("is-warning", utilization >= 80 && utilization <= 100);
  utilizationStatus.classList.toggle("is-exceeded", utilization > 100);
  utilizationStatus.textContent = utilization > 100
    ? `Overspent by ${currency(Math.max(0, spent - state.monthlyBudget))}`
    : utilization === 100 ? "At monthly limit"
    : utilization >= 80 ? "Approaching monthly limit" : "of monthly limit used";

  document.querySelector("#category-budget-count").textContent = `${state.categoryBudgets.length} active ${state.categoryBudgets.length === 1 ? "budget" : "budgets"}`;
  document.querySelector("#budget-empty-state").hidden = state.categoryBudgets.length > 0;
  const availableCategories = TRANSACTION_CATEGORIES.expense.filter((category) => !state.categoryBudgets.some((budget) => budget.category === category));
  document.querySelectorAll('[data-action="add-category-budget"]').forEach((button) => { button.hidden = availableCategories.length === 0; });

  categoryGrid.innerHTML = state.categoryBudgets.map((budget) => {
    const categorySpent = expenses.reduce((total, transaction) => total + (transaction.category === budget.category ? Number(transaction.amount) : 0), 0);
    const categoryRemaining = budget.amount - categorySpent;
    const percentage = (categorySpent / budget.amount) * 100;
    const statusClass = percentage > 100 ? "budget-card-exceeded" : percentage >= 80 ? "budget-card-warning" : "budget-card-healthy";
    const statusText = percentage > 100
      ? `Over budget by ${currency(categorySpent - budget.amount)}`
      : percentage === 100 ? "At budget limit"
      : percentage >= 80 ? `${percentage.toFixed(1)}% used · nearing limit` : "On track";
    const [accent, tint] = BUDGET_CATEGORY_COLORS[budget.category] || ["#5b83d4", "#eef3ff"];
    const icon = BUDGET_CATEGORY_ICONS[budget.category] || "icon-grid";
    const category = escapeHtml(budget.category);
    const encodedCategory = escapeHtml(budget.category);
    return `<article class="category-budget-card ${statusClass}" style="--category-accent:${accent};--category-tint:${tint}">
      <div class="category-budget-top"><span class="category-budget-icon"><svg class="icon" aria-hidden="true"><use href="#${icon}"/></svg></span><div class="category-budget-name"><h3>${category}</h3><span class="category-budget-status">${statusText}</span></div><div class="category-budget-actions"><button class="category-budget-action" type="button" aria-label="Edit ${category} budget" data-edit-category-budget="${encodedCategory}">Edit</button><button class="category-budget-action delete" type="button" aria-label="Delete ${category} budget" data-delete-category-budget="${encodedCategory}">Delete</button></div></div>
      <div class="category-budget-progress-row"><span>${currency(categorySpent)} spent</span><strong>${percentage.toFixed(1)}%</strong></div>
      <div class="category-budget-track"><span style="--spent-percent:${Math.min(100, Math.max(0, percentage))}%"></span></div>
      <div class="category-budget-figures"><div><span>Allocated</span><strong>${currency(budget.amount)}</strong></div><div><span>Spent</span><strong>${currency(categorySpent)}</strong></div><div><span>Remaining</span><strong>${currency(categoryRemaining)}</strong></div></div>
    </article>`;
  }).join("");
}

function renderSavingsGoals() {
  const totalSaved = state.savingsGoals.reduce((total, goal) => total + Number(goal.savedAmount), 0);
  const completedCount = state.savingsGoals.filter((goal) => Number(goal.savedAmount) >= Number(goal.targetAmount)).length;
  const inProgressCount = state.savingsGoals.length - completedCount;
  document.querySelector("#goals-total-saved").textContent = currency(totalSaved);
  document.querySelector("#goals-in-progress").textContent = String(inProgressCount);
  document.querySelector("#goals-completed").textContent = String(completedCount);
  document.querySelector("#goals-empty-state").hidden = state.savingsGoals.length > 0;

  document.querySelector("#savings-goals-grid").innerHTML = state.savingsGoals.map((goal, index) => {
    const target = Number(goal.targetAmount);
    const saved = Number(goal.savedAmount);
    const remaining = Math.max(0, target - saved);
    const percentage = target > 0 ? (saved / target) * 100 : 0;
    const complete = saved >= target;
    const overdue = !complete && goal.targetDate < localDateKey(new Date());
    const [accent, tint] = SAVINGS_GOAL_COLORS[goal.category] || ["#5b83d4", "#eef3ff"];
    const icon = SAVINGS_GOAL_ICONS[goal.category] || "icon-target";
    const id = escapeHtml(goal.id);
    const name = escapeHtml(goal.name);
    const category = escapeHtml(goal.category);
    const description = escapeHtml(goal.description || "");
    const targetDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parseLocalDate(goal.targetDate));
    const cardClass = ["savings-goal-card", complete ? "goal-complete" : "", overdue ? "goal-overdue" : ""].filter(Boolean).join(" ");
    return `<article class="${cardClass}" style="--goal-accent:${accent};--goal-tint:${tint};--goal-progress:${Math.min(100, Math.max(0, percentage))}%;--goal-delay:${index * 35}ms">
      <div class="savings-goal-top"><span class="savings-goal-icon"><svg class="icon" aria-hidden="true"><use href="#${icon}"/></svg></span><div class="savings-goal-heading"><h2>${name}</h2><span class="savings-goal-category">${category}</span><span class="goal-status">${complete ? "Goal complete" : overdue ? "Past target date" : "Saving in progress"}</span></div><div class="goal-actions"><button class="goal-action" type="button" aria-label="Edit savings goal: ${name}" data-edit-savings-goal="${id}">Edit</button><button class="goal-action delete" type="button" aria-label="Delete savings goal: ${name}" data-delete-savings-goal="${id}">Delete</button></div></div>
      ${description ? `<p class="savings-goal-description">${description}</p>` : ""}
      <div class="goal-progress-heading"><strong>${currency(saved)} <span>of ${currency(target)}</span></strong><span>${percentage.toFixed(1)}%</span></div>
      <div class="goal-progress-track"><span></span></div>
      <div class="goal-footer"><div><span>Saved</span><strong>${currency(saved)}</strong></div><div><span>Target</span><strong>${currency(target)}</strong></div><div class="goal-remaining"><span>Remaining</span><strong>${currency(remaining)}</strong></div><div><span>Target date</span><strong class="goal-target-date">${targetDate}</strong></div></div>
    </article>`;
  }).join("");
}

function parseLocalDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function reportDateLabel(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function getAnalyticsRange(period) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  let start;
  let end = new Date(today);

  if (period === "week") {
    start = new Date(today);
    start.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  } else if (period === "last-month") {
    start = new Date(today.getFullYear(), today.getMonth() - 1, 1, 12);
    end = new Date(today.getFullYear(), today.getMonth(), 0, 12);
  } else if (period === "last-3-months") {
    start = new Date(today.getFullYear(), today.getMonth() - 2, 1, 12);
  } else if (period === "year") {
    start = new Date(today.getFullYear(), 0, 1, 12);
  } else {
    start = new Date(today.getFullYear(), today.getMonth(), 1, 12);
  }

  const periodName = document.querySelector("#reports-period").selectedOptions[0].textContent;
  return {
    start,
    end,
    startKey: localDateKey(start),
    endKey: localDateKey(end),
    label: `${periodName} · ${reportDateLabel(start)} – ${reportDateLabel(end)}`,
  };
}

function transactionsInRange(range) {
  return state.transactions.filter((transaction) => transaction.date >= range.startKey && transaction.date <= range.endKey);
}

function formatCompactCurrency(value) {
  const amount = Number(value) || 0;
  const absolute = Math.abs(amount);
  const symbol = currencySymbol();
  if (absolute >= 10000000) return `${symbol}${(amount / 10000000).toFixed(1)}Cr`;
  if (absolute >= 100000) return `${symbol}${(amount / 100000).toFixed(1)}L`;
  if (absolute >= 1000) return `${symbol}${(amount / 1000).toFixed(1)}k`;
  return `${symbol}${Math.round(amount)}`;
}

function lastSixMonths() {
  const today = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - 5 + index, 1, 12);
    return {
      key: localDateKey(date).slice(0, 7),
      label: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
      income: 0,
      expense: 0,
    };
  });
}

function monthlyTotals() {
  const months = lastSixMonths();
  const monthMap = new Map(months.map((month) => [month.key, month]));
  state.transactions.forEach((transaction) => {
    const bucket = monthMap.get(monthKey(transaction.date));
    if (bucket && (transaction.type === "income" || transaction.type === "expense")) {
      bucket[transaction.type] += Number(transaction.amount);
    }
  });
  return months;
}

function renderAxis(width, top, bottom, axisMax) {
  const plotHeight = bottom - top;
  return [0, 1, 2, 3].map((step) => {
    const ratio = step / 3;
    const y = bottom - ratio * plotHeight;
    const value = axisMax * ratio;
    return `<line class="svg-gridline" x1="54" y1="${y}" x2="${width - 12}" y2="${y}"/><text class="svg-axis-label" x="2" y="${y + 3}">${formatCompactCurrency(value)}</text>`;
  }).join("");
}

function renderMonthlyExpenseChart(months) {
  const width = 720;
  const height = 250;
  const top = 18;
  const bottom = 205;
  const left = 60;
  const right = 12;
  const plotWidth = width - left - right;
  const maximum = Math.max(1, ...months.map((month) => month.expense));
  const axisMax = Math.max(100, Math.ceil(maximum / 4 / 100) * 100 * 4);
  const points = months.map((month, index) => {
    const x = left + index * (plotWidth / Math.max(1, months.length - 1));
    const y = bottom - (month.expense / axisMax) * (bottom - top);
    return { ...month, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  const axes = renderAxis(width, top, bottom, axisMax);
  const marks = points.map((point) => `<circle class="svg-expense-point" cx="${point.x}" cy="${point.y}" r="4"><title>${point.label}: ${currency(point.expense)}</title></circle><text class="svg-month-label" x="${point.x}" y="232" text-anchor="middle">${point.label}</text>`).join("");
  document.querySelector("#monthly-expense-chart").innerHTML = `${axes}<path class="svg-expense-line" d="${path}"/>${marks}`;
}

function renderCashFlowChart(months) {
  const width = 720;
  const height = 250;
  const top = 18;
  const bottom = 205;
  const left = 60;
  const right = 12;
  const plotWidth = width - left - right;
  const maxAmount = Math.max(1, ...months.flatMap((month) => [month.income, month.expense]));
  const axisMax = Math.max(100, Math.ceil(maxAmount / 4 / 100) * 100 * 4);
  const slot = plotWidth / months.length;
  const barWidth = Math.min(25, slot * .24);
  const axes = renderAxis(width, top, bottom, axisMax);
  const bars = months.map((month, index) => {
    const center = left + slot * (index + .5);
    const incomeHeight = (month.income / axisMax) * (bottom - top);
    const expenseHeight = (month.expense / axisMax) * (bottom - top);
    return `<rect class="svg-income-bar" x="${center - barWidth - 2}" y="${bottom - incomeHeight}" width="${barWidth}" height="${incomeHeight}" rx="4"><title>${month.label} income: ${currency(month.income)}</title></rect><rect class="svg-expense-bar" x="${center + 2}" y="${bottom - expenseHeight}" width="${barWidth}" height="${expenseHeight}" rx="4"><title>${month.label} expenses: ${currency(month.expense)}</title></rect><text class="svg-month-label" x="${center}" y="232" text-anchor="middle">${month.label}</text>`;
  }).join("");
  document.querySelector("#cash-flow-chart").innerHTML = `${axes}${bars}`;
}

function renderCategoryDonut(expenses) {
  const totals = new Map();
  expenses.forEach((transaction) => {
    if (transaction.type !== "expense") return;
    totals.set(transaction.category, (totals.get(transaction.category) || 0) + Number(transaction.amount));
  });
  const categories = [...totals.entries()].sort((first, second) => second[1] - first[1]);
  const total = categories.reduce((sum, [, amount]) => sum + amount, 0);
  const layout = document.querySelector("#category-donut-layout");
  const empty = document.querySelector("#category-donut-empty");
  layout.hidden = categories.length === 0;
  empty.hidden = categories.length > 0;
  if (!categories.length) return;

  let offset = 0;
  const palette = ["#4776e6", "#42b991", "#e7a64b", "#8d78e6", "#e56e77", "#3b9ab2", "#78869a"];
  const segments = categories.map(([category, amount], index) => {
    const share = (amount / total) * 100;
    const color = BUDGET_CATEGORY_COLORS[category]?.[0] || palette[index % palette.length];
    const segment = `<circle class="donut-segment" cx="90" cy="90" r="58" pathLength="100" stroke="${color}" stroke-dasharray="${share} ${100 - share}" stroke-dashoffset="${-offset}"><title>${escapeHtml(category)}: ${currency(amount)} (${share.toFixed(1)}%)</title></circle>`;
    offset += share;
    return segment;
  }).join("");
  document.querySelector("#category-donut-chart").innerHTML = `<circle class="donut-track" cx="90" cy="90" r="58"/>${segments}<text class="donut-center-total" x="90" y="87">${formatCompactCurrency(total)}</text><text class="donut-center-label" x="90" y="104">TOTAL SPENT</text>`;
  document.querySelector("#category-donut-legend").innerHTML = categories.map(([category, amount], index) => {
    const color = BUDGET_CATEGORY_COLORS[category]?.[0] || palette[index % palette.length];
    const share = (amount / total) * 100;
    return `<div class="donut-legend-item" title="${escapeHtml(category)}: ${currency(amount)}"><i style="--slice-color:${color}"></i><span>${escapeHtml(category)}</span><strong>${share.toFixed(0)}%</strong></div>`;
  }).join("");
}

function renderWeeklySpendingChart(range, transactions) {
  const weekStart = new Date(range.end);
  weekStart.setDate(range.end.getDate() - ((range.end.getDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return { key: localDateKey(date), label: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date), amount: 0 };
  });
  const byDay = new Map(days.map((day) => [day.key, day]));
  transactions.forEach((transaction) => {
    if (transaction.type !== "expense") return;
    const day = byDay.get(transaction.date);
    if (day) day.amount += Number(transaction.amount);
  });

  const width = 720;
  const height = 250;
  const top = 18;
  const bottom = 205;
  const left = 60;
  const right = 12;
  const plotWidth = width - left - right;
  const maxAmount = Math.max(1, ...days.map((day) => day.amount));
  const axisMax = Math.max(100, Math.ceil(maxAmount / 4 / 100) * 100 * 4);
  const slot = plotWidth / days.length;
  const barWidth = Math.min(48, slot * .48);
  const axes = renderAxis(width, top, bottom, axisMax);
  const bars = days.map((day, index) => {
    const x = left + slot * (index + .5) - barWidth / 2;
    const barHeight = (day.amount / axisMax) * (bottom - top);
    return `<rect class="svg-expense-bar" x="${x}" y="${bottom - barHeight}" width="${barWidth}" height="${barHeight}" rx="5"><title>${day.key}: ${currency(day.amount)}</title></rect><text class="svg-month-label" x="${x + barWidth / 2}" y="232" text-anchor="middle">${day.label}</text>`;
  }).join("");
  document.querySelector("#weekly-spending-chart").innerHTML = `${axes}${bars}`;
  document.querySelector("#weekly-spending-range").textContent = `Week ending ${reportDateLabel(range.end)}`;
}

function renderAnalytics() {
  const range = getAnalyticsRange(document.querySelector("#reports-period").value);
  const transactions = transactionsInRange(range);
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  const income = sumType(transactions, "income");
  const spent = sumType(expenses, "expense");
  const netSavings = income - spent;
  const dayCount = Math.max(1, Math.round((range.end - range.start) / 86400000) + 1);
  const categoryTotals = new Map();
  expenses.forEach((transaction) => categoryTotals.set(transaction.category, (categoryTotals.get(transaction.category) || 0) + Number(transaction.amount)));
  const categories = [...categoryTotals.entries()].sort((first, second) => second[1] - first[1]);
  const highest = categories[0];
  const lowest = categories[categories.length - 1];

  document.querySelector("#analytics-total-income").textContent = currency(income);
  document.querySelector("#analytics-total-expenses").textContent = currency(spent);
  document.querySelector("#analytics-net-savings").textContent = currency(netSavings);
  document.querySelector("#analytics-net-savings").classList.toggle("is-negative", netSavings < 0);
  document.querySelector("#analytics-average-daily").textContent = currency(spent / dayCount);
  document.querySelector("#analytics-period-label").textContent = range.label;
  document.querySelector("#analytics-period-label-expenses").textContent = range.label;
  document.querySelector("#analytics-highest-category").textContent = highest?.[0] || "—";
  document.querySelector("#analytics-highest-amount").textContent = highest ? currency(highest[1]) : "No expense data";
  document.querySelector("#report-summary-period").textContent = range.label;
  document.querySelector("#report-total-received").textContent = currency(income);
  document.querySelector("#report-total-spent").textContent = currency(spent);
  document.querySelector("#report-remaining-amount").textContent = currency(netSavings);
  document.querySelector("#report-highest-category").textContent = highest ? `${highest[0]} · ${currency(highest[1])}` : "—";
  document.querySelector("#report-lowest-category").textContent = lowest ? `${lowest[0]} · ${currency(lowest[1])}` : "—";

  const months = monthlyTotals();
  renderMonthlyExpenseChart(months);
  renderCashFlowChart(months);
  renderCategoryDonut(expenses);
  renderWeeklySpendingChart(range, transactions);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadAnalyticsReport() {
  const range = getAnalyticsRange(document.querySelector("#reports-period").value);
  const transactions = transactionsInRange(range).sort((first, second) => first.date.localeCompare(second.date));
  const income = sumType(transactions, "income");
  const expenses = sumType(transactions, "expense");
  const expensesByCategory = new Map();
  transactions.filter((transaction) => transaction.type === "expense").forEach((transaction) => {
    expensesByCategory.set(transaction.category, (expensesByCategory.get(transaction.category) || 0) + Number(transaction.amount));
  });
  const sortedCategories = [...expensesByCategory.entries()].sort((first, second) => second[1] - first[1]);
  const rows = [
    ["CampusSpend Analytics Report"],
    ["Period", range.label],
    [`Total money received (${state.settings.currency})`, income.toFixed(2)],
    [`Total money spent (${state.settings.currency})`, expenses.toFixed(2)],
    [`Remaining amount (${state.settings.currency})`, (income - expenses).toFixed(2)],
    ["Highest spending category", sortedCategories[0]?.[0] || ""],
    ["Lowest spending category", sortedCategories.at(-1)?.[0] || ""],
    [],
    ["Date", "Transaction name", "Type", "Category", "Payment method", "Description", `Amount (${state.settings.currency})`],
    ...transactions.map((transaction) => [transaction.date, transaction.name, transaction.type, transaction.category, transaction.payment, transaction.description || "", Number(transaction.amount).toFixed(2)]),
  ];
  const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
  const blobUrl = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const downloadLink = document.createElement("a");
  downloadLink.href = blobUrl;
  downloadLink.download = `campusspend-${document.querySelector("#reports-period").value}-report-${localDateKey(new Date())}.csv`;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  showToast("Analytics report downloaded.");
}

function startOfWeek(date) {
  const start = new Date(date);
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() - 6);
  return start;
}

function chartGroups(period) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  if (period === "week") {
    const start = startOfWeek(today);
    const groups = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return { key: localDateKey(date), label: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date), date };
    });
    return { groups, range: `${formatShortDate(localDateKey(start))} – ${formatShortDate(localDateKey(today))}` };
  }

  if (period === "year") {
    const groups = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() - 11 + index, 1, 12);
      return { key: localDateKey(date).slice(0, 7), label: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date), date };
    });
    const rangeStart = groups[0].date;
    return { groups, range: `${new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(rangeStart)} – ${new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(today)}` };
  }

  const start = new Date(today.getFullYear(), today.getMonth(), 1, 12);
  const weekCount = Math.ceil((today.getDate() + new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()) / 7);
  const groups = Array.from({ length: weekCount }, (_, index) => ({ key: String(index), label: `W${index + 1}`, date: start }));
  return { groups, range: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(today) };
}

function renderChart() {
  const period = document.querySelector("#analytics-period").value;
  const { groups, range } = chartGroups(period);
  const totals = groups.map((group) => ({ ...group, income: 0, expense: 0 }));
  const lookup = new Map(totals.map((group, index) => [period === "month" ? String(index) : group.key, group]));

  state.transactions.forEach((transaction) => {
    let key;
    if (period === "week") key = transaction.date;
    else if (period === "month") {
      if (monthKey(transaction.date) !== currentMonthKey()) return;
      const day = Number(transaction.date.slice(8, 10));
      key = String(Math.floor((day - 1) / 7));
    } else key = monthKey(transaction.date);
    const group = lookup.get(key);
    if (group) group[transaction.type] += Number(transaction.amount);
  });

  const maxAmount = Math.max(1, ...totals.flatMap((group) => [group.income, group.expense]));
  const axisMax = Math.ceil(maxAmount / 100) * 100 || 100;
  document.querySelector("#chart-range").textContent = range;
  document.querySelector("#chart-y-labels").innerHTML = [3, 2, 1, 0].map((step) => {
    const value = (axisMax / 3) * step;
    return `<span>${value >= 1000 ? `$${(value / 1000).toFixed(value % 1000 ? 1 : 0)}k` : currency(value).replace(".00", "")}</span>`;
  }).join("");
  document.querySelector("#chart-gridlines").innerHTML = "<i></i><i></i><i></i><i></i>";
  document.querySelector("#chart-bars").innerHTML = totals.map((group) => {
    const expenseHeight = Math.min(100, (group.expense / axisMax) * 100);
    const incomeHeight = Math.min(100, (group.income / axisMax) * 100);
    const label = escapeHtml(group.label);
    return `<div class="bar-group" title="${label}: ${currency(group.income)} income, ${currency(group.expense)} expenses"><div class="bar-pair"><i class="bar bar-expense" style="--bar:${expenseHeight}%"></i><i class="bar bar-income" style="--bar:${incomeHeight}%"></i></div><span>${label}</span></div>`;
  }).join("");
}

function renderDashboard() {
  renderSummary();
  renderChart();
  renderCategories();
  renderTransactions();
  renderBudgetView();
  renderSavingsGoals();
  renderAnalytics();
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function profileInitials(name) {
  return String(name).trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("") || "S";
}

function renderProfileDetails() {
  const initials = profileInitials(state.profile.fullName);
  document.querySelectorAll("[data-profile-name]").forEach((element) => { element.textContent = state.profile.fullName; });
  document.querySelectorAll("[data-user-initials]").forEach((element) => { element.textContent = initials; });
  document.querySelectorAll("[data-profile-email]").forEach((element) => { element.textContent = state.profile.email; });
  document.querySelector("#profile-photo-initials").textContent = initials;
}

function renderSettings() {
  profileSettingsForm.elements.fullName.value = state.profile.fullName;
  profileSettingsForm.elements.email.value = state.profile.email;
  profileSettingsForm.elements.collegeName.value = state.profile.collegeName;
  profileSettingsForm.elements.course.value = state.profile.course;
  profileSettingsForm.elements.academicYear.value = state.profile.academicYear;
  preferencesForm.elements.currency.value = state.settings.currency;
  preferencesForm.elements.monthlyBudget.value = Number(state.monthlyBudget).toFixed(2);
  Object.entries(state.settings.notifications).forEach(([name, enabled]) => {
    preferencesForm.elements[name].checked = enabled;
  });
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === state.settings.theme));
  });
  renderProfileDetails();
  const photoImage = document.querySelector("#profile-photo-image");
  const photoInitials = document.querySelector("#profile-photo-initials");
  if (profilePicturePreviewUrl) {
    photoImage.src = profilePicturePreviewUrl;
    photoImage.hidden = false;
    photoInitials.hidden = true;
  } else {
    photoImage.hidden = true;
    photoImage.removeAttribute("src");
    photoInitials.hidden = false;
  }
  syncCurrencyDisplay();
}

function applyNotificationPreferences() {
  const notifications = state.settings.notifications;
  document.querySelectorAll("[data-notification-type]").forEach((item) => {
    item.hidden = !notifications[item.dataset.notificationType];
  });
  const anyEnabled = Object.values(notifications).some(Boolean);
  document.querySelector("#notifications-empty").hidden = anyEnabled;
  document.querySelector(".notification-dot").hidden = !anyEnabled;
}

function applyAppSettings() {
  document.documentElement.dataset.theme = state.settings.theme;
  renderProfileDetails();
  syncCurrencyDisplay();
  applyNotificationPreferences();
}

function requestClearAllData() {
  pendingDelete = { type: "clear-data" };
  document.querySelector("#delete-confirm-eyebrow").textContent = "DATA MANAGEMENT";
  document.querySelector("#delete-confirm-title").textContent = "Clear all application data?";
  document.querySelector("#delete-confirm-copy").textContent = "This removes saved transactions, budgets, goals, and profile settings from this browser. This action cannot be undone.";
  document.querySelector(".delete-confirm-dialog .dialog-actions [data-delete-cancel]").textContent = "Keep my data";
  document.querySelector("[data-delete-confirm]").textContent = "Clear all data";
  deleteDialog.showModal();
}

function normalizeImportedState(payload) {
  if (!payload || payload.app !== "CampusSpend" || !Array.isArray(payload.transactions)
    || !Array.isArray(payload.categoryBudgets) || !Array.isArray(payload.savingsGoals)
    || !Number.isFinite(Number(payload.monthlyBudget)) || Number(payload.monthlyBudget) <= 0) return null;

  const validDate = isValidDateKey;
  const validTransactions = payload.transactions.every((item) => item && typeof item.id === "string"
    && typeof item.name === "string" && item.name.trim() && ["expense", "income"].includes(item.type)
    && Number.isFinite(Number(item.amount)) && Number(item.amount) > 0 && validDate(item.date)
    && typeof item.category === "string" && typeof item.payment === "string");
  const validBudgets = payload.categoryBudgets.every((item) => item && TRANSACTION_CATEGORIES.expense.includes(item.category)
    && Number.isFinite(Number(item.amount)) && Number(item.amount) > 0);
  const validGoals = payload.savingsGoals.every((item) => item && typeof item.id === "string" && typeof item.name === "string"
    && item.name.trim() && Number.isFinite(Number(item.targetAmount)) && Number(item.targetAmount) > 0
    && Number.isFinite(Number(item.savedAmount)) && Number(item.savedAmount) >= 0 && validDate(item.targetDate)
    && SAVINGS_GOAL_CATEGORIES.includes(item.category));
  const profileFields = ["fullName", "email", "collegeName", "course", "academicYear"];
  const validProfile = payload.profile && profileFields.every((field) => typeof payload.profile[field] === "string");
  const validSettings = payload.settings && Object.hasOwn(CURRENCY_LOCALES, payload.settings.currency)
    && ["light", "dark"].includes(payload.settings.theme)
    && payload.settings.notifications
    && Object.keys(DEFAULT_SETTINGS.notifications).every((key) => typeof payload.settings.notifications[key] === "boolean");
  if (!validTransactions || !validBudgets || !validGoals || !validProfile || !validSettings) return null;

  return {
    version: STORAGE_VERSION,
    transactions: payload.transactions.map((item) => ({ ...item, amount: Number(item.amount), description: String(item.description || "") })),
    monthlyBudget: Number(payload.monthlyBudget),
    categoryBudgets: payload.categoryBudgets.map((item) => ({ category: item.category, amount: Number(item.amount) })),
    savingsGoals: payload.savingsGoals.map((item) => ({ ...item, targetAmount: Number(item.targetAmount), savedAmount: Number(item.savedAmount), description: String(item.description || "") })),
    profile: Object.fromEntries(profileFields.map((field) => [field, payload.profile[field].trim()])),
    settings: {
      currency: payload.settings.currency,
      theme: payload.settings.theme,
      notifications: { ...payload.settings.notifications },
    },
  };
}

function refreshAllViews() {
  applyAppSettings();
  renderDashboard();
  renderTransactionFilters();
  renderManagementTransactions();
  renderSettings();
}

function exportAllData() {
  const payload = { app: "CampusSpend", exportedAt: new Date().toISOString(), ...state, version: STORAGE_VERSION };
  const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" }));
  const downloadLink = document.createElement("a");
  downloadLink.href = blobUrl;
  downloadLink.download = `campusspend-backup-${localDateKey(new Date())}.json`;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  showToast("CampusSpend data exported.");
}

async function importAllData(file) {
  try {
    if (file.size > 10 * 1024 * 1024) throw new Error("This JSON file is larger than 10 MB.");
    const imported = normalizeImportedState(JSON.parse(await file.text()));
    if (!imported) throw new Error("The file is not a valid CampusSpend backup.");
    if (profilePicturePreviewUrl) URL.revokeObjectURL(profilePicturePreviewUrl);
    profilePicturePreviewUrl = null;
    state = imported;
    saveState();
    refreshAllViews();
    showToast("CampusSpend backup imported.");
  } catch (error) {
    showToast(error.message || "Could not import this JSON file.");
  } finally {
    importDataFile.value = "";
  }
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebarScrim.classList.remove("is-visible");
  sidebarToggle.setAttribute("aria-expanded", "false");
  sidebarToggle.setAttribute("aria-label", "Open navigation");
}

function closePopovers() {
  notificationMenu.hidden = true;
  notificationToggle.setAttribute("aria-expanded", "false");
  profileMenus.forEach((menu) => { menu.hidden = true; });
  profileToggles.forEach((toggle) => { toggle.setAttribute("aria-expanded", "false"); });
}

function showView(view) {
  if (view === "add-expense") {
    openTransactionDialog("expense");
    closeSidebar();
    closePopovers();
    return;
  }
  const title = viewNames[view];
  if (!title) return;

  pageTitle.textContent = title;
  const isDashboard = view === "dashboard";
  const isTransactions = view === "transactions";
  const isBudgets = view === "budgets";
  const isAnalytics = view === "analytics";
  const isSavingsGoals = view === "savings-goals";
  const isSettings = view === "settings";
  dashboardView.hidden = !isDashboard;
  transactionsView.hidden = !isTransactions;
  budgetsView.hidden = !isBudgets;
  analyticsView.hidden = !isAnalytics;
  savingsGoalsView.hidden = !isSavingsGoals;
  settingsView.hidden = !isSettings;
  placeholderView.hidden = isDashboard || isTransactions || isBudgets || isAnalytics || isSavingsGoals || isSettings;
  placeholderTitle.textContent = title;
  document.querySelectorAll(".nav-link[data-view]").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (isTransactions) {
    managementSearch.value = searchInput.value;
    renderTransactionFilters();
    renderManagementTransactions();
  }
  if (isBudgets) renderBudgetView();
  if (isAnalytics) renderAnalytics();
  if (isSavingsGoals) renderSavingsGoals();
  if (isSettings) renderSettings();
  closeSidebar();
  closePopovers();
}

function renderCategoryOptions(type, selected = "") {
  const categories = [...(TRANSACTION_CATEGORIES[type] || TRANSACTION_CATEGORIES.expense)];
  if (selected && !categories.includes(selected)) categories.push(selected);
  const categorySelect = transactionForm.elements.category;
  categorySelect.innerHTML = `<option value="">Choose a category</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
  categorySelect.value = categories.includes(selected) ? selected : "";
}

function clearFormErrors() {
  document.querySelectorAll("[data-error-for]").forEach((message) => {
    message.textContent = "";
    message.hidden = true;
    transactionForm.elements[message.dataset.errorFor]?.removeAttribute("aria-invalid");
  });
}

function openTransactionDialog(type, transaction = null) {
  editingTransactionId = transaction?.id || null;
  transactionSubmitConsumed = false;
  transactionForm.reset();
  clearFormErrors();
  budgetForm.hidden = true;
  categoryBudgetForm.hidden = true;
  savingsGoalForm.hidden = true;
  transactionForm.hidden = false;
  const transactionType = transaction?.type || type;
  transactionForm.elements.type.value = transactionType;
  renderCategoryOptions(transactionType, transaction?.category || "");
  transactionForm.elements.name.value = transaction?.name || "";
  transactionForm.elements.amount.value = transaction ? Number(transaction.amount).toFixed(2) : "";
  transactionForm.elements.date.value = transaction?.date || localDateKey(new Date());
  transactionForm.elements.payment.value = transaction?.payment || "";
  transactionForm.elements.description.value = transaction?.description || "";
  document.querySelector("#dialog-title").textContent = transaction
    ? `Edit ${transactionType}`
    : (transactionType === "income" ? "Add income" : "Add expense");
  transactionForm.querySelector("button[type=submit]").textContent = transaction ? "Save changes" : "Save transaction";
  actionDialog.showModal();
  transactionForm.elements.name.focus();
}

function openBudgetDialog() {
  transactionForm.hidden = true;
  categoryBudgetForm.hidden = true;
  savingsGoalForm.hidden = true;
  budgetForm.hidden = false;
  budgetForm.elements.budget.value = state.monthlyBudget.toFixed(2);
  document.querySelector("#dialog-title").textContent = "Set monthly budget";
  actionDialog.showModal();
  budgetForm.elements.budget.focus();
}

function openCategoryBudgetDialog(category = null) {
  const existing = category ? state.categoryBudgets.find((budget) => budget.category === category) : null;
  if (category && !existing) return;
  const select = categoryBudgetForm.elements.category;
  const available = TRANSACTION_CATEGORIES.expense.filter((item) => !state.categoryBudgets.some((budget) => budget.category === item));
  const options = existing ? [existing.category] : available;
  if (!options.length) {
    showToast("Every category already has a budget.");
    return;
  }

  transactionForm.hidden = true;
  budgetForm.hidden = true;
  savingsGoalForm.hidden = true;
  categoryBudgetForm.hidden = false;
  categoryBudgetForm.reset();
  select.innerHTML = options.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
  select.disabled = Boolean(existing);
  if (existing) {
    select.value = existing.category;
    categoryBudgetForm.elements.amount.value = Number(existing.amount).toFixed(2);
  }
  editingBudgetCategory = existing?.category || null;
  document.querySelector("#dialog-title").textContent = existing ? `Edit ${existing.category} budget` : "Add category budget";
  categoryBudgetForm.querySelector("button[type=submit]").textContent = existing ? "Save changes" : "Save category budget";
  actionDialog.showModal();
  if (!existing) select.focus();
  else categoryBudgetForm.elements.amount.focus();
}

function openSavingsGoalDialog(goalId = null) {
  const existing = goalId ? state.savingsGoals.find((goal) => goal.id === goalId) : null;
  if (goalId && !existing) return;

  transactionForm.hidden = true;
  budgetForm.hidden = true;
  categoryBudgetForm.hidden = true;
  savingsGoalForm.hidden = false;
  savingsGoalForm.reset();
  editingSavingsGoalId = existing?.id || null;
  savingsGoalForm.elements.name.value = existing?.name || "";
  savingsGoalForm.elements.target.value = existing ? Number(existing.targetAmount).toFixed(2) : "";
  savingsGoalForm.elements.saved.value = existing ? Number(existing.savedAmount).toFixed(2) : "0";
  savingsGoalForm.elements.targetDate.value = existing?.targetDate || (() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setMonth(date.getMonth() + 6);
    return localDateKey(date);
  })();
  savingsGoalForm.elements.category.value = existing?.category || "Electronics";
  savingsGoalForm.elements.description.value = existing?.description || "";
  document.querySelector("#dialog-title").textContent = existing ? "Edit savings goal" : "Create savings goal";
  savingsGoalForm.querySelector("button[type=submit]").textContent = existing ? "Save changes" : "Save goal";
  actionDialog.showModal();
  savingsGoalForm.elements.name.focus();
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "add-expense") openTransactionDialog("expense");
    if (action === "add-income") openTransactionDialog("income");
    if (action === "set-budget") openBudgetDialog();
    if (action === "add-category-budget") openCategoryBudgetDialog();
    if (action === "add-savings-goal") openSavingsGoalDialog();
    if (action === "view-transactions") showView("transactions");
    if (action === "choose-profile-picture") profilePictureFile.click();
    if (action === "choose-import-file") importDataFile.click();
    if (action === "clear-all-data") requestClearAllData();
  });
});

profileSettingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!profileSettingsForm.reportValidity()) return;
  const formData = new FormData(profileSettingsForm);
  state.profile = {
    fullName: String(formData.get("fullName")).trim(),
    email: String(formData.get("email")).trim(),
    collegeName: String(formData.get("collegeName")).trim(),
    course: String(formData.get("course")).trim(),
    academicYear: String(formData.get("academicYear")),
  };
  saveState();
  renderProfileDetails();
  renderSettings();
  showToast("Student profile saved.");
});

preferencesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!preferencesForm.reportValidity()) return;
  const monthlyBudget = Number(preferencesForm.elements.monthlyBudget.value);
  if (!Number.isFinite(monthlyBudget) || monthlyBudget <= 0) {
    preferencesForm.elements.monthlyBudget.focus();
    showToast("Enter a valid monthly budget greater than zero.");
    return;
  }
  state.settings.currency = preferencesForm.elements.currency.value;
  state.monthlyBudget = monthlyBudget;
  Object.keys(state.settings.notifications).forEach((key) => {
    state.settings.notifications[key] = preferencesForm.elements[key].checked;
  });
  saveState();
  refreshAllViews();
  showToast("Application preferences saved.");
});

preferencesForm.elements.currency.addEventListener("change", () => {
  const selectedCurrency = preferencesForm.elements.currency.value;
  if (!Object.hasOwn(CURRENCY_LOCALES, selectedCurrency)) return;
  state.settings.currency = selectedCurrency;
  saveState();
  applyAppSettings();
  renderDashboard();
  renderBudgetView();
  renderSettings();
  showToast(`Currency changed to ${selectedCurrency}.`);
});

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.theme = button.dataset.themeChoice;
    saveState();
    applyAppSettings();
    document.querySelectorAll("[data-theme-choice]").forEach((choice) => {
      choice.setAttribute("aria-pressed", String(choice.dataset.themeChoice === state.settings.theme));
    });
    showToast(`${state.settings.theme === "dark" ? "Dark" : "Light"} mode enabled.`);
  });
});

preferencesForm.querySelectorAll('input[type="checkbox"]').forEach((input) => {
  input.addEventListener("change", () => {
    state.settings.notifications[input.name] = input.checked;
    saveState();
    applyNotificationPreferences();
  });
});

profilePictureFile.addEventListener("change", () => {
  const file = profilePictureFile.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
    profilePictureFile.value = "";
    showToast("Choose an image smaller than 5 MB.");
    return;
  }
  if (profilePicturePreviewUrl) URL.revokeObjectURL(profilePicturePreviewUrl);
  profilePicturePreviewUrl = URL.createObjectURL(file);
  const image = document.querySelector("#profile-photo-image");
  image.src = profilePicturePreviewUrl;
  image.hidden = false;
  document.querySelector("#profile-photo-initials").hidden = true;
});

document.querySelector("#export-all-data").addEventListener("click", exportAllData);
importDataFile.addEventListener("change", async () => {
  const file = importDataFile.files?.[0];
  if (!file) return;
  await importAllData(file);
});

sidebarToggle.addEventListener("click", () => {
  const open = !sidebar.classList.contains("is-open");
  sidebar.classList.toggle("is-open", open);
  sidebarScrim.classList.toggle("is-visible", open);
  sidebarToggle.setAttribute("aria-expanded", String(open));
  sidebarToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
sidebarScrim.addEventListener("click", closeSidebar);

notificationToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const open = notificationMenu.hidden;
  closePopovers();
  notificationMenu.hidden = !open;
  notificationToggle.setAttribute("aria-expanded", String(open));
});

profileToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = document.querySelector("[data-profile-menu]");
    const open = menu.hidden;
    closePopovers();
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  });
});

document.querySelectorAll("[data-profile-close]").forEach((button) => button.addEventListener("click", closePopovers));
document.querySelectorAll("[data-dialog-close]").forEach((button) => button.addEventListener("click", () => actionDialog.close()));
document.querySelector("#analytics-period").addEventListener("change", renderChart);
document.querySelector("#reports-period").addEventListener("change", renderAnalytics);
document.querySelector("#download-analytics-report").addEventListener("click", downloadAnalyticsReport);
searchInput.addEventListener("input", () => {
  renderTransactions();
  if (!transactionsView.hidden) {
    managementSearch.value = searchInput.value;
    renderManagementTransactions();
  }
});
managementSearch.addEventListener("input", renderManagementTransactions);
["#filter-type", "#filter-category", "#filter-payment", "#sort-transactions", "#filter-date-from", "#filter-date-to"]
  .forEach((selector) => document.querySelector(selector).addEventListener("change", renderManagementTransactions));

function clearTransactionFilters() {
  managementSearch.value = "";
  searchInput.value = "";
  document.querySelector("#filter-type").value = "all";
  document.querySelector("#filter-category").value = "all";
  document.querySelector("#filter-payment").value = "all";
  document.querySelector("#sort-transactions").value = "newest";
  document.querySelector("#filter-date-from").value = "";
  document.querySelector("#filter-date-to").value = "";
  renderTransactions();
  renderManagementTransactions();
}

document.querySelector("#clear-transaction-filters").addEventListener("click", clearTransactionFilters);
document.querySelector("[data-clear-filters]").addEventListener("click", clearTransactionFilters);

function requestDeleteTransaction(id) {
  const transaction = state.transactions.find((item) => item.id === id);
  if (!transaction) return;
  pendingDelete = { type: "transaction", id: transaction.id };
  document.querySelector("#delete-confirm-eyebrow").textContent = "TRANSACTION";
  document.querySelector("#delete-confirm-title").textContent = "Delete transaction?";
  document.querySelector("#delete-confirm-copy").textContent = `“${transaction.name}” will be permanently removed from your records.`;
  document.querySelector(".delete-confirm-dialog .dialog-actions [data-delete-cancel]").textContent = "Keep transaction";
  document.querySelector("[data-delete-confirm]").textContent = "Delete transaction";
  deleteDialog.showModal();
}

function requestDeleteCategoryBudget(category) {
  const budget = state.categoryBudgets.find((item) => item.category === category);
  if (!budget) return;
  pendingDelete = { type: "category-budget", category };
  document.querySelector("#delete-confirm-eyebrow").textContent = "CATEGORY BUDGET";
  document.querySelector("#delete-confirm-title").textContent = "Delete category budget?";
  document.querySelector("#delete-confirm-copy").textContent = `The ${category} monthly allocation will be removed. Your transactions will remain unchanged.`;
  document.querySelector(".delete-confirm-dialog .dialog-actions [data-delete-cancel]").textContent = "Keep budget";
  document.querySelector("[data-delete-confirm]").textContent = "Delete budget";
  deleteDialog.showModal();
}

function requestDeleteSavingsGoal(id) {
  const goal = state.savingsGoals.find((item) => item.id === id);
  if (!goal) return;
  pendingDelete = { type: "savings-goal", id: goal.id };
  document.querySelector("#delete-confirm-eyebrow").textContent = "SAVINGS GOAL";
  document.querySelector("#delete-confirm-title").textContent = "Delete savings goal?";
  document.querySelector("#delete-confirm-copy").textContent = `“${goal.name}” and its saved progress will be removed.`;
  document.querySelector(".delete-confirm-dialog .dialog-actions [data-delete-cancel]").textContent = "Keep goal";
  document.querySelector("[data-delete-confirm]").textContent = "Delete goal";
  deleteDialog.showModal();
}

function handleTransactionActions(event) {
  const editButton = event.target.closest("[data-edit-transaction]");
  if (editButton) {
    const transaction = state.transactions.find((item) => item.id === editButton.dataset.editTransaction);
    if (transaction) openTransactionDialog(transaction.type, transaction);
    return;
  }
  const deleteButton = event.target.closest("[data-delete-transaction]");
  if (deleteButton) requestDeleteTransaction(deleteButton.dataset.deleteTransaction);
}

transactionList.addEventListener("click", handleTransactionActions);
managementList.addEventListener("click", handleTransactionActions);
document.querySelector("#category-budget-grid").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-category-budget]");
  if (editButton) {
    openCategoryBudgetDialog(editButton.dataset.editCategoryBudget);
    return;
  }
  const deleteButton = event.target.closest("[data-delete-category-budget]");
  if (deleteButton) requestDeleteCategoryBudget(deleteButton.dataset.deleteCategoryBudget);
});
document.querySelector("#savings-goals-grid").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-savings-goal]");
  if (editButton) {
    openSavingsGoalDialog(editButton.dataset.editSavingsGoal);
    return;
  }
  const deleteButton = event.target.closest("[data-delete-savings-goal]");
  if (deleteButton) requestDeleteSavingsGoal(deleteButton.dataset.deleteSavingsGoal);
});
document.querySelectorAll("[data-delete-cancel]").forEach((button) => button.addEventListener("click", () => deleteDialog.close()));
document.querySelector("[data-delete-confirm]").addEventListener("click", () => {
  if (!pendingDelete) return;
  const deletion = pendingDelete;
  if (deletion.type === "transaction") {
    state.transactions = state.transactions.filter((transaction) => transaction.id !== deletion.id);
  } else if (deletion.type === "category-budget") {
    state.categoryBudgets = state.categoryBudgets.filter((budget) => budget.category !== deletion.category);
  } else if (deletion.type === "savings-goal") {
    state.savingsGoals = state.savingsGoals.filter((goal) => goal.id !== deletion.id);
  } else {
    state = createEmptyState();
    if (profilePicturePreviewUrl) URL.revokeObjectURL(profilePicturePreviewUrl);
    profilePicturePreviewUrl = null;
  }
  pendingDelete = null;
  saveState();
  refreshAllViews();
  deleteDialog.close();
  const deleteMessages = {
    transaction: "Transaction deleted.",
    "category-budget": "Category budget deleted.",
    "savings-goal": "Savings goal deleted.",
    "clear-data": "All application data was cleared.",
  };
  showToast(deleteMessages[deletion.type]);
});
deleteDialog.addEventListener("close", () => { pendingDelete = null; });
deleteDialog.addEventListener("click", (event) => {
  if (event.target === deleteDialog) deleteDialog.close();
});

function validateField(name) {
  const control = transactionForm.elements[name];
  const message = document.querySelector(`[data-error-for="${name}"]`);
  if (!control || !message) return true;

  let error = "";
  const value = control.value.trim();
  if (name === "type" && !["expense", "income"].includes(value)) error = "Choose expense or income.";
  if (name === "name" && !value) error = "Enter a transaction title.";
  if (name === "amount") {
    const amount = Number(value);
    if (!value) error = "Enter an amount.";
    else if (!Number.isFinite(amount) || amount <= 0) error = "Amount must be greater than zero.";
    else if (Math.abs(amount * 100 - Math.round(amount * 100)) > 0.000001) error = "Use no more than 2 decimal places.";
  }
  if (name === "category" && !Array.from(control.options).some((option) => option.value === value && value)) error = "Choose a category.";
  if (name === "date") {
    const date = new Date(`${value}T00:00:00`);
    if (!value || Number.isNaN(date.getTime()) || localDateKey(date) !== value) error = "Choose a valid date.";
  }
  if (name === "payment" && !PAYMENT_METHODS.includes(value)) error = "Choose a payment method.";

  message.textContent = error;
  message.hidden = !error;
  if (error) control.setAttribute("aria-invalid", "true");
  else control.removeAttribute("aria-invalid");
  return !error;
}

function validateTransactionForm() {
  const fields = ["type", "name", "amount", "category", "date", "payment"];
  let firstInvalid = null;
  fields.forEach((name) => {
    if (!validateField(name) && !firstInvalid) firstInvalid = transactionForm.elements[name];
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

transactionForm.elements.type.addEventListener("change", (event) => {
  const selectedCategory = transactionForm.elements.category.value;
  renderCategoryOptions(event.target.value, selectedCategory);
  validateField("type");
  validateField("category");
});

transactionForm.addEventListener("input", (event) => {
  const name = event.target.name;
  const error = name && document.querySelector(`[data-error-for="${name}"]`);
  if (error && !error.hidden) validateField(name);
});

transactionForm.addEventListener("change", (event) => {
  const name = event.target.name;
  const error = name && document.querySelector(`[data-error-for="${name}"]`);
  if (error && !error.hidden) validateField(name);
});

transactionForm.addEventListener("focusout", (event) => {
  if (["type", "name", "amount", "category", "date", "payment"].includes(event.target.name)) validateField(event.target.name);
});

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (transactionSubmitConsumed) return;
  if (!validateTransactionForm()) return;
  transactionSubmitConsumed = true;
  const formData = new FormData(transactionForm);
  const amount = Number(formData.get("amount"));
  const isEditing = Boolean(editingTransactionId);
  const updatedTransaction = {
    id: editingTransactionId || newId(),
    name: String(formData.get("name")).trim(),
    amount,
    type: String(formData.get("type")),
    category: String(formData.get("category")),
    payment: String(formData.get("payment")),
    date: String(formData.get("date")),
    description: String(formData.get("description")).trim(),
  };
  if (isEditing) {
    state.transactions = state.transactions.map((transaction) => transaction.id === editingTransactionId ? updatedTransaction : transaction);
  } else {
    state.transactions.push(updatedTransaction);
  }
  saveState();
  renderDashboard();
  renderTransactionFilters();
  renderManagementTransactions();
  transactionForm.reset();
  clearFormErrors();
  renderCategoryOptions("expense");
  editingTransactionId = null;
  transactionForm.querySelector("button[type=submit]").textContent = "Save transaction";
  actionDialog.close();
  showToast(isEditing ? "Transaction updated successfully." : "Transaction saved successfully.");
});

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(budgetForm.elements.budget.value);
  if (!Number.isFinite(amount) || amount <= 0) return;
  state.monthlyBudget = amount;
  saveState();
  renderDashboard();
  actionDialog.close();
  showToast("Monthly budget updated.");
});

categoryBudgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const category = categoryBudgetForm.elements.category.value;
  const amount = Number(categoryBudgetForm.elements.amount.value);
  if (!category || !Number.isFinite(amount) || amount <= 0 || Math.abs(amount * 100 - Math.round(amount * 100)) > 0.000001) return;

  if (editingBudgetCategory) {
    state.categoryBudgets = state.categoryBudgets.map((budget) => budget.category === editingBudgetCategory ? { category, amount } : budget);
  } else {
    if (state.categoryBudgets.some((budget) => budget.category === category)) return;
    state.categoryBudgets.push({ category, amount });
  }

  saveState();
  renderBudgetView();
  categoryBudgetForm.reset();
  categoryBudgetForm.elements.category.disabled = false;
  editingBudgetCategory = null;
  actionDialog.close();
  showToast("Category budget saved.");
});

savingsGoalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = savingsGoalForm.elements.name.value.trim();
  const targetText = savingsGoalForm.elements.target.value.trim();
  const savedText = savingsGoalForm.elements.saved.value.trim();
  const targetAmount = Number(targetText);
  const savedAmount = Number(savedText);
  const targetDate = savingsGoalForm.elements.targetDate.value;
  const category = savingsGoalForm.elements.category.value;
  const validDate = new Date(`${targetDate}T00:00:00`);

  if (!name) {
    savingsGoalForm.elements.name.focus();
    showToast("Enter a name for this goal.");
    return;
  }
  if (!targetText || !Number.isFinite(targetAmount) || targetAmount <= 0 || Math.abs(targetAmount * 100 - Math.round(targetAmount * 100)) > 0.000001) {
    savingsGoalForm.elements.target.focus();
    showToast("Enter a valid target amount greater than zero.");
    return;
  }
  if (!savedText || !Number.isFinite(savedAmount) || savedAmount < 0 || Math.abs(savedAmount * 100 - Math.round(savedAmount * 100)) > 0.000001) {
    savingsGoalForm.elements.saved.focus();
    showToast("Enter a valid saved amount of zero or more.");
    return;
  }
  if (!targetDate || Number.isNaN(validDate.getTime()) || localDateKey(validDate) !== targetDate) {
    savingsGoalForm.elements.targetDate.focus();
    showToast("Choose a valid target date.");
    return;
  }
  if (!SAVINGS_GOAL_CATEGORIES.includes(category)) {
    savingsGoalForm.elements.category.focus();
    showToast("Choose a goal category.");
    return;
  }

  const existing = state.savingsGoals.find((goal) => goal.id === editingSavingsGoalId);
  const wasComplete = Boolean(existing && Number(existing.savedAmount) >= Number(existing.targetAmount));
  const goal = {
    id: editingSavingsGoalId || newId(),
    name,
    targetAmount,
    savedAmount,
    targetDate,
    category,
    description: savingsGoalForm.elements.description.value.trim(),
  };
  if (editingSavingsGoalId) {
    state.savingsGoals = state.savingsGoals.map((item) => item.id === editingSavingsGoalId ? goal : item);
  } else {
    state.savingsGoals.push(goal);
  }

  saveState();
  renderSavingsGoals();
  savingsGoalForm.reset();
  editingSavingsGoalId = null;
  actionDialog.close();
  if (!wasComplete && savedAmount >= targetAmount) showToast(`Goal complete! ${name} reached its target.`);
  else showToast(existing ? "Savings goal updated." : "Savings goal created.");
});

actionDialog.addEventListener("click", (event) => {
  if (event.target === actionDialog) actionDialog.close();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".popover-wrap, .profile-wrap, .sidebar-profile")) closePopovers();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    closePopovers();
    closeSidebar();
  }
});

document.querySelector(".brand").addEventListener("click", () => showView("dashboard"));

applyAppSettings();
renderDashboard();
