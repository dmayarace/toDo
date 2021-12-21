//get all uncompleted to dos
const getUncompletedToDos = async () => {
    let result = await fetch('http://localhost:3000/uncompleted')
    let toDos = await result.json()

    //foreach array to get uncompleted tasks and create list and buttons
    document.getElementById("uncompletedTasks").innerHTML = " "
    toDos.forEach((toDo) => {
        document.getElementById("uncompletedTasks").innerHTML +=
            "<p>" + toDo.task + "<button class='done' data-id='" + toDo._id + "'>Done</button>" +
            "<button class='delete' data-id='" + toDo._id + "'>Delete</button>" +
            "<button class='edit' data-id='" + toDo._id + "'>Edit</button>" + "</p>"
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
}
getUncompletedToDos()

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




// document.querySelector('form').addEventListener('submit', handleSubmitForm);
//
// const submitTask = async () => {
//     let result=await fetch( 'http://localhost:3000/toDos', {
//         method:'POST'
//     })
//     getUncompletedToDos()
//     getCompletedToDos()
// };
//

const newTask = new Task({
    task: {
        type: String,
        required: [true, "task is required"]
    }
})



