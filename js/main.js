// MOBILE MENU
const toggle = document.getElementById("toggle")
const sidebar = document.getElementById("sidebar")

document.onclick = function (e) {
    if (e.target.id !== "sidebar" && e.target.id !== "toggle") {
        toggle.classList.remove("active")
        sidebar.classList.remove("active")
    }
}

toggle.onclick = function () {
    toggle.classList.toggle("active")
    sidebar.classList.toggle("active")
}

// FUNCTIONS VALIDATE PERSONAL DATA AND CALCULATE LOAN 
const spanCalculation = document.querySelector("#seeLastCalculation span")
const btnseeLastCalculation = document.querySelector("#seeLastCalculation")
const interestRate = 8 / 100
const animation = "<img src='assets/imagenes/dots.gif' >"
const buttonCalculate = document.getElementById("button-calculate")
const URLtestimonials =  "js/testimonials.json"

// USER DATA STRUCTURE
const userData = {
    name: '',
    surname: '',
    emailAddress: '',
    amount: 0,
    months: 0
}

// CALCULATIONS ARRAY
const calculations = []

function showAlert(message, icon) {
    Swal.fire({
        text: message,
        icon: icon,
        timer: 4000,
        showConfirmButton: false,
        color: "#0A2864",
        html: message.replace(/\n/g, '<br>')
    })
}

function validateData() {
    userData.name = document.getElementById("Name").value
    userData.surname = document.getElementById("Surname").value
    userData.emailAddress = document.getElementById("email").value
    const amountWithCurrency = document.getElementById("amount").value
    userData.amount = parseFloat(amountWithCurrency.slice(2))
    userData.months = document.getElementById("months").value

    const nameOk = checkName(userData.name)
    const surnameOk = checkSurname(userData.surname)
    const emailAddressOk = checkEmailAddress(userData.emailAddress)

    if (nameOk && surnameOk && emailAddressOk && userData.amount && userData.months) {
        showResult(userData.amount, userData.months)
    } else if (!nameOk && !surnameOk && !emailAddressOk && !userData.amount && !userData.months){
        showAlert("Ingrese los datos solicitados para calcular su préstamo.", "warning")
    } else {
        if (!nameOk) {
            showAlert("Ingrese un nombre válido.", "warning")
        }
        if (!surnameOk) {
            showAlert("Ingrese un apellido válido.", "warning")
        }
        if (!emailAddressOk) {
            showAlert("Ingrese un correo electronico válido.", "warning")
        }
        if (!userData.amount || !userData.months ) {
            showAlert("Ingrese los valores correctamente.", "warning")
        }
    }
}    

function checkName(name) {
    const regexName = /^[a-zA-Z\s]+$/
    return regexName.test(name)
}

function checkSurname(surname) {
    const regexSurname = /^[a-zA-Z\s]+$/
    return regexSurname.test(surname)
}

function checkEmailAddress(emailAddress) {
    const regexEmailAddress = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regexEmailAddress.test(emailAddress)
}

function calculateLoan(amount, months) {
    if (amount && months) {
        const periods = months / 12
        let result = amount * (1 + interestRate) ** periods
        result /= months
        return result.toFixed(2)
    } else {
        return null
    }
}

function showResult(amount, months) {
    let result =  calculateLoan(amount, months)
    buttonCalculate.innerHTML = animation
    
    setTimeout(() => {
        buttonCalculate.textContent = "CALCULAR PRÉSTAMO"
        if (result !== null) {
            showAlert("Cuota mensual calculada exitosamente.", "success")
            let seeResult =  document.getElementById("result")

            if ( seeResult === null) {
                seeResult =  document.createElement("div")
                seeResult.id = "result"
                document.querySelector(".load-section-container").appendChild(seeResult)
            } 
            
            seeResult.innerHTML = `Su cuota mensual es de <span>€ ${result}</span>`

            const contractContainer = document.createElement("div")
            const contract = document.createElement("button")
            contract.id = "button-contract"
            contract.textContent = "CONTRATAR"

            contractContainer.appendChild(contract)
            seeResult.appendChild(contractContainer)

            contract.addEventListener("click", () => {
                showAlert("Su solicitud ha sido procesada.\nEn breve recibirá un correo electrónico con todos los detalles.", "success")
            })
           
            saveLastCalculationLS(amount, months,result)
        }
    }, 1500)
}

function showLastCalculation() {
    return JSON.parse(localStorage.getItem("lastCalculation"))
} 

function saveLastCalculationLS(amount, months,result) {
    const lastCalculation = {
        fecha: new Date(),
        amountCalculo: amount,
        monthsCalculo: months,
        resultCalculation: result
    }
    calculations.push(lastCalculation)
    localStorage.setItem("lastCalculation", JSON.stringify(lastCalculation))
}

btnseeLastCalculation.addEventListener("click", () => {
    const lastCalculation = showLastCalculation()
    
    if (lastCalculation !== null) {
        showAlert(
            "Último cálculo realizado el día " + new Date(lastCalculation.fecha).toLocaleString() +
            "\n\nDinero solicitado: " + lastCalculation.amountCalculo +  " €" +
            "\nPlazo de devolución: " + lastCalculation.monthsCalculo + " meses" + 
            "\n\nCuota mensual de " + lastCalculation.resultCalculation + " €" , "info"
        ) 
    } else {
        showAlert("No hay cálculos previos.", "info")
    }
})

function uploadTestimonials(testimonials) {
    if (testimonials.length > 0) {
        const testimonialsSection = document.querySelector("#testimonials-section")
        const testimonialsContainer = document.createElement("div")
        testimonialsContainer.classList.add("testimonials-container")
        testimonialsSection.appendChild(testimonialsContainer)

        testimonials.forEach((testimonial) => {
            const testimonialElement = document.createElement("div");
            testimonialElement.classList.add("testimonial")
            testimonialElement.innerHTML = `
                <div>
                    <p>${"⭐".repeat(testimonial.rating)}</p>
                    <p class="name"><strong>${testimonial.author}
                    </strong></p>
                    <p><strong>(${testimonial.occupation})</strong></p>
                </div>
                <div>
                    <p>${testimonial.message}</p>
                </div>
            `;
            testimonialsContainer.appendChild(testimonialElement)
        })
    }
}

// function getTestimonials() {
//     fetch(URLtestimonials)
//     .then((response) => response.json())
//     .then((data) => uploadTestimonials(data))
//     .catch((error) => {
//         console.error("Error al cargar los testimonios", error);
//     })
// }

async function getTestimonials() {
    try {
        const response = await fetch(URLtestimonials)
        const data = await response.json()
        uploadTestimonials(data)
    } catch(error) {
        const link = document.querySelector(".testimonials-link")
        link.addEventListener("click", () => {
         showAlert("Error al cargar los testimonios, intente más tarde.", "error")
        })
    }    
}

getTestimonials()