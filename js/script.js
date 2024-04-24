function myFunction() {
    let x = document.getElementsByClassName("nav-item");
    
    for (let i = 0; i < x.length; i++) {
        if (x[i].style.display === "none") {
            x[i].style.display = "block";
        } else {
            x[i].style.display = "none";
        }
    }

}
