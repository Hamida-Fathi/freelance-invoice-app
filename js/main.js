let clients = JSON.parse(localStorage.getItem("clients")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const totalClientsEl = document.getElementById("totalClients");
const totalInvoicesEl = document.getElementById("totalInvoices");
const totalValueEl = document.getElementById("totalValue");
const paidUnpaidEl = document.getElementById("paidUnpaid");

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

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

async function loadRandomQuote() {
  try {
    const res = await fetch("./quotes.json"); // adjust path here
    if (!res.ok) throw new Error("Failed to load quotes file");

    const quotes = await res.json();
    if (!Array.isArray(quotes) || quotes.length === 0)
      throw new Error("Quotes data is empty or invalid");

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteText.textContent = quote.text || "No quote available";
    quoteAuthor.textContent = quote.author || "Unknown";
  } catch (err) {
    console.error("Error loading quotes:", err);
    quoteText.textContent = "Failed to load quote.";
    quoteAuthor.textContent = "";
  }
}

loadRandomQuote();

loadRandomQuote();

updateDashboardStats();
loadRandomQuote();
