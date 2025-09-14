let tasks = [];
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

// Базовый URL API
const API_BASE = "https://dummyjson.com/todos";

// Загрузка задач с API при запуске
async function loadTasks() {
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    tasks = data.todos; // массив задач от API
    console.log(tasks);
    todoList.innerHTML = ""; // очистка тех задач, которые в браузере находятся прямо сейчас, чтобы были только актуальные данные от сервера
    for (const task of tasks) {
      createTaskElement(task);
    }
  } catch (error) {
    console.error("Ошибка загрузки задач:", error); //если ошибка от сервера
  }
}

// Добавление задачи через API
async function addTask() {
  const text = todoInput.value.trim();
  if (!text) {
    //переменная не пустая, т.е. текст есть.!-отсутствие
    alert("Нужно ввести задачу");
    return;
  }

  try {
    const response = await fetch(API_BASE + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: text,
        completed: false,
        userId: 5, // пример userId (можно по желанию)
      }),
    });
    const newTask = await response.json();

    // API возвращает поле 'todo' — это текст задачи
    const taskForUI = {
      id: newTask.id,
      todo: newTask.todo,
      completed: newTask.completed,
    };

    tasks.push(taskForUI);
    createTaskElement(taskForUI);
    todoInput.value = "";
  } catch (error) {
    console.error("Ошибка добавления задачи:", error);
  }
}

// Обновление задачи (статуса completion)
async function updateTask(task) {
  try {
    const response = await fetch(`${API_BASE}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: task.completed }),
    });
    await response.json(); // Можно обработать ответ, если нужно
  } catch (error) {
    console.error("Ошибка обновления задачи:", error);
  }
}

// Удаление задачи через API
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    await response.json();

    // Обновляем UI и локальный массив
    tasks = tasks.filter((t) => t.id !== id);
    const li = todoList.querySelector(`li[data-id='${id}']`);
    if (li) li.remove();
  } catch (error) {
    console.error("Ошибка удаления задачи:", error);
  }
}

// Создаем элемент задачи для UI
function createTaskElement(task) {
  const li = document.createElement("li");
  li.textContent = task.todo;
  li.setAttribute("data-id", task.id);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-control";
  checkbox.checked = task.completed;

  // Вставляем чекбокс перед текстом
  li.textContent = "";
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(" " + task.todo));

  if (task.completed) {
    li.classList.add("completed");
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Удалить";
  deleteBtn.className = "btn";
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
}

// Отправка формы — добавление задачи
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

// Отметка задачи выполненной/не выполненной
todoList.addEventListener("change", async function (e) {
  if (e.target && e.target.type === "checkbox") {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.getAttribute("data-id"));
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    task.completed = e.target.checked;

    if (task.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }

    await updateTask(task);
  }
});

// Удаление задачи по кнопке
todoList.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("btn")) {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.getAttribute("data-id"));
    deleteTask(id);
  }
});

// При загрузке страницы загружаем задачи с API
loadTasks();
