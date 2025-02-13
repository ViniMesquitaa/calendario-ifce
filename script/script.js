const days = document.querySelector(".days");
const current_date = document.querySelector(".current-date");
const icons_btn = document.querySelectorAll(".icons span");
let tasksStorage = JSON.parse(localStorage.getItem("tasks")) || {};


const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

let date = new Date(),
  current_year = date.getFullYear(),
  current_month = date.getMonth();

function renderCalendar() {
  let firstDayMonth = new Date(current_year, current_month, 1).getDay();
  let lastDateMonth = new Date(current_year, current_month + 1, 0).getDate();
  let lastDayOfMonth = new Date(
    current_year,
    current_month,
    lastDateMonth
  ).getDay();
  let lastDateLastMonth = new Date(current_year, current_month, 0).getDate();
  let daysMonth = "";

  for (let i = firstDayMonth; i > 0; i--) {
    daysMonth += `<li class="last-days">${lastDateLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateMonth; i++) {
    var today =
      i === date.getDate() &&
      current_month === new Date().getMonth() &&
      current_year === new Date().getFullYear()
        ? "today"
        : "";
    daysMonth += `<li class="${today}">${i}</li>`;
  }

  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    daysMonth += `<li class="last-days">${i}</li>`;
  }

  current_date.innerHTML = `${months[current_month]} ${current_year}`;
  days.innerHTML = daysMonth;
}

renderCalendar();

function navigate(direction) {
  current_month += direction;

  if (current_month > 11) {
    current_month = 0;
    current_year++;
  } else if (current_month < 0) {
    current_month = 11;
    current_year--;
  }

  renderCalendar();
}

//função  responsavel para gerar a interface das tarefas do dia especifico
function addTask(day) {
  let taskListContainer = document.getElementById("show-tasks");
  taskListContainer.innerHTML = "";
  
  let header = document.createElement("div");
  header.id = `header-${day}`;
  header.className = "header-tasks";

  let title = document.createElement("h2");
  title.id = `title-${day}`;
  title.textContent = `Tarefas para o dia ${day}`;
  title.textContent.className = "title-textContent";

  header.appendChild(title);
  
  let btnAddTask = document.createElement("button");
  btnAddTask.id = `btn-add-task-${day}`;
  btnAddTask.textContent = "Adicionar task";
  btnAddTask.onclick = function () { createTaskInput(day); };
  header.appendChild(btnAddTask);
  
  taskListContainer.appendChild(header);
  
  let taskList = document.createElement("div");
  taskList.id = `tasks-${day}`;
  taskList.className = "tasks-list";
  
  if (tasksStorage[day] && tasksStorage[day].length > 0) {
    tasksStorage[day].forEach(task => {
      let taskItem = addTaskToDOM(day, task, taskList);
      taskList.appendChild(taskItem);
    });
  } else {
    let noTaskMessage = document.createElement("p");
    noTaskMessage.textContent = "Sem tarefas";
    noTaskMessage.className = "no-task";
    taskList.appendChild(noTaskMessage);
  }
  
  taskListContainer.appendChild(taskList);
}
//Cria o campo para o usuario adicionar as tarefas para aquele dia especifico
function createTaskInput(day) {
  let taskList = document.getElementById(`tasks-${day}`);
  let input = document.createElement("input");
  input.id = `input-task-${day}`;
  input.type = "text";
  input.placeholder = "Digite a tarefa...";
  taskList.appendChild(input);
  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let taskValue = input.value.trim();
      if (taskValue !== "") {
        if (!tasksStorage[day]) {
          tasksStorage[day] = [];
        }
        tasksStorage[day].push(taskValue);
        localStorage.setItem("tasks", JSON.stringify(tasksStorage));
        
        let taskItem = addTaskToDOM(day, taskValue, taskList);
        taskList.appendChild(taskItem);
      }
      input.remove();
    }
  });
}

function addTaskToDOM(day, taskValue, taskList) {//Cria e retorna para um novo item das tarefas e o botão de apagar
  let taskItem = document.createElement("p");
  taskItem.id = `task-${day}-${taskValue}`;
  
  let taskText = document.createElement("span");
  taskText.textContent = taskValue;
  taskText.id = `task-text-${day}-${taskValue}`;
  
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Apagar";
  deleteButton.onclick = function () {
    taskItem.remove();
    tasksStorage[day] = tasksStorage[day].filter(task => task !== taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasksStorage));
    if (!tasksStorage[day] || tasksStorage[day].length === 0) {
      let noTaskMessage = document.createElement("p");
      noTaskMessage.id = `no-task-${day}`;
      noTaskMessage.textContent = "Sem tarefas";
      noTaskMessage.className = "no-task";
      taskList.appendChild(noTaskMessage);
    }
  };
  
  taskItem.appendChild(taskText);
  taskItem.appendChild(deleteButton);
  return taskItem;
}

// Adiciona evento para cada dia do calendário
document.querySelectorAll(".days li").forEach(day => {
  day.addEventListener("click", function () {
    let selectedDay = this.textContent;
    addTask(selectedDay);
  });
});
