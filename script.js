var CORONA_STAT_ENDPOINT = "https://api.covid19api.com/summary"


// fetch(CORONA_STAT_ENDPOINT)
//     .then((response) => response.json())
//     .then((stats) => {
//         document.getElementById("totalCases").innerText = stats["Global"]["TotalConfirmed"]
//         document.getElementById("totalDeaths").innerText = stats["Global"]["TotalDeaths"]
//         document.getElementById("totalRecovered").innerText = stats["Global"]["TotalRecovered"]
//     })

async function coronaStats() {
    let response = await fetch(CORONA_STAT_ENDPOINT);
    let stats = await response.json();
    return stats;
}

function filterValue(obj, key, value) {
    return obj.find(function(v) { return v[key] === value });
}

function getData() {
    coronaStats().
    then(coronaStats => {
        globalStats = coronaStats["Global"];
        countriesStats = coronaStats["Countries"]
        date = coronaStats["Date"]


        document.getElementById("numCases").innerText = globalStats["TotalConfirmed"]
        document.getElementById("numDeaths").innerText = globalStats["TotalDeaths"]
        document.getElementById("numRecovered").innerText = globalStats["TotalRecovered"]

        // get the country value from the storage API
        var country = "India"
            // get the stats for the country from countryStats
        var countryStats = filterValue(countriesStats, "Country", country)
        console.log(countryStats)
        document.getElementById("countryCaseCount").innerText = countryStats["TotalConfirmed"]
        document.getElementById("countryDeathCount").innerText = countryStats["TotalDeaths"]
        document.getElementById("countryRecCount").innerText = countryStats["TotalRecovered"]

        document.getElementById("updatetime").innerText = date

    });
}

getData()