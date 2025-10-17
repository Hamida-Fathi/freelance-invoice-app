let clients = JSON.parse(localStorage.getItem("clients")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const invoiceForm = document.getElementById("invoiceForm");
const clientSelect = document.getElementById("clientSelect");
const serviceTitle = document.getElementById("serviceTitle");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const invoiceList = document.getElementById("invoiceList");
const totalAmount = document.getElementById("totalAmount");

function populateClientDropdown() {
  clientSelect.innerHTML = '<option value="">Select Client</option>';
  clients.forEach((client) => {
    const option = document.createElement("option");
    option.value = client.id;
    option.textContent = client.name;
    clientSelect.appendChild(option);
  });
}

function saveInvoices() {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

function deleteInvoice(id) {
  invoices = invoices.filter((inv) => inv.id !== id);
  saveInvoices();
  renderInvoices();
}

function togglePaid(id) {
  invoices = invoices.map((inv) =>
    inv.id === id ? { ...inv, paid: !inv.paid } : inv
  );
  saveInvoices();
  renderInvoices();
}

function renderInvoices() {
  invoiceList.innerHTML = "";

  invoices.forEach((invoice, index) => {
    const client = clients.find(
      (c) => String(c.id) === String(invoice.clientId)
    );
    const clientName = client ? client.name : "Unknown Client";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-3 border text-center">${index + 1}</td>
      <td class="p-3 border">${clientName}</td>
      <td class="p-3 border">${invoice.serviceTitle || "-"}</td>
      <td class="p-3 border">${invoice.description || "-"}</td>
      <td class="p-3 border text-center">$${invoice.amount || 0}</td>
      <td class="p-3 border text-center">${invoice.date || "-"}</td>
      <td class="p-3 border text-center">
        <button 
          class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded markPaidBtn" 
          data-id="${invoice.id}">
          ${invoice.paid ? "Paid" : "Mark as Paid"}
        </button>
        <button 
          class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded deleteBtn" 
          data-id="${invoice.id}">
          Delete
        </button>
      </td>
    `;
    invoiceList.appendChild(row);
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => deleteInvoice(e.target.dataset.id));
  });
  document.querySelectorAll(".markPaidBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => togglePaid(e.target.dataset.id));
  });

  const total = invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  totalAmount.textContent = `${total}`;
}

invoiceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!clientSelect.value) {
    alert("Please select a client!");
    return;
  }

  const newInvoice = {
    id: Date.now().toString(),
    clientId: clientSelect.value,
    serviceTitle: serviceTitle.value.trim(),
    description: description.value.trim(),
    amount: parseFloat(amount.value) || 0,
    date: date.value,
    paid: false,
  };

  invoices.push(newInvoice);
  saveInvoices();
  renderInvoices();
  invoiceForm.reset();
});

populateClientDropdown();
renderInvoices();
