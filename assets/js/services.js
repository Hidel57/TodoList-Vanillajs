const form = document.getElementById('form')

const showTodos = document.getElementById('showTodos')
const showTodosCompleted = document.getElementById('showTodosCompleted')

const todoList = document.getElementById('todoList')
const todoListCompleted = document.getElementById('todoListCompleted')

const getData = (key) => {
    let db = JSON.parse(window.localStorage.getItem(key))
    if (db === null) return []
    else return db
}

const setData = (data) => {
    window.localStorage.setItem('todos', JSON.stringify(data))
}

showTodos.addEventListener('click',() => readTodosForState(todoList, false))
showTodosCompleted.addEventListener('click',() => readTodosForState(todoListCompleted, true))

form.addEventListener('submit', e => {
    e.preventDefault()
    createTodo(e)
})


// CRUD
const createTodo = (e) => {
    const todosDB = getData('todos')
    const todo = { id: Date.now(), title: e.target.title.value, description: e.target.description.value, state: false }
    todosDB.push(todo)
    setData(todosDB)
    form.reset()
    location.reload()
}

const readTodos = () => {
    const todosDB = getData('todos')
    if (todosDB.length === 0) console.log('No exist todos')
    else {
        console.log('readTodos')
        todosDB.forEach(el => {
            console.log(el)
        })
    }
}

const readTodosForState = (elem, state) => {
    elem.innerHTML = ""
    const todosDB = getData('todos')
    if (todosDB.length === 0) elem.innerHTML = "No exist Todos"
    else {
        todosDB.forEach(todo => {
            if (todo.state === state) {
                elem.innerHTML += `
                <div class="card demo-card">
                    <div class="card-primary">
                    <div class= "card__title">${todo.title}</div>
                    </div>
                    <div class="card__description">${todo.description}</div>
                    <div class="card__actions">
                        <button class="icon-btn" onClick="deleteTodo(${todo.id})">
                            <span class="material-icons-outlined">delete</span>
                        </button>
                        <button class="icon-btn">
                            <span class="material-icons-outlined" onClick="changeTodoState(${todo.id})">done</span>
                        </button>
                    </div>
                </div>`
            }
        })
    }
}

const updateTodo = todo => {
    const todosDB = getData('todos')
    console.log('State changed')
    if (todosDB.length === 0) console.log('No exist Todos')
    else {
        let index = todosDB.findIndex(el => el.id === todo.id)
        todosDB[index].title = todo.title
        todosDB[index].description = todo.description
        todosDB[index].state = todo.state
        setData(todosDB)
        console.log(todosDB[index])
    }}

const deleteTodo = id => {
    const todosDB = getData('todos')
    const newtodosDB = todosDB.filter(item => item.id !== id)
    setData(newtodosDB)
    location.reload()
}


const changeTodoState = id => {
    const todosDB = getData('todos')
    console.log('State changed')
    if (todosDB.length === 0) console.log('No exist Todos')
    else {
        let index = todosDB.findIndex(el => el.id === id)
        todosDB[index].state = !todosDB[index].state
        setData(todosDB)
        console.log(todosDB[index])
        location.reload()
    }
}


readTodos()
readTodosForState(false)
readTodosForState(true)
// changeTodoState(1625013045110)
// updateTodo({id: 1625011639550, title: 'Play', description: 'dafdafads', state: false})
// deleteTodo(1625012862397)
