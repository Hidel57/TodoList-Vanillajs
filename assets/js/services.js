const formModal = document.getElementById('formModal');
const title = document.getElementById('title')
const description = document.getElementById('description')
const error = document.getElementById('error')
const formAddTitle = document.getElementById('formAddTitle')
const formEditTitle = document.getElementById('formEditTitle')

const addTaskBtn = document.getElementById('addTaskBtn')
const editTaskBtn = document.getElementById('editTaskBtn')

const showTasks = document.getElementById('showTasks')
const showTasksCompleted = document.getElementById('showTasksCompleted')
const showFormBtn = document.getElementById('showFormBtn')

const taskList = document.getElementById('taskList')
const taskListCompleted = document.getElementById('taskListCompleted')

const closeForm = document.getElementById('closeForm')

const getData = (data) => {
    let db = JSON.parse(window.localStorage.getItem(data))
    if (db === null) return []
    else return db
}

const setData = (data) => {
    window.localStorage.setItem('tasks', JSON.stringify(data))
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('showTasks').classList.add('active')
    taskList.style.display = "flex"
    readTasksForState(taskList, false)
})
showTasks.addEventListener('click',() => readTasksForState(taskList, false))
showTasksCompleted.addEventListener('click',() => readTasksForState(taskListCompleted, true))

showFormBtn.addEventListener('click', () => {
    formModal.style.display = "block";
    addTaskBtn.style.display = 'inline-block'
    editTaskBtn.style.display = 'none'
    formAddTitle.style.display = 'block'
    formEditTitle.style.display = 'none'
})

const showFormEdit = (id) => {
    formModal.style.display = 'block'
    addTaskBtn.style.display = 'none'
    editTaskBtn.style.display = 'inline-block'
    formAddTitle.style.display = 'none'
    formEditTitle.style.display = 'block'

    const tasksDB = getData('tasks')
    let index = tasksDB.findIndex(el => el.id === id)
    taskId.value = tasksDB[index].id
    title.value = tasksDB[index].title
    description.value = tasksDB[index].description
}

const clearForm = () => {
    error.innerHTML = ''
    title.value = ''
    description.value = ''
}

closeForm.onclick = function () {
    clearForm()
    formModal.style.display = "none";
}

addTaskBtn.addEventListener('click', () => {
    let errorText = ''

    if (title.value.trim() === '') {
        errorText = 'Complete the Title field'
        error.innerHTML = errorText
        title.focus()
        return
    }
    if (description.value.trim() === '') {
        errorText = 'Complete the Description field'
        error.innerHTML = errorText
        description.focus()
        return
    }

    createTask()            
    clearForm()
    readTasksForState(taskList, false)
    formModal.style.display = "none"
})

editTaskBtn.addEventListener('click', () => {
    if (title.value.trim() === '') {
        errorText = 'Complete the Title field'
        error.innerHTML = errorText
        title.focus()
        return
    }
    if (description.value.trim() === '') {
        errorText = 'Complete the Description field'
        error.innerHTML = errorText
        description.focus()
        return
    }

    const taskId = document.getElementById('taskId')
    const id = Number(taskId.value)
    updateTask(id)
    if (taskList.style.display === 'none') readTasksForState(taskListCompleted, true)
    else readTasksForState(taskList, false)
    formModal.style.display = "none"
})

/************
  ** CRUD **
*************/

const createTask = () => {
    const tasksDB = getData('tasks')
    const task = { id: Date.now(), title: title.value, description: description.value, state: false }
    tasksDB.push(task)
    setData(tasksDB)
}

const readTasks = () => {
    const tasksDB = getData('tasks')
    if (tasksDB.length === 0) console.log('No exist tasks')
    else {
        tasksDB.forEach(el => {
            console.log(el)
        })
    }
}

const readTasksForState = (elem, state) => {
    elem.innerHTML = ''
    const tasksDB = getData('tasks')
    if (tasksDB.length === 0) elem.innerHTML = "No exist Tasks"
    else {
        tasksDB.forEach(task => {
            if (task.state === state) {
                elem.innerHTML += `
                <div class="card demo-card">
                <span class="card-information" id="${task.id}" onclick="taskModalFctn('taskModal', '${task.title}', '${task.description}');">
                    <div class="card-primary">
                    <div class= "card__title">${task.title}</div>
                    </div>
                    <div class="card-secondary">
                        <div class="card__description">${task.description}</div>
                    </div>
                </span>
                    <div class="card__actions">
                        <button onclick="deleteTask(${task.id})" class="icon-btn material-icons-outlined red">
                            delete
                        </button>
                        <button onclick="showFormEdit(${task.id})" class="icon-btn material-icons-outlined blue">
                            edit
                        </button>
                        <button onclick="changeTaskState(${task.id})" class="icon-btn material-icons-outlined green">
                            ${task.state ? 'replay': 'done'}
                        </button>
                    </div>
                </div>`
            }
        })
    }
}

const updateTask = (id) => {
    const tasksDB = getData('tasks')
    if (tasksDB.length === 0) console.log('No exist Tasks')
    else {
        let index = tasksDB.findIndex(el => el.id === id)
        tasksDB[index].title = title.value
        tasksDB[index].description = description.value
        setData(tasksDB)
    }
}

const deleteTask = id => {
    const tasksDB = getData('tasks')
    const newtasksDB = tasksDB.filter(item => item.id !== id)
    setData(newtasksDB)
    if (taskList.style.display === 'none') readTasksForState(taskListCompleted, true)
    else readTasksForState(taskList, false)
    formModal.style.display = "none"
}

const changeTaskState = id => {
    const tasksDB = getData('tasks')
    if (tasksDB.length === 0) console.log('No exist Tasks')
    else {
        let index = tasksDB.findIndex(el => el.id === id)
        tasksDB[index].state = !tasksDB[index].state
        setData(tasksDB)
        
        const tabLink = document.getElementsByClassName("tab__link")
        for (let i = 0; i < tabLink.length; i++) {
            tabLink[i].className = tabLink[i].className.replace(" active", "")
        }

        document.getElementById('showTasks').classList.add('active')
        taskList.style.display = "flex"
        taskListCompleted.style.display = "none"
        readTasksForState(taskList, false)
    }
}

window.onclick = e => {
    if (e.target == formModal) {
        formModal.style.display = "none";
        clearForm()
    }
}
