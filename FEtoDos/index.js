//get all uncompleted to dos
const getUncompletedToDos = async () => {
    let result = await fetch('http://localhost:3000/uncompleted')
    let toDos = await result.json()

    //foreach array to get uncompleted tasks and create list and buttons
    document.getElementById("uncompletedTasks").innerHTML = " "
    toDos.forEach((toDo) => {
        document.getElementById("uncompletedTasks").innerHTML +=
            "<p>" + toDo.task + "<button class='done' data-id='" + toDo._id + "'>Done</button>" +
            "<button class='delete' data-id='" + toDo._id + "'>Delete</button></p>" +
            "<div><input type='text' />" +
            "<button class='editTodo' data-id='" + toDo._id + "'>Edit</button>" + "</p></div>"
    })
    //Selects the done buttons and foreach array targeting the id
    document.querySelectorAll('.done').forEach((toDo) => {
        toDo.addEventListener('click', (e) => {
            const id = e.target.dataset.id
            markCompleted(id)

        })

    })

    document.querySelectorAll('.delete').forEach((toDo) => {
        toDo.addEventListener('click', (e) => {
            const id = e.target.dataset.id
            deletetask(id)
        })
    })

    document.querySelectorAll('.editTodo').forEach((toDo) => {
        toDo.addEventListener('click', (e) => {
            const id = e.target.dataset.id
            let newTodo = e.target.previousSibling.value
            editTodo(id, newTodo)
        })
    })
}
getUncompletedToDos()

const markCompleted = async(id) => {
    let result = await fetch('http://localhost:3000/updateOne/' + id, {
        method: 'PUT'
    })
    getUncompletedToDos()
    getCompletedToDos()
}

const getCompletedToDos = async () => {
    let result = await fetch('http://localhost:3000/completed')
    let toDos = await result.json()
    document.getElementById("completedTasks").innerHTML = " "
    toDos.forEach((toDo) => {
        document.getElementById("completedTasks").innerHTML += "<p>" + toDo.task + "</p>"
    })
}
getCompletedToDos()


const deletetask = async (id) => {
    let result = await fetch('http://localhost:3000/toDos/' + id, {
        method: 'DELETE'
    })
    getUncompletedToDos()
    getCompletedToDos()
}




//
const submitTask = async (e) => {
    e.preventDefault()
    let newTaskInput = document.getElementById('newTask').value

    let result = await fetch( 'http://localhost:3000/toDos', {
        method:'POST',
        body: JSON.stringify({task: newTaskInput}),
        headers: {
            "Content-Type": "application/json"
        },
    })
    getUncompletedToDos()
    getCompletedToDos()
};


document.querySelector('#handleSubmitForm').addEventListener('submit', submitTask);

// document.querySelector('uncompletedTask').addEventListener('edit', editTask);


const editTodo = async (id, newTodo) => {

    let result = await fetch( `http://localhost:3000/toDo/${id}`, {
        method:'PUT',
        body: JSON.stringify({task: newTodo}),
        headers: {
            "Content-Type": "application/json"
        },
    })
    getUncompletedToDos()
    getCompletedToDos()
};
//



