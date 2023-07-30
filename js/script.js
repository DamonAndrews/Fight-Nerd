var homePage = $("#homePage");
var body = $("#body");
var buttons = $("#buttons");
var sticky = buttons.offsetTop;
// SEARCH BUTTONS ON CARDS IN CENTER OF PAGE
var searchByStat = $("#searchByStat");
var searchByFighter = $("#searchByFighter");
var totT = $("#taleOfTheTape");

var statSearchPageBlank = $("#statSearchPageBlank");
var fightSearchPageBlank = $("#fightSearchPageBlank");
var tapeSearchPageBlank = $("#tapeSearchPageBlank");

var fighterTableBody = $('#fighter-table');
var statTableBody = $('#stat-table');
var fetchButton = $('#fighterFetchButton');
var statFetchButton = $('#statFetchButton');

var contactPage = $("#contactPage");
var contactButton = $("#contactButton");

var loginPage = $("#loginPage");
var loginButton = $("#loginButton");

const form = $("#form");
const result = $("#result");

function myFunction() {
  if (window.pageYOffset >= sticky) {
    buttons.addClass("sticky")
  } else {
    buttons.removeClass("sticky");
  }
}
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};
function hideAllPagesExcept(targetPage) {
  const pages = [
    homePage,
    contactPage,
    loginPage,
    statSearchPageBlank,
    fightSearchPageBlank,
    tapeSearchPageBlank,
  ];

  pages.forEach((page) => {
    if (page !== targetPage) {
      page.addClass("hide");
    } else {
      page.removeClass("hide");
    }
  });
}

function launchStatSearchPage() {
  hideAllPagesExcept(statSearchPageBlank);
}

function launchFighterSearchPage() {
  hideAllPagesExcept(fightSearchPageBlank);
}

function taleOfTheTape() {
  hideAllPagesExcept(tapeSearchPageBlank);
}

function contactFunction() {
  hideAllPagesExcept(contactPage);
}

function loginFunction() {
  hideAllPagesExcept(loginPage);
}
form.on("submit", function (e) {
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


function getAllFighters() {
  var requestUrl = 'http://localhost:3000/api/fighters';

  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      // Step 1: Sort the data array by wins in descending order
      data.sort(function (a, b) {
        return b.Wins - a.Wins;
      });

      for (var i = 0; i < data.length; i++) {
        var createTableRow = document.createElement('tr');
        var nameTableData = document.createElement('td'); // For the fighter's name and wins

        var nameWinsDiv = document.createElement('div');
        var fighterNameButton = document.createElement('a');
        var winsSpan = document.createElement('span');

        fighterNameButton.textContent = data[i].FirstName + ' ' + data[i].LastName + ' ' + data[i].Wins;

        fighterNameButton.href = 'http://localhost:3000/api/fighters/' + data[i].FighterId;
        fighterNameButton.setAttribute('class', 'btn btn-black');

        // Step 2: Add the wins value to the card
        
        winsSpan.setAttribute('class', 'wins-span');

        nameWinsDiv.append(fighterNameButton);
        nameWinsDiv.append(winsSpan);

        nameTableData.append(nameWinsDiv);

        createTableRow.append(nameTableData);

        fighterTableBody.append(createTableRow);
      }
    })
    .catch(function (error) {
      console.error('Error fetching data:', error);
    });
}


   
 
  

  function getAllStats() {
 

   // fetch request gets a list of all the repos for the node.js organization
   var requestUrl = 'https://api.sportsdata.io/v3/mma/scores/json/Fighters?key=0244b7bf67b24f55bfd4ae6352ebda4e';

   fetch(requestUrl)
     .then(function (response) {
       return response.json(); 
     })
     .then(function (data) {
       
 
       for (var i = 0; i < data.length; i++) {
         
         var createTableRow = document.createElement('tr');
         var tableData = document.createElement('td');
         var nameDiv = document.createElement('div');
         var fighterNameButton = document.createElement('a');
         
         fighterNameButton.textContent = data[i].FirstName + " " + data[i].LastName;
 
 fighterNameButton.href = "https://api.sportsdata.io/v3/mma/scores/json/Fighter/" + data[i].FighterId + "?key=0244b7bf67b24f55bfd4ae6352ebda4e";
 fighterNameButton.setAttribute("class","btn btn-black")
 nameDiv.append(fighterNameButton);
 tableData.append(nameDiv);
 createTableRow.append(tableData);
 statTableBody.append(createTableRow);
         
       }
     })
   }

statFetchButton.on('click', getAllStats);

fetchButton.on('click', getAllFighters);

searchByStat.on("click", launchStatSearchPage);

searchByFighter.on("click", launchFighterSearchPage);

totT.on("click", taleOfTheTape);

contactButton.on("click", contactFunction);

loginButton.on("click", loginFunction);

