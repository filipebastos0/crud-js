const openModal = document.querySelector('#modal').classList.add('active');
const closeModal = document.querySelector('#modal').classList.remove('active');



const tempClient = {
    nome: "alex",
    email: "alex@gmail.com",
    celular: "11988746653",
    cidade: "São Roque"
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


// Eventos
document.querySelector('#cadastrarCliente').addEventListener('click', openModal)

document.querySelector('#fecharModal').addEventListener('click', closeModal)