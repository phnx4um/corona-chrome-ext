var CORONA_STAT_ENDPOINT = "https://api.covid19api.com/summary"

var countries = [
    "United Kingdom",
    "Spain",
    "Italy",
    "France",
    "United States of America",
    "Germany",
    "Russian Federation",
    "Iran, Islamic Republic of",
    "Brazil",
    "China",
    "Canada",
    "Netherlands",
    "India"
]

const nextCountryButton = document.getElementById("next");
nextCountryButton.addEventListener("click", getNextCountry);

const prevCountryButton = document.getElementById("prev");
prevCountryButton.addEventListener("click", getPrevCountry);

// API call
async function coronaStats() {
    let response = await fetch(CORONA_STAT_ENDPOINT);
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let stats = await response.json();
        console.log(response);
        // REMOVE LOADING SCREEN
        document.querySelector("body").style.backgroundImage = "none";
        // DISPLAY STATS
        document.getElementById("container").style.display = "grid";
        return stats;
    } else {
        // REMOVE LOADING SCREEN
        document.querySelector("body").style.backgroundImage = "none";
        console.log(response.status, response.text);
        err_container = document.getElementById("container");
        err_container.setAttribute("id", "err")
        err_container.innerHTML = "HTTP-ERROR: " + response.status + " TRY AGAIN"
    }
}

// utility functions
function capitalizeFirstLetter(string) {
    let lowercase_list = ["AND", "OF"];
    let words = string.toUpperCase().split(" ");
    for (var i = 0; i < words.length; i++) {
        if (lowercase_list.includes(words[i])) {
            words[i] = words[i].toLowerCase();
            continue;
        }
        words[i] = words[i].charAt(0) + words[i].slice(1).toLowerCase();
    }
    console.log(words.join(" "));
    return words.join(" ");
}

function filterValue(obj, key, value) {
    return obj.find(function(v) { return v[key] === value });
}


function populateCountryUI(countryStats) {
    document.getElementById("countryCaseCount").innerText = countryStats["TotalConfirmed"];
    document.getElementById("countryDeathCount").innerText = countryStats["TotalDeaths"];
    document.getElementById("countryRecCount").innerText = countryStats["TotalRecovered"];
}

function getCountryStats(countryIndex) {
    let country = countries[countryIndex];
    console.log(country);
    document.getElementById("countryName").innerText = country;
    let countryStats = filterValue(countriesStats, "Country", country);
    console.log(countryStats);
    populateCountryUI(countryStats);
}

// callback function for next button
function getNextCountry() {
    let countryName = document.getElementById("countryName").innerText;
    console.log(countryName);
    // get index of the element 
    let countryIndex = countries.indexOf(capitalizeFirstLetter(countryName))
    console.log(countryIndex);
    //  get index for next country 
    if (countryIndex === (countries.length - 1)) {
        // its the last element. set index to 1st element => 0
        countryIndex = 0;
    } else {
        countryIndex = countryIndex + 1;
    }
    getCountryStats(countryIndex);
}

// callback function for prev button
function getPrevCountry() {
    let countryName = document.getElementById("countryName").innerText;
    console.log(countryName);
    // get index of the element 
    let countryIndex = countries.indexOf(capitalizeFirstLetter(countryName));
    console.log(countryIndex);
    //  get index for next country 
    if (countryIndex === 0) {
        // its the first element. set index to last element => countries.length - 1
        countryIndex = countries.length - 1;
    } else {
        countryIndex = countryIndex - 1;
    }
    getCountryStats(countryIndex);
}

// this is called when popup is opened
function getData() {
    coronaStats().
    then(coronaStats => {
        print(coronaStats)
        let globalStats = coronaStats["Global"];
        countriesStats = coronaStats["Countries"];
        let date = coronaStats["Date"];

        //  global stats
        document.getElementById("numCases").innerText = globalStats["TotalConfirmed"];
        document.getElementById("numDeaths").innerText = globalStats["TotalDeaths"];
        document.getElementById("numRecovered").innerText = globalStats["TotalRecovered"];

        //date
        document.getElementById("updatetime").innerText = date;

        //country stats
        let country = "India";
        // let country = document.getElementById("countryName").innerText;
        // get the stats for the country from countryStats
        let countryStats = filterValue(countriesStats, "Country", country);
        console.log(countryStats);
        populateCountryUI(countryStats);

    });
}

getData()