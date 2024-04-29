function myFunction() {
    let x = document.getElementsByClassName("nav-item");
    
    for (let i = 0; i < x.length; i++) {
        if (x[i].style.display === "none") {
            x[i].style.display = "block";
        } else {
            x[i].style.display = "none";
        }
    }

    let hamburger = document.querySelector(".hamburger-icon");

    if (hamburger.style.display === "block") {
        hamburger.style.display = "none";
    } else {
        hamburger.style.display = "block";
    }

}

function closeMenu() {
    let x = document.querySelector(".close");
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function endNavbar() {
    let x = document.getElementsByClassName("nav-item");
    
    for (let i = 0; i < x.length; i++) {
        if (x[i].style.display === "none") {
            x[i].style.display = "block";
        } else {
            x[i].style.display = "none";
        }
    }

    let hamburger = document.querySelector(".hamburger-icon");

    if (hamburger.style.display === "none") {
        hamburger.style.display = "block";
    } else {
        hamburger.style.display = "none";
    }

    let y = document.querySelector(".close");
    
    if (y.style.display === "block") {
        y.style.display = "none";
    } else {
        y.style.display = "block";
    }
}


