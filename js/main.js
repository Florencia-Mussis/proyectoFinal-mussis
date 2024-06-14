// MENU MOBILE 
const toggle = document.getElementById("toggle")
const sidebar = document.getElementById("sidebar")

document.onclick = function (e) {
    if (e.target.id !== "sidebar" && e.target.id !== "toggle") {
        toggle.classList.remove("active");
        sidebar.classList.remove("active")
    }
}

toggle.onclick = function () {
    toggle.classList.toggle("active")
    sidebar.classList.toggle("active")
}

// FUNCIONES VALIDAR DATOS PERSONALES Y CALCULAR PRESTAMO 
const mensajeError = document.getElementById("error")
const spanCalculo = document.querySelector("#resultado span")
const btnVerUltimoCalculo = document.querySelector("#verUltimoCalculo")
const interestRate = 8 / 100

function validarDatos() {
    const name = document.getElementById("Name").value
    const surname = document.getElementById("Surname").value
    const emailAddress = document.getElementById("email").value
    const amountWithCurrency = document.getElementById("amount").value;
    const amount = parseFloat(amountWithCurrency.slice(2));
    const months = document.getElementById("months").value;

    const nameOk = checkName(name)
    const surnameOk = checkSurname(surname)
    const emailAddressOk = checkEmailAddress(emailAddress)

    if (nameOk && surnameOk && emailAddressOk && amount && months) {
        deleteError()
        mostrarResultado(amount, months)
    } else {
        if (!nameOk) {
            mensajeError.textContent = " ❌ Ingrese un nombre válido."
        }
        if (!surnameOk) {
            mensajeError.textContent = " ❌ Ingrese un apellido válido."
        }
        if (!emailAddressOk) {
            mensajeError.textContent = " ❌ Ingrese un correo electronico válido"
        }
        if (!amount || !months ) {
            mensajeError.textContent = " ❌ Ingrese los valores correctamente"
        }
    }
}    

function checkName(name) {
    const regexName = /^[a-zA-Z\s]+$/;
    return regexName.test(name);
}

function checkSurname(surname) {
    const regexSurname = /^[a-zA-Z\s]+$/;
    return regexSurname.test(surname);
}

function checkEmailAddress(emailAddress) {
    const regexEmailAddress = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmailAddress.test(emailAddress);
}

function calcularPrestamo(amount, months) {
    if (amount && months) {
        const periods = months / 12;
        let result = amount * (1 + interestRate) ** periods;
        result /= months;
        return result.toFixed(2)
    } else {
        return null
    }
}

function mostrarResultado(amount, months) {
    let resultado =  calcularPrestamo(amount, months)

    if (resultado !== null) {
        let verResultado =  document.getElementById("resultado")

        if ( verResultado === null) {
            let verResultado =  document.createElement("div")
            verResultado.id = "resultado"
            document.querySelector(".load-section-container").appendChild(verResultado);
            verResultado.innerHTML = `Tu cuota mensual es de <span>€ ${resultado}</span>`;
        } else {
            verResultado.innerHTML = `Tu cuota mensual es de <span>€ ${resultado}</span>`;
        }
        guardarUltimoCalculoLS(resultado);
    }
}

function deleteError() {
    mensajeError.textContent = ""
}

function mostrarUltimoCalculo() {
    return JSON.parse(localStorage.getItem("ultimoCalculo"))
} 

function guardarUltimoCalculoLS(resultado) {
    const ultimoCalculo = {
        fecha: new Date(),
        resultadoCalculo: resultado
    }
    localStorage.setItem("ultimoCalculo", JSON.stringify(ultimoCalculo))
}

btnVerUltimoCalculo.addEventListener("click", () => {
    const ultimoCalculo = mostrarUltimoCalculo()
    
    if (ultimoCalculo !== null) {
        alert("Último cálculo realizado el " + new Date(ultimoCalculo.fecha).toLocaleString() + " con una cuota mensual de € " + ultimoCalculo.resultadoCalculo);
    } else {
        alert("No hay cálculos previos.");
    }
})