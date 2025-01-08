// Select elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelector = document.getElementById("priority-selector");
const taskList = document.getElementById("task-list");
const resetBtn = document.getElementById("reset-btn");
const progressFill = document.querySelector(".progress-fill");

// Task storage
let tasks = [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = ""; // Clear current tasks
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task.priority + (task.completed ? " completed" : "");
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Done"}</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
  updateProgress();
}

// Function to add a task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const taskPriority = prioritySelector.value;

  if (taskText) {
    tasks.push({ text: taskText, priority: taskPriority, completed: false });
    taskInput.value = ""; // Clear input
    renderTasks();
  }
});

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to reset tasks
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

// Function to update progress
function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  progressFill.style.width = `${progressPercentage}%`;
}

// Initial render
renderTasks();
