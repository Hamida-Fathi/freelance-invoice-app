export let clients = JSON.parse(localStorage.getItem("clients")) || [];
const form = document.getElementById("clientForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const company = document.getElementById("company");
const clientList = document.getElementById("clientList");
let editId = null;

function showClient() {
  clientList.innerHTML = "";
  clients.forEach((c, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-3 border">${index + 1}</td>
      <td class="p-3 border">${c.name}</td>
      <td class="p-3 border">${c.email}</td>
      <td class="p-3 border">${c.phone}</td>
      <td class="p-3 border">${c.company}</td>
      <td class="border p-2 text-center">
        <button class="bg-yellow-500 text-white px-2 py-1 rounded editBtn" data-id="${
          c.id
        }">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded deleteBtn" data-id="${
          c.id
        }">Delete</button>
      </td>
    `;
    clientList.appendChild(row);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (editId) {
    clients = clients.map((c) =>
      c.id === editId
        ? {
            ...c,
            name: name.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            company: company.value.trim(),
          }
        : c
    );
    editId = null;
    form.querySelector("button[type='submit']").textContent = "Add Client";
  } else {
    // Add new client
    const newClient = {
      id: Date.now(),
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      company: company.value.trim(),
    };
    clients.push(newClient);
  }

  localStorage.setItem("clients", JSON.stringify(clients));
  showClient();
  form.reset();
});

clientList.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("deleteBtn")) {
    clients = clients.filter((c) => c.id !== id);
    localStorage.setItem("clients", JSON.stringify(clients));
    showClient();
  }

  if (e.target.classList.contains("editBtn")) {
    const client = clients.find((c) => c.id === id);
    name.value = client.name;
    email.value = client.email;
    phone.value = client.phone;
    company.value = client.company;
    editId = id;
    form.querySelector("button[type='submit']").textContent = "Update Client";
  }
});

showClient();
