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

var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');

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

function hideContactAndLoginTabs(){
  contactPage.classList.add("hide");
  loginPage.classList.add("hide");
  statSearchPageBlank.classList.add("hide");
  fightSearchPageBlank.classList.add("hide");
  tapeSearchPageBlank.classList.add("hide");
}
function hideAboutAndLoginTabs(){
  aboutPage.classList.add("hide");
  loginPage.classList.add("hide");
  statSearchPageBlank.classList.add("hide");
  fightSearchPageBlank.classList.add("hide");
  tapeSearchPageBlank.classList.add("hide");
}
function hideAboutAndContactTabs(){
  aboutPage.classList.add("hide");
  contactPage.classList.add("hide");
  statSearchPageBlank.classList.add("hide");
  fightSearchPageBlank.classList.add("hide");
  tapeSearchPageBlank.classList.add("hide");
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
  hideContactAndLoginTabs();
  aboutPage.classList.remove("hide");
}

var contactPage = document.getElementById("contactPage");

contactButton.addEventListener("click", contactFunction);

function contactFunction(){
  hidePages();
  hideAboutAndLoginTabs();
  contactPage.classList.remove("hide");
}

var loginPage = document.getElementById("loginPage");

loginButton.addEventListener("click", loginFunction);

function loginFunction(){
  hidePages();
  hideAboutAndContactTabs();
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



function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://api.sportsdata.io/v3/mma/scores/json/Fighters?key=0244b7bf67b24f55bfd4ae6352ebda4e';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data[i].FirstName + " " + data[i].LastName;
        link.href = data[i].ShortName;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}

fetchButton.addEventListener('click', getApi);


