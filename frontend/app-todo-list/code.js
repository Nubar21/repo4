let tasks = [];
let nextId = 1;
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        if (tasks.length > 0) {
            // Находим минимальный и максимальный id
            let maxId = 0;
            for (let task of tasks) {
                if (task.id > maxId) {
                    maxId = task.id;
                }
            }
            nextId = maxId + 1;

            // Восстанавливаем задачи на странице
            tasks.forEach(task => createTaskElement(task));
        }
    }
}

const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        if (tasks.length > 0) {
            // Находим минимальный и максимальный id
            let maxId = 0;
            for (let task of tasks) {
                if (task.id > maxId) {
                    maxId = task.id;
                }
            }
            nextId = maxId + 1;

            // Восстанавливаем задачи на странице
            tasks.forEach(task => createTaskElement(task));
        }
    }

//обработчик отправки формы
  todoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      addTask();
      createTaskElement();

});

    // Сохранение задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Для отметки задачи как выполненной
document.getElementById('todo-list').addEventListener('change', function(e) {
    if (e.target && e.target.type === 'checkbox') {
        const li = e.target.closest('li');
        if (li) {
            if (e.target.checked) {
                // Задача выполнена: добавляем класс для стиля
                li.classList.add('completed');
            } else {
                // Задача не выполнена: убираем класс
                li.classList.remove('completed');
            }
        }
    }
});

//добавляем задачу вместе с кнопками
function createTaskElement() {
    if (todoInput.value === '') {
        alert('Нужно ввести задачу');
       } else {
        const li = document.createElement('li');
        li.textContent = todoInput.value;
        todoList.append(li);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.placeholder='';
        checkbox.className = 'form-control';
        li.append(checkbox);
        const deleteBtn = document.createElement('Button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'btn';
        li.appendChild(deleteBtn);
    }
    todoInput.value = '';
}

//создание задачи
function addTask() { 
    if (tasks.length > 0) {
        let maxId = 0;
        for (let task of tasks) {
            if (task.id > maxId) {
                maxId = task.id;
            }
        }
        nextId = maxId + 1;
    }
saveTasks()

const newTask = {
    id: nextId, 
    text: todoInput.value,
    completed: false,
}; 
tasks.push(newTask);
console.log(tasks);
}

//добавила этот кусок кода-удаление задачи
document.getElementById('todo-list').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn')) {
        const li = e.target.closest('li');
        if (li) {
            const id = parseInt(li.getAttribute('data-id'), 10);
            // Удаляем из массива tasks
            tasks = tasks.filter(task => task.id !== id);
            li.remove();
        }  
    }
});