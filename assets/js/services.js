const getData = (data) => {
    let db = JSON.parse(window.localStorage.getItem(data))
    if (db === null) return []
    else return db
}

const setData = (data) => {
    window.localStorage.setItem('tasks', JSON.stringify(data))
}

/************
  ** CRUD **
*************/

const createTask = (title, description) => {
    const tasksDB = getData('tasks')
    const task = { id: Date.now(), title, description, state: false }
    tasksDB.push(task)
    setData(tasksDB)
}
const readTask = (id) => {
    const tasksDB = getData('tasks')
    let index = tasksDB.findIndex(el => el.id === id)
    return tasksDB[index]
}

const updateTask = (id, title, description) => {
    const tasksDB = getData('tasks')
    let index = tasksDB.findIndex(el => el.id === id)
    tasksDB[index].title = title
    tasksDB[index].description = description
    setData(tasksDB)
}

const deleteTask = id => {
    const tasksDB = getData('tasks')
    const newtasksDB = tasksDB.filter(task => task.id !== id)
    setData(newtasksDB)
}

const changeStateTask = id => {
    const tasksDB = getData('tasks')
    let index = tasksDB.findIndex(task => task.id === id)
    tasksDB[index].state = !tasksDB[index].state
    setData(tasksDB)        
}

const readTasksForState = (state) => {
    const tasksDB = getData('tasks')
    const newtasksDB = tasksDB.filter(task => task.state === state)
    return newtasksDB
}
