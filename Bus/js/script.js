let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");
let menuStatus = false;

menu.getElementsByClassName.marginLeft = "-300px";
function slide(){
    if(menuStatus == false) {
        menu.getElementsByClassName.marginLeft = "600px";
        menuStatus = true;
    }
    else {
        menu.getElementsByClassName.marginLeft = "-300 px";
        menuStatus = false;;
    }
}

menuBtn.onclick = slide;