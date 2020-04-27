var CORONA_STAT_ENDPOINT = "https://api.covid19api.com/summary"

fetch(CORONA_STAT_ENDPOINT)
    .then((response) => response.json())
    .then((stats) => {
        document.getElementById("numCases").innerText = stats["Global"]["TotalConfirmed"]
        document.getElementById("numDeaths").innerText = stats["Global"]["TotalDeaths"]
        document.getElementById("numRecovered").innerText = stats["Global"]["TotalRecovered"]
    })