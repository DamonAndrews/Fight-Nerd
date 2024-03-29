$(document).ready(function () {
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
  var fighterFetchButton = $('#searchFighters');
  var statButton = $('#searchStats');
  
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
    result.html("Please wait...");
  
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
          result.html(json.message);
          result.removeClass("text-gray-500");
          result.addClass("text-green-500");
        } else {
          console.log(response);
          result.html(json.message);
          result.removeClass("text-gray-500");
          result.addClass("text-red-500");
        }
      })
      .catch((error) => {
        console.log(error);
        result.html("Something went wrong!");
      })
      .then(function () {
        form[0].reset();
        setTimeout(() => {
          result.hide();
        }, 5000);
      });
  });
  
  function getAllFighters() {
    var requestUrl = 'http://localhost:3000/api/fighter';
  
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
          var createTableRow = $('<tr>');
          var nameTableData = $('<td>'); // For the fighter's name and wins
  
          var nameWinsDiv = $('<div>');
          var fighterNameButton = $('<a>');
          var winsSpan = $('<span>');
  
          fighterNameButton.text(data[i].First_Name + ' ' + data[i].Last_Name);
          winsSpan.text('Wins: ' + data[i].Wins);
  
          fighterNameButton.attr('href', 'http://localhost:3000/api/fighter/' + data[i].FighterId);
          fighterNameButton.addClass('btn btn-black');
  
          // Step 2: Add the wins value to the card
          winsSpan.addClass('wins-span');
  
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
      });
  }
  
  statButton.on('click', getAllStats);
  fighterFetchButton.on('click', getAllFighters);
  
  searchByStat.on("click", launchStatSearchPage);
  searchByFighter.on("click", launchFighterSearchPage);
  totT.on("click", taleOfTheTape);
  contactButton.on("click", contactFunction);
  loginButton.on("click", loginFunction);
});
