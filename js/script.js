var homePage = document.querySelector("#homePage");
var body = document.querySelector(".body");
var buttons = document.querySelector(".buttons");
var sticky = buttons.offsetTop;

// SEARCH BUTTONS ON CARDS IN CENTER OF PAGE
var searchByStat = document.getElementById("searchByStat");
var searchByFighter = document.getElementById("searchByFighter");
var totT = document.getElementById("taleOfTheTape");

var statSearchPageBlank = document.getElementById("statSearchPageBlank");

var fightSearchPageBlank = document.getElementById("fightSearchPageBlank");

var tapeSearchPageBlank = document.getElementById("tapeSearchPageBlank");


function myFunction() {
  if (window.pageYOffset >= sticky) {
    buttons.classList.add("sticky")
  } else {
    buttons.classList.remove("sticky");
  }
}
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function launchStatSearchPage(){
  homePage.classList.add("hide");
  statSearchPageBlank.classList.remove("hide");
  body.classList.remove("body");
}
function launchStatSearchPageByBannerButton(){
  homePage.classList.add("hide");
  statSearchPageBlank.classList.remove("hide");
  body.classList.remove("body");
}

function launchFighterSearchPage() {
  homePage.classList.add("hide");
    fightSearchPageBlank.classList.remove("hide");
    body.classList.remove("body");
}

function taleOfTheTape(){
  homePage.classList.add("hide");
  tapeSearchPageBlank.classList.remove("hide");
  body.classList.remove("body");
}

searchByStat.addEventListener("click", launchStatSearchPage);

searchByFighter.addEventListener("click", launchFighterSearchPage);

totT.addEventListener("click", taleOfTheTape);




var aboutPage = document.getElementById("aboutPage");

aboutButton.addEventListener("click", aboutFunction);

function aboutFunction(){
  homePage.classList.add("hide");
  aboutPage.classList.remove("hide");
  body.classList.remove("body");
}

var contactPage = document.getElementById("contactPage");

contactButton.addEventListener("click", contactFunction);

function contactFunction(){
  homePage.classList.add("hide");
  contactPage.classList.remove("hide");
  body.classList.remove("body");
}

var loginPage = document.getElementById("loginPage");

loginButton.addEventListener("click", loginFunction);

function loginFunction(){
  homePage.classList.add("hide");
  loginPage.classList.remove("hide");
  body.classList.remove("body");
}
