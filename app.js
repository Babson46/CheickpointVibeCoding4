// Sélection des éléments
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Charger les tâches sauvegardées au démarrage
document.addEventListener('DOMContentLoaded', loadTasks);

// Ajouter une tâche
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = { text: taskText, completed: false };
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  renderTask(task);
  taskInput.value = '';
}

// Rendre une tâche
function renderTask(task, index = getTasks().length - 1) {
  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button onclick="toggleTask(${index})">✔️</button>
      <button onclick="deleteTask(${index})">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
}

// Charger toutes les tâches
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach((task, index) => renderTask(task, index));
}

// Récupérer tâches depuis localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Sauvegarder tâches dans localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  refreshList();
}

// Supprimer une tâche
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
}

// Marquer/démarquer une tâche
function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
}

// Rafraîchir l'affichage
function refreshList() {
  taskList.innerHTML = '';
  loadTasks();
}
