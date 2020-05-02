var CORONA_STAT_ENDPOINT = "https://api.covid19api.com/summary"

var countries = [
    "United Kingdom",
    "Spain",
    "Italy",
    "France",
    "United States Of America",
    "Germany",
    "Russian Federation",
    "Iran, Islamic Republic Of",
    "Brazil",
    "China",
    "Canada",
    "Netherlands",
    "India"
]

const nextCountryButton = document.getElementById("next")
nextCountryButton.addEventListener("click", getNextCountry);

const prevCountryButton = document.getElementById("prev")
prevCountryButton.addEventListener("click", getPrevCountry);

// API call
async function coronaStats() {
    let response = await fetch(CORONA_STAT_ENDPOINT);
    let stats = await response.json();
    console.log(response);
    return stats;
}

// utility functions
function capitalizeFirstLetter(string) {
    let words = string.toUpperCase().split(" ")
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0) + words[i].slice(1).toLowerCase()
    }
    return words.join(" ")
}

function filterValue(obj, key, value) {
    return obj.find(function(v) { return v[key] === value });
}


function populateCountryUI(countryStats) {
    document.getElementById("countryCaseCount").innerText = countryStats["TotalConfirmed"]
    document.getElementById("countryDeathCount").innerText = countryStats["TotalDeaths"]
    document.getElementById("countryRecCount").innerText = countryStats["TotalRecovered"]
}

function getCountryStats(countryIndex) {
    let country = countries[countryIndex]
    console.log(country)
    document.getElementById("countryName").innerText = country
    let countryStats = filterValue(countriesStats, "Country", country)
    console.log(countryStats)
    populateCountryUI(countryStats)
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
        countryIndex = 0
    } else {
        countryIndex = countryIndex + 1
    }
    getCountryStats(countryIndex)
}

// callback function for prev button
function getPrevCountry() {
    let countryName = document.getElementById("countryName").innerText;
    console.log(countryName);
    // get index of the element 
    let countryIndex = countries.indexOf(capitalizeFirstLetter(countryName))
    console.log(countryIndex);
    //  get index for next country 
    if (countryIndex === 0) {
        // its the first element. set index to last element => countries.length - 1
        countryIndex = countries.length - 1
    } else {
        countryIndex = countryIndex - 1
    }
    getCountryStats(countryIndex)
}

// this is called when popup is opened
function getData() {
    coronaStats().
    then(coronaStats => {
        let globalStats = coronaStats["Global"];
        countriesStats = coronaStats["Countries"];
        let date = coronaStats["Date"];

        //  global stats
        document.getElementById("numCases").innerText = globalStats["TotalConfirmed"]
        document.getElementById("numDeaths").innerText = globalStats["TotalDeaths"]
        document.getElementById("numRecovered").innerText = globalStats["TotalRecovered"]

        //date
        document.getElementById("updatetime").innerText = date

        //country stats
        let country = "India"
            // get the stats for the country from countryStats
        let countryStats = filterValue(countriesStats, "Country", country)
        console.log(countryStats)
        populateCountryUI(countryStats)

    });
}

getData()