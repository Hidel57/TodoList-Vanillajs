let stateValue = false
let stateText = 'taskList'

const taskId = document.getElementById('taskId')
const title = document.getElementById('title')
const description = document.getElementById('description')
const error = document.getElementById('error')

document.addEventListener("DOMContentLoaded", () => {
    readTaskEvent('showTasks', stateText, stateValue)
})

const showForm = (title, addTaskBtnDisplay, editTaskBtnDisplay) => {
    document.getElementById('formModal').style.display = 'block'
    document.getElementById('formTitle').innerHTML = title
    document.getElementById('addTaskBtn').style.display = addTaskBtnDisplay
    document.getElementById('editTaskBtn').style.display = editTaskBtnDisplay
}

const showFormAdd = () => {
    showForm('Add Task', 'inline-block', 'none')
}

const showFormEdit = (idEdit) => {
    showForm('Edit Task', 'none', 'inline-block')

    const task = readTask(idEdit)
    taskId.value = task.id
    title.value = task.title
    description.value = task.description
}

const readTaskEvent = (btnId, tabContentId, state) => {
    readTasksForStateEvent(tabContentId, state)
    onClickTab(btnId, tabContentId)
    stateValue = state
    stateText = tabContentId
    console.log(stateValue)
    console.log(stateText)
}

const readTasksForStateEvent = (el, state) => {
    const elem = document.getElementById(el)
    elem.innerHTML= ''
    const tasksDB = readTasksForState(state)
    if (tasksDB === []) task.innerHTML = `No exist Tasks`
    else {
        tasksDB.forEach(task => {
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
                    <button onclick="deleteTaskEvent(${task.id})" class="icon-btn material-icons-outlined red">
                        delete
                    </button>
                    <button onclick="showFormEdit(${task.id})" class="icon-btn material-icons-outlined blue">
                        edit
                    </button>
                    <button onclick="changeStateTaskEvent(${task.id})" class="icon-btn material-icons-outlined green">
                        ${task.state ? 'replay': 'done'}
                    </button>
                </div>
            </div>`
        })
    }
}

const validateField = (field, textError) => {
    if (field.trim() === '') {
        error.innerHTML = textError
        title.focus()
        return true
    } else return false
}

const addTaskEvent = () => {
    if (validateField(title.value, 'Complete the Title field')) return
    if (validateField(description.value, 'Complete the Description field')) return

    createTask(title.value, description.value)
    closeForm()
    readTaskEvent('showTasks', 'taskList', false)
}

const editTaskEvent = () => {
    if (validateField(title.value, 'Complete the Title field')) return
    if (validateField(description.value, 'Complete the Description field')) return

    const id = Number(taskId.value)
    updateTask(id, title.value, description.value)
    closeForm()
    readTasksForStateEvent(stateText, stateValue)
}

const deleteTaskEvent = id => {
    deleteTask(id)
    readTasksForStateEvent(stateText, stateValue)
}

const changeStateTaskEvent = id => {
    changeStateTask(id)
    readTaskEvent('showTasks', 'taskList', false)
}

const closeForm = () => {
    error.innerHTML = ''
    title.value = ''
    description.value = ''
    document.getElementById('formModal').style.display = "none";
}

window.onclick = e => {
    const formModal = document.getElementById('formModal')
    if (e.target === formModal) closeForm()
}
