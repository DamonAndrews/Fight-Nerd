var homePage = document.querySelector("#homePage");
var body = document.querySelector(".body");
var buttons = document.querySelector(".buttons");
var sticky = buttons.offsetTop
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

function hidePages(){
  homePage.classList.add("hide");
  body.classList.remove("body");
}

function launchStatSearchPage(){
  hidePages();
  statSearchPageBlank.classList.remove("hide");
}
function launchFighterSearchPage() {
  hidePages();
    fightSearchPageBlank.classList.remove("hide");
}
function taleOfTheTape(){
  hidePages();
  tapeSearchPageBlank.classList.remove("hide");
}

searchByStat.addEventListener("click", launchStatSearchPage);

searchByFighter.addEventListener("click", launchFighterSearchPage);

totT.addEventListener("click", taleOfTheTape);


var aboutPage = document.getElementById("aboutPage");

aboutButton.addEventListener("click", aboutFunction);

function aboutFunction(){
  hidePages();
  aboutPage.classList.remove("hide");
}

var contactPage = document.getElementById("contactPage");

contactButton.addEventListener("click", contactFunction);

function contactFunction(){
  hidePages();
  contactPage.classList.remove("hide");
}

var loginPage = document.getElementById("loginPage");

loginButton.addEventListener("click", loginFunction);

function loginFunction(){
  hidePages();
  loginPage.classList.remove("hide");
}

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
