// MENU MOBILE 
const toggle = document.getElementById("toggle");
const sidebar = document.getElementById("sidebar");

document.onclick = function (e) {
    if (e.target.id !== "sidebar" && e.target.id !== "toggle") {
        toggle.classList.remove("active");
        sidebar.classList.remove("active")
    }
}

toggle.onclick = function () {
    toggle.classList.toggle("active");
    sidebar.classList.toggle("active")
}

// FUNCIONES VALIDAR DATOS PERSONALES Y CALCULAR PRESTAMO 
const interestRate = 8 / 100

function validarDatos() {
    // VALIDAR DATOS
    const name = document.getElementById("Name").value;
    const surname = document.getElementById("Surname").value;
    const emailAddress = document.getElementById("email").value;

    const nameOk = checkName(name);
    const surnameOk = checkSurname(surname);
    const emailAddressOk = checkEmailAddress(emailAddress);

    function checkName() {
        const regexName = /^[a-zA-Z\s]+$/;
        return regexName.test(name);
    }

    function checkSurname() {
        const regexSurname = /^[a-zA-Z\s]+$/;
        return regexSurname.test(surname);
    }

    function checkEmailAddress() {
        const regexEmailAddress = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmailAddress.test(emailAddress);
    }

    if (nameOk && surnameOk && emailAddressOk) {
        calcularPrestamo();
    } else {
        if (!nameOk) {
            alert("Ingrese un nombre válido")
        }
        if (!surnameOk) {
            alert("Ingrese un apellido válido")
        }
        if (!emailAddressOk) {
            alert("Ingrese un correo electronico válido")
        }
    }

    function calcularPrestamo() {
        // CALCULAR PRESTAMO 
        let amountWithCurrency = document.getElementById("amount").value;
        let amount = parseFloat(amountWithCurrency.slice(2));
        let months = document.getElementById("months").value;

        if (amount && months) {
            const periods = months / 12;
            let result = amount * (1 + interestRate) ** periods;
            result /= months;

            alert("Tu cuota mensual es de € " + result.toFixed(2))
        } else {
            alert("Ingrese los valores correctamente")
        }
    }
}
