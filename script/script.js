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

  // últimos dias do mês anterior
  for (let i = firstDayMonth; i > 0; i--) {
    daysMonth += `<li class="last-days">${lastDateLastMonth - i + 1}</li>`;
  }

  // dias do mês atual
  for (let i = 1; i <= lastDateMonth; i++) {
    var today =
      i === date.getDate() && current_month === new Date().getMonth() && current_year === new Date().getFullYear()
        ? "today"
        : "";
    daysMonth += `<li class="${today}">${i}</li>`;
  }

  // últimos dias do mês (próximo mês)
  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    daysMonth += `<li class="last-days">${i}</li>`;
  }

  current_date.innerHTML = `${months[current_month]} ${current_year}`;
  days.innerHTML = daysMonth;
}

renderCalendar();


