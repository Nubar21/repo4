let tasks = [];
let nextId = 1;
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Загрузка задач из localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        if (tasks.length > 0) {
            // Восстанавливаем задачи на странице
            tasks.forEach(task => createTaskElement(task));
        }
    }
}

//обработчик отправки формы
todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (todoInput.value === '') {
        alert('Нужно ввести задачу');
    } else {
        addTask();
        todoInput.value = '';
    }
});

// Сохранение задач в localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Для отметки задачи как выполненной
todoList.addEventListener('change', function (e) {
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

        const id = parseInt(li.getAttribute('data-id'), 10);
        let targetTask = tasks.find(task => task.id == id);
        targetTask.completed = !targetTask.completed;
        saveTasks();
    }
});

//добавляем задачу вместе с кнопками
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.setAttribute('data-id', task.id);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.placeholder = '';
    checkbox.className = 'form-control';

    todoList.append(li);
    li.append(checkbox);

    if (task.completed) {
        li.classList.add('completed');
        checkbox.checked = true;
    }

    const deleteBtn = document.createElement('Button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.className = 'btn';
    li.appendChild(deleteBtn);
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

    const newTask = {
        id: nextId,
        text: todoInput.value,
        completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    createTaskElement(newTask);
}

//добавила этот кусок кода-удаление задачи
todoList.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn')) {
        const li = e.target.closest('li');
        if (li) {
            const id = parseInt(li.getAttribute('data-id'), 10);
            // Удаляем из массива tasks
            tasks = tasks.filter(task => task.id !== id);
            li.remove();
            saveTasks();
        }
    }
});

loadTasks();