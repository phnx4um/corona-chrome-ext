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

function filterValue(obj, key, value) {
    return obj.find(function(v) { return v[key].toLowerCase() === value.toLowerCase() });
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

function getCurrentCountryIndex() {
    let countryName = document.getElementById("countryName").innerText;
    console.log(countryName);
    let currentCountryIndex = countries.findIndex(item => countryName.toLowerCase() === item.toLowerCase());
    console.log(currentCountryIndex);
    return currentCountryIndex;
}

// callback function for next button
function getNextCountry() {
    let countryIndex;
    let nextCountryIndex

    //get current country index
    countryIndex = getCurrentCountryIndex()

    //  get index for next country 
    if (countryIndex === (countries.length - 1)) {
        // its the last element. set index to 1st element => 0
        nextCountryIndex = 0;
    } else {
        nextCountryIndex = countryIndex + 1;
    }
    getCountryStats(nextCountryIndex);
}

// callback function for prev button
function getPrevCountry() {
    let countryIndex;
    let prevCountryIndex;

    //get current country index
    countryIndex = getCurrentCountryIndex()

    //  get index for prev country 
    if (countryIndex === 0) {
        // its the first element. set index to last element => countries.length - 1
        prevCountryIndex = countries.length - 1;
    } else {
        prevCountryIndex = countryIndex - 1;
    }
    getCountryStats(prevCountryIndex);
}

// this is called when popup is opened
function getData() {
    coronaStats().
    then(coronaStats => {
            console.log(coronaStats)
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
            // TODO: add CHROME APIs Storage??? to save the your country preference
            let country = "India";
            // let country = document.getElementById("countryName").innerText;
            // get the stats for the country from countryStats
            let countryStats = filterValue(countriesStats, "Country", country);
            console.log(countryStats);
            populateCountryUI(countryStats);

        })
        .catch(function(e) {
            console.error(e.message); // "oh, no!"
        });
}

getData()