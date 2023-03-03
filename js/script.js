var homePage = document.querySelector("#homePage");
var body = document.querySelector(".body");
var buttons = document.querySelector(".buttons");
var sticky = buttons.offsetTop;

// SEARCH BUTTONS ON CARDS IN CENTER OF PAGE
var searchByStatButton = document.getElementById("searchByStatButton");
var searchByFighterButton = document.getElementById("searchByFighterButton");
var taleOfTheTapeButton = document.getElementById("taleOfTheTapeButton");

var statSearchPageBlank = document.getElementById("statSearchPageBlank");
var searchButtonInBanner = document.getElementById("searchButtonInBanner");

var fightSearchPageBlank = document.getElementById("fightSearchPageBlank");
var fighterButtonInBanner = document.getElementById("fighterButtonInBanner");

var tapeSearchPageBlank = document.getElementById("tapeSearchPageBlank");
var tapeButtonInBanner = document.getElementById("tapeButtonInBanner");

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

function myFunction() {
  if (window.pageYOffset >= sticky) {
    buttons.classList.add("sticky")
  } else {
    buttons.classList.remove("sticky");
  }
}
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

searchByStatButton.addEventListener("click", launchStatSearchPage);
searchButtonInBanner.addEventListener("click", launchStatSearchPageByBannerButton);

searchByFighterButton.addEventListener("click", launchFighterSearchPage);
fighterButtonInBanner.addEventListener("click", launchFighterSearchPage);

taleOfTheTapeButton.addEventListener("click", taleOfTheTape);

tapeButtonInBanner.addEventListener("click", taleOfTheTape);
