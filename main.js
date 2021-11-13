const openModal = () => document.querySelector('#modal').classList.add('active');
const closeModal = () => {
    clearFields()
    document.querySelector('#modal').classList.remove('active');
}

// CRUD - create read update delete

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [] // READ


const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

const createClient = (client) => { // CREATE
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}


const updateClient = (index, client) => { // UPDATE
    const dbClient = getLocalStorage()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const deleteClient = (index) => { // DELETE
    const dbClient = getLocalStorage()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}


const isValid = () => document.querySelector('#form').reportValidity()

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    const clientName = document.querySelector('#name').value
    const clientEmail = document.querySelector('#email').value
    const clientPhone = document.querySelector('#phone').value
    const clientCity = document.querySelector('#city').value

    if (isValid()) {
        const client = {
            name: clientName,
            email: clientEmail,
            phone: clientPhone,
            city: clientCity
        }
        const index = document.querySelector('#name').dataset.index
        if (index == 'new'){
            createClient(client)
            updateTable()
            closeModal()
        }else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.name}</td>        
        <td>${client.email}</td>        
        <td>${client.phone}</td>        
        <td>${client.city}</td>        
        <td>
        <button type="button" class="button green" data-action="edit-${index}">Editar</button>
        <button type="button" class="button red" data-action="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () =>{
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = getLocalStorage()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.querySelector('#name').value = client.name
    document.querySelector('#email').value = client.email
    document.querySelector('#phone').value = client.phone
    document.querySelector('#city').value = client.city
    document.querySelector('#name').dataset.index = client.index
}

const editClient = (index) => {
    const client = getLocalStorage()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.dataset.action.split('-')
        
        if (action == 'edit'){
            editClient(index)
        }else {
            const client = getLocalStorage()[index]
            const response = confirm (`Deseja realmente deletar o cliente ${client.name}?`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
    }
}


updateTable()


// Eventos
document.querySelector('#register-client').addEventListener('click', openModal)

document.querySelector('#modal-close').addEventListener('click', closeModal)
document.querySelector('#cancel').addEventListener('click', closeModal)

document.querySelector('#save').addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)