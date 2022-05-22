//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all the event listners

loadEventListners();
//load all the event listners
function loadEventListners() {
  //Dom Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear button
  clearBtn.addEventListener('click', clearTask);
  //filter task
  filter.addEventListener('keyup', filterTask);
}

//get task from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === 'null') {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new delete link element
    const link = document.createElement('a');

    //add Class
    link.className = 'delete-item secondary-content';
    //add icon html from fontawsome
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to the ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('enter a task');
  }
  //Create li element
  const li = document.createElement('li');

  //add class
  li.className = 'collection-item';
  //text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new delete link element
  const link = document.createElement('a');

  //add Class
  link.className = 'delete-item secondary-content';
  //add icon html from fontawsome
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append li to the ul
  taskList.appendChild(li);

  //store in local databse
  storeTaskInLocalStorage(taskInput.value);

  //Clear Input
  taskInput.value = '';

  e.preventDefault();
}
//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      //Remove from ls
      removeTaskFromLocalStorage(
        e.target.parentElement.parentElement
      );
    }
  }
}

//Remove from local storage

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === 'null') {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      task.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task

function clearTask() {
  //first way to do {which is little slower}
  // taskList.innerHTML = ' ';

  //second and faster way to do it is {while loop}

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
}

//clear task from local storage

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

//filter task
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document
    .querySelectorAll('.collection-item')
    .forEach(function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}
//store task in local storage function

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === 'null') {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
