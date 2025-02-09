document.addEventListener("DOMContentLoaded", () => {
    const mesas = document.querySelectorAll("td div");
    const iptData = document.querySelector("#iptData");  
    const iptHora = document.querySelector("#iptHora");  
    const bttEnviar = document.querySelector("#bttEnviar");  

    mesas.forEach(mesa => {
        atualizarTextoMesa(mesa); 
    });

    function atualizarTextoMesa(mesa) {
        if (mesa.classList.contains("emuso")) {
            mesa.textContent = "E"; 
        } else if (mesa.classList.contains("reserv")) {
            mesa.textContent = "R";
        } else if (mesa.classList.contains("vip")) {
            mesa.textContent = "V"; 
        } else {
            mesa.textContent = "D"; 
        }
    }

    function reservarMesa(mesa) {
        if (!mesa.classList.contains("reserv") && !mesa.classList.contains("emuso")) {
            mesa.classList.add("reserv");
            atualizarTextoMesa(mesa);
        } else {
            alert("Esta mesa não pode ser reservada no momento.");
        }
    }

    mesas.forEach(mesa => {
        mesa.addEventListener("click", () => {
            reservarMesa(mesa); 
        });
    });

    if (bttEnviar) {
        bttEnviar.addEventListener("click", () => {
            alert("Reserva confirmada!"); 
        });
    }
});