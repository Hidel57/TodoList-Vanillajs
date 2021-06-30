const form = document.getElementById('form')
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

const createTodo = (e) => {
    const todosDB = getData('todos')
    const todo = { id: Date.now(), title: e.target.title.value, description: e.target.description.value, state: false }
    todosDB.push(todo)
    setData(todosDB)
    form.reset()
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

const readTodosForState = (state) => {
    const todosDB = getData('todos')
    if (todosDB.length === 0) console.log('No exist todos')
    else {
        console.log(`readTodosForState ${state}`)
        todosDB.forEach(el => {
            if (el.state === state) console.log(el)
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
    const newtodosDB = todosDB.filter(item => item.id !== id)
    setData(newtodosDB)
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
    }
}

readTodos()
readTodosForState(false)
readTodosForState(true)
changeTodoState(1625013045110)
updateTodo({id: 1625011639550, title: 'Play', description: 'dafdafads', state: false})
// deleteTodo(1625012862397)
