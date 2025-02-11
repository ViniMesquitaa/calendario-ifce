const days = document.querySelector(".dates");
const current_date = document.querySelector(".current-date");
const icons_btn = document.querySelectorAll(".icons span");

//Recebendo uma nova data, ano e mês atual

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let date = new Date(), 
current_year = date.getFullYear(),
current_month = date.getMonth();

