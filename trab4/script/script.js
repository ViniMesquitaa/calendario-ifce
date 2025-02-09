const days = document.querySelector(".dates");
const current_date = document.querySelector(".current-date");
const icons_btn = document.querySelectorAll(".icons span");

window.addEventListener("DOMContentLoaded", renderCalendar)

function renderCalendar() {
    let today = new Date(); 
    let month = today.getMonth();
    let year = today.getFullYear(); 
    let date = new Date(year, month + 1, 0); 
    let daysInMonth = date.getDate(); 

  
    for (let i = 1; i <= daysInMonth; i++) {
        days.innerHTML += `<span>${i}</span>`; 
    }
}
