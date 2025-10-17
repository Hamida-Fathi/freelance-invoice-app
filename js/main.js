let clients = JSON.parse(localStorage.getItem("clients")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const totalClientsEl = document.getElementById("totalClients");
const totalInvoicesEl = document.getElementById("totalInvoices");
const totalValueEl = document.getElementById("totalValue");
const paidUnpaidEl = document.getElementById("paidUnpaid");
const quoteTextEl = document.getElementById("quoteText");
const quoteAuthorEl = document.getElementById("quoteAuthor");

function updateDashboardStats() {
  const totalClients = clients.length;
  const totalInvoices = invoices.length;
  const totalValue = invoices.reduce(
    (sum, inv) => sum + Number(inv.amount || 0),
    0
  );
  const paidInvoices = invoices.filter((inv) => inv.paid).length;
  const unpaidInvoices = totalInvoices - paidInvoices;

  totalClientsEl.textContent = totalClients;
  totalInvoicesEl.textContent = totalInvoices;
  totalValueEl.textContent = `$${totalValue}`;
  paidUnpaidEl.textContent = `${paidInvoices} / ${unpaidInvoices}`;
}

async function loadRandomQuote() {
  try {
    const res = await fetch("js/quotes.json");
    if (!res.ok) throw new Error("Failed to load quotes");

    const quotes = await res.json();
    if (!quotes || quotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteTextEl.textContent = quote.text;
    quoteAuthorEl.textContent = quote.author;
    quoteTextEl.classList.add("visible");
  } catch (err) {
    console.error("Failed to load quotes:", err);
    quoteTextEl.textContent = "Failed to load quote";
    quoteAuthorEl.textContent = "";
  }
}

updateDashboardStats();
loadRandomQuote();
