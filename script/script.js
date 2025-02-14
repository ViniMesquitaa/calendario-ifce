const days = document.querySelector(".days");
const current_date = document.querySelector(".current-date");
const taskContainer = document.getElementById("show-tasks");

let tasksStorage = JSON.parse(localStorage.getItem("tasks")) || {};
let selectedDate = null;

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

// Função para renderizar o calendário com todos os dias 
function renderCalendar() {
  let firstDayMonth = new Date(current_year, current_month, 1).getDay();
  let lastDateMonth = new Date(current_year, current_month + 1, 0).getDate();
  let lastDayOfMonth = new Date(current_year, current_month, lastDateMonth).getDay();
  let lastDateLastMonth = new Date(current_year, current_month, 0).getDate();
  let daysMonth = "";

  // Preencher os dias do mês anterior pra ficar calendario completo na semana
  for (let i = firstDayMonth; i > 0; i--) {
    daysMonth += `<li class="last-days">${lastDateLastMonth - i + 1}</li>`;
  }

  // Preencher os dias do mês atual na semaana
  for (let i = 1; i <= lastDateMonth; i++) {
    let today =
      i === date.getDate() &&
      current_month === new Date().getMonth() &&
      current_year === new Date().getFullYear()
        ? "today"
        : "";
    let key = `${current_year}-${current_month + 1}-${i}`;
    let taskClass = tasksStorage[key] && tasksStorage[key].length > 0 && today === "" ? "task-day" : "";

    // Não muda a cor do dia atual, apenas os outros dias com tarefas
    daysMonth += `<li class="${today} ${taskClass}" onclick="selectDay(${i})">${i}</li>`;
  }

  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    daysMonth += `<li class="last-days">${i}</li>`;
  }

  current_date.innerHTML = `${months[current_month]} ${current_year}`;
  days.innerHTML = daysMonth;
}

// Função para selecionar o dia e exibir as tasks 
function selectDay(day) {
  let today = new Date();
  let isPastDate =
    new Date(current_year, current_month, day) <
    new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (isPastDate) {
    alert("Você não pode adicionar tasks em dias passados!");
    return;
  }

  selectedDate = `${current_year}-${current_month + 1}-${day}`;
  showTasks(); // Exibe as tarefas do dia selecionado
}

// Função para mostrar as tarefas do dia selecionado
function showTasks() {
  if (!selectedDate) return;

  let tasks = tasksStorage[selectedDate] || [];

  taskContainer.innerHTML = `
    <div class="header-tasks">
    <div class="header-tasks-title">
    <h2>Tasks - ${selectedDate.split("-").reverse().join("/")}</h2>
    </div>
      
      <div class="task-input">
        <input type="text" id="taskInput" placeholder="Digite sua task..." />
        <button onclick="addTask()">Adicionar</button>
      </div>
    </div>
    <ul class="task-list">
      ${tasks
        .map(
          (task, index) => `        
        <li>
          ${task} 
          <button onclick="deleteTask(${index})">❌</button>
        </li>`
        )
        .join("")}
    </ul>
  `;

  document.getElementById("taskInput").focus();
}

// Função para adicionar uma tarefa
function addTask() {
  if (!selectedDate) return;

  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText) {
    let currentTime = new Date().toLocaleTimeString("pt-BR", { hour12: false });
    let taskWithTime = `${taskText} <span class="task-time"><span class="material-symbols-outlined">access_time</span> ${currentTime}</span>`;

    if (!tasksStorage[selectedDate]) {
      tasksStorage[selectedDate] = [];
    }
    tasksStorage[selectedDate].push(taskWithTime);
    localStorage.setItem("tasks", JSON.stringify(tasksStorage));
    taskInput.value = ""; // Limpar o campo de entrada
    renderCalendar(); // Re-renderiza o calendário
    showTasks(); // Atualiza as tarefas
  }
}

// Função para excluir uma tarefa
function deleteTask(index) {
  if (!selectedDate) return;
  tasksStorage[selectedDate].splice(index, 1);

  if (tasksStorage[selectedDate].length === 0) {
    delete tasksStorage[selectedDate];
  }

  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
  renderCalendar();
  showTasks();
}

// Função para carregar automaticamente as tarefas do dia atual
function loadTodayTasks() {
  selectedDate = `${current_year}-${current_month + 1}-${date.getDate()}`;
  showTasks();
}

function navigate(direction) {
  current_month += direction;

  if (current_month > 11) {
    current_month = 0;
    current_year++;
  } else if (current_month < 0) {
    current_month = 11;
    current_year--;
  }

  renderCalendar(); // Re-renderiza o calendário
  loadTodayTasks(); // Carrega as tarefas do dia atual (se necessário)
}

// Inicializa o calendário e carrega as tarefas do dia atual
renderCalendar();
loadTodayTasks();

// Função do botão pro refresh no footer
const todayButton = document.getElementById("today-btn");

todayButton.addEventListener("click", function() {
  date = new Date(); // Atualiza a data para hoje
  current_year = date.getFullYear(); // Atualiza o ano
  current_month = date.getMonth(); // Atualiza o mês
  renderCalendar(); // Atualiza o calendário para o mês atual
});

function updateTime() {
  const timeElement = document.getElementById('current-time');
  const options = { timeZone: 'America/Sao_Paulo', hour24: true };
  const date = new Date().toLocaleString('pt-BR', options);

  timeElement.textContent = date.split(' ')[1];
}

setInterval(updateTime, 1000);
updateTime();

function updateDate() {
  const dateElement = document.getElementById('current-date');
  const options = { dateStyle: 'full', timeZone: 'America/Sao_Paulo' };
  const date = new Date().toLocaleString('pt-BR', options);

  dateElement.textContent = date.split(',')[1].trim();
}

updateDate();
