const days = document.querySelector(".dates");
const current_date = document.querySelector(".current-date");
const icons_btn = document.querySelectorAll(".icons span");

window.addEventListener("DOMContentLoaded", renderCalendar);

function renderCalendar() {
    let DateToday = new Date(); 
    let month = DateToday.getMonth();
    let year = DateToday.getFullYear(); 

    let date = new Date(year, month + 1, 0); 
    let daysInMonth = date.getDate(); 

    let today = new Date().getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        days.innerHTML += `<span id="day${i}">${i}</span>`;
    }

    let todayElement = document.getElementById(`day${today}`);
    if (todayElement) {
        todayElement.style.color = "red"; 
    }
}
