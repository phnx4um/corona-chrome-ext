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

function getData() {
    coronaStats().
    then(coronaStats => {
        globalStats = coronaStats["Global"];
        document.getElementById("numCases").innerText = globalStats["TotalConfirmed"]
        document.getElementById("numDeaths").innerText = globalStats["TotalDeaths"]
        document.getElementById("numRecovered").innerText = globalStats["TotalRecovered"]
    });
}

getData()