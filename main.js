// selectors
const toDoInput = document.querySelector('#todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
// listeners
toDoBtn.addEventListener('click', addToDo)
toDoList.addEventListener('click', deleteAndCheck)
// functions
function addToDo(e) {
    e.preventDefault();
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');
    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    toDoDiv.appendChild(completedBtn)
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    toDoDiv.appendChild(deleteBtn);
    toDoList.appendChild(toDoDiv);
    toDoInput.value = '';
}
function deleteAndCheck(e) {
    e.preventDefault();
    const item = e.target;
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.remove();
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}