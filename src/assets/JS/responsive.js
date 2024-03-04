let ishamburgeropen = false

const openHamburger = () =>{
    let hamburgerelement = document.getElementById("hamburger-bars-list")

    if(!ishamburgeropen){
        hamburgerelement.style.display = "block";
        ishamburgeropen = true
    }
    else{
        hamburgerelement.style.display ="none";
        ishamburgeropen = false
    };
}