// selectors
const toDoInput = document.querySelector('#todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const label = document.querySelector('.dropdown-label');

// listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteAndCheck);
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
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterToDo(e) {
    
}
// dropdown constructor
class Dropdown {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.items = options.items;
        this.$el.querySelector('.dropdown-label').innerHTML = `${this.items[0].label}<i class="fas fa-caret-down"></i>`;
        // console.log(this.$el)
        this.$el.addEventListener('click', event => {
            // console.log(event.target)
            if (event.target.classList.contains('dropdown-label')) {
                if (this.$el.classList.contains('open')) {
                    this.close();
                } else {
                    this.open();
                }
            } else if (event.target.tagName.toLowerCase() === 'li') {
                const todos = Array.from(toDoList.children);
                const selected = event.target.dataset.id;
                this.select(selected);
                // console.log(event.target.dataset.id)
               if (selected === 'completed') {
                   todos.forEach(item => {
                       if (item.classList.contains('completed')) {
                           item.style.display = 'flex';
                       } else {
                        item.style.display = 'none';
                       }
                   })
               } else if (selected === 'uncompleted') {
                todos.forEach(item => {
                    if (item.classList.contains('completed')) {
                        item.style.display = 'none';
                    } else {
                     item.style.display = 'flex';
                    }
                })
               } else {
                   todos.forEach(item => item.style.display = 'flex')
               }
            }
        });
        const itemsHTML = this.items.map(i => {
            return `<li class="dropdown-menu__item" data-id='${i.id}'>${i.label}</li>`
        }).join('');
        this.$el.querySelector('.dropdown-menu').insertAdjacentHTML('afterbegin', itemsHTML);
    };
    select(id) {
        const item = this.items.find(i => i.id === id);
        this.$el.querySelector('.dropdown-label').innerHTML = `${item.label}<i class="fas fa-caret-down"></i>`;
        this.close();
        // console.log(item)
    };
    clickThrough(e) {
        console.log(e)
    }
    open() {
        this.$el.classList.add('open');
    };
    close() {
        this.$el.classList.remove('open');
    };
}
// dropdown
const dropdown = new Dropdown('#dropdown', {
    items: [
        {label: 'Все', id: 'all'},
        {label: 'Выполненные', id: 'completed'},
        {label: 'Незавершенные', id: 'uncompleted'}
    ]
});
