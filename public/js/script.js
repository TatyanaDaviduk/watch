/*
const elem = document.getElementById("home")
var elemBgColor = window.getComputedStyle(elem).backgroundColor;
console.log(elemBgColor);
if(elemBgColor == "rgba(0, 0, 0, 0)"){
    const links =document.querySelectorAll(".header__menu-link")
    const logo = document.querySelector(".header__logo-img")
    links.forEach(element => {
        element.style.color = "white";
    });
    logo.src = 'images/svg/logo.svg'
} */

const articles = document.getElementById("articles-page");

const itemBtns = articles.querySelectorAll(".articles__categories-item");

itemBtns.forEach(elem =>{
    elem.addEventListener('click', () =>{
        elem.classList.add('active');
    })
})