const newTask = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.task-add');
const taskList = document.querySelector('.task-list');

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', completeTask);
document.addEventListener('DOMContentLoaded', readLocalStorage);



function addTask(e){
    e.preventDefault();
    createTaskItem(newTask.value);
    saveToLocalStorage(newTask.value);
    newTask.value = '';
}

function completeTask(e){
    const clickedElement = e.target;
    if(clickedElement.classList.contains('task-completed')){
        clickedElement.parentElement.classList.toggle('task-completed');
    }
    if(clickedElement.classList.contains('task-delete')){
        if(confirm('Are you sure?')){
            clickedElement.parentElement.classList.toggle('disappear');
            const deleteTask = clickedElement.parentElement.children[0].innerText;
            deleteFromLocalStorage(deleteTask);
            clickedElement.addEventListener('transitionend', () => {
                clickedElement.parentElement.remove();
            })
        }
    }

}

function saveToLocalStorage(newTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function readLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) =>{
        createTaskItem(task);
    })
}

function createTaskItem(task){
        //create a div
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');
    
        //create a li
        const taskLi = document.createElement('li');
        taskLi.classList.add('task-content');
        taskLi.innerText = task;
        const taskCompleted = document.createElement('button');
        taskCompleted.classList.add('task-btn');
        taskCompleted.classList.add('task-completed');
        taskCompleted.innerHTML = '<i class="fa-solid fa-check"></i>'
        const taskDelete = document.createElement('button');
        taskDelete.classList.add('task-btn');
        taskDelete.classList.add('task-delete');
        taskDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
       
        taskDiv.appendChild(taskLi);
        taskDiv.appendChild(taskCompleted); 
        taskDiv.appendChild(taskDelete);
    
        //add created div to ul
        taskList.appendChild(taskDiv);
}

function deleteFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //delete item with slice function
    const indexOfItem = tasks.indexOf(task);
    console.log(indexOfItem);
    tasks.splice(indexOfItem, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



