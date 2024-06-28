document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  //Load todos from Local storage

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => addTodoItem(todo));

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTask = {
      text: todoInput.value,
      completed: false,
    };
    todos.push(newTask);
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodoItem(newTask);
    todoInput.value = "";
  });
  function addTodoItem(task) {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";

    if (task.completed) {
      todoItem.classList.add("completed");
    }
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.addEventListener("click", () => {
      task.completed = !task.completed;
      todoItem.classList.toggle("completed");
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    todoItem.appendChild(taskText);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        taskText.textContent = task.text;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    });
    todoItem.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const index = todos.indexOf(task);
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      todoList.removeChild(todoItem);
    });
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  }
});
