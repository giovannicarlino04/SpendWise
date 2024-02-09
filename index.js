// Function to add a new transaction
function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description.trim() === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const transaction = {
        description,
        amount
    };

    // Get existing transactions from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Add the new transaction
    transactions.push(transaction);

    // Save transactions to local storage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update the transaction table and balance
    updateTransactionTable();
    updateBalance();
}

// Function to update the transaction table
function updateTransactionTable() {
    const transactionTableBody = document.getElementById('transactionTableBody');
    transactionTableBody.innerHTML = '';

    // Get transactions from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Populate the transaction table
    transactions.forEach(transaction => {
        const row = transactionTableBody.insertRow();
        row.insertCell(0).textContent = transaction.description;
        row.insertCell(1).textContent = `$${transaction.amount.toFixed(2)}`;
    });
}

// Function to update the balance
function updateBalance() {
    const balanceParagraph = document.getElementById('balance');

    // Get transactions from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Calculate the total balance
    const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);

    // Update the balance paragraph
    balanceParagraph.textContent = `Balance: $${balance.toFixed(2)}`;
}

// Initial update when the page loads
updateTransactionTable();
updateBalance();