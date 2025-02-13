const days = document.querySelector(".days");
const current_date = document.querySelector(".current-date");
const icons_btn = document.querySelectorAll(".icons span");

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

function addTask() {
  let btnAddTask = document.getElementById("btnAddTask");

  let input = document.createElement("input");
  input.type = "text";
  input.id = "iptTask";

  btnAddTask.replaceWith(input);

  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      input.replaceWith(btnAddTask);
      let iptTask = document.getElementById("iptTask").value;
      document.getElementById("show-tasks").innerHTML += iptTask;
    }
  });  
}