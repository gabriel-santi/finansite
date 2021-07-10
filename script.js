const btn = document.getElementById('btn-add')
let transactions = []

window.onload = () => {
    const transactionsStored = JSON.parse(localStorage.getItem('transactions'))

    if (transactionsStored != null) {
        transactions = transactionsStored
    }

    loadHTML()
}

function loadHTML() {

    //updating the total amount
    const amount = document.getElementById('amount')
    let totalAmount = 0

    transactions.forEach(transaction => totalAmount += transaction.value)

    if (totalAmount >= 0) {
        amount.classList.add('positive')
        amount.classList.remove('negative')
    } else {
        amount.classList.add('negative')
        amount.classList.remove('positive')
    }
    amount.innerHTML = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`

    //creating the historic cards
    const historic = document.getElementById('historic')
    historic.innerHTML = '' //delete all the historic after, cuz if not the historic cards will repeat 
    transactions.forEach((transaction, index) => {
        historic.innerHTML += `
        <div class='historic-box'>
            <button class='remove' onclick='removeItem(${index})'>X</button>
            <h2 class='name'>${transaction.name.toLowerCase()}</h2>
            <h2 class='value'>R$ ${transaction.value}</h2>
        </div>`
    }
    )
}

function removeItem(index) {
    transactions.splice(index, 1)
    const transactionsFormated = JSON.stringify(transactions)

    localStorage.setItem('transactions', transactionsFormated)

    loadHTML()
}

function removeAll() {
    transactions.splice(0, 99999999)
    const transactionsFormated = JSON.stringify(transactions)

    localStorage.setItem('transactions', transactionsFormated)

    loadHTML()
}

function addToStorage(name, value) {
    const transaction = {
        name: name,
        value: value
    }

    transactions.push(transaction)
    const transactionsFormated = JSON.stringify(transactions)

    localStorage.setItem('transactions', transactionsFormated)

    loadHTML()
}

function getValues() {
    const name = document.getElementById('name').value
    let value = document.getElementById('value').value
    value = parseFloat(value)

    value && name ?
        addToStorage(name, value)
        :
        alert('Preencha os campos com valores válidos!')


    document.getElementById('name').value = ''
    document.getElementById('value').value = ''
}

btn.addEventListener('click', getValues)