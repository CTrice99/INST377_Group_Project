
const host = window.location.origin;

async function createCustomer() {
  console.log('Creating Customer');
  await fetch(`${host}/customer`, {
    method: 'POST',
    body: JSON.stringify({
      firstName: `${document.getElementById('firstName').value}`,
      lastName: `${document.getElementById('lastName').value}`,
      email: `${document.getElementById('email').value}`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  await loadCustomerData();
}

async function loadCustomerData() {
  await fetch(`${host}/customers`)
    .then((res) => res.json())
    .then((resJson) => {
      const table = document.createElement('table');
      table.setAttribute('id', 'customerInfo');

      const tableRow = document.createElement('tr');

      const tableHeading1 = document.createElement('th');
      tableHeading1.innerHTML = 'First Name';
      tableRow.appendChild(tableHeading1);

      const tableHeading2 = document.createElement('th');
      tableHeading2.innerHTML = 'Last Name';
      tableRow.appendChild(tableHeading2);

      const tableHeading3 = document.createElement('th');
      tableHeading3.innerHTML = 'Email';
      tableRow.appendChild(tableHeading3);

      table.appendChild(tableRow);

      resJson.forEach((customer) => {
        const customerTableRow = document.createElement('tr');
        const customerTableFirstName = document.createElement('td');
        const customerTableLastName = document.createElement('td');
        const customerTableEmail = document.createElement('td');

        customerTableFirstName.innerHTML = customer.customer_first_name;
        customerTableLastName.innerHTML = customer.customer_last_name;
        customerTableEmail.innerHTML = customer.customer_email;

        customerTableRow.appendChild(customerTableFirstName);
        customerTableRow.appendChild(customerTableLastName);
        customerTableRow.appendChild(customerTableEmail);

        table.appendChild(customerTableRow);
      });

      const preExistingTable = document.getElementById('customerInfo');
      if (preExistingTable) {
        preExistingTable.remove();
      }

      document.body.appendChild(table);
    });
}

window.onload = loadCustomerData;