// DECLARE GLOBAL
const searchBtnEl = document.querySelector('#search_btn');
let cityInput = document.querySelector('#search_input');
let cityList = [];


// arrays to organize locally stored data
//use to populate current forecast from search history
const currentForecast = [{
    temp: '',
    humidity: ['', '%'],
    wind: ['', 'mph'],
    uv: ''
}];

//use to populate 5 day forecast from search history
const weekForecast = [{
    date: '',
    icon: '',
    temp: '',
    humidity: '',
}];

//To Do - render search history from local storage on page load

//define function to access current weather conditions
function getCurrent(cityInput) {

    let currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=8d9ace3ef89c0fbba0cc95223e221079';

    fetch(currentWeatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                //append data from API to DOM
                let tempResult = document.createElement('p');
                let temperature = document.querySelector('#current_temp').appendChild(tempResult);

                //testing
                console.log(data.name);
                console.log(data.main.humidity);

                //call function to render 5 day forecast in this function for access to latitude and longitude from city search in current weather function
                getForecast(data.coord.lat, data.coord.lon);

            })
        }
    })
};

//define function to get 5 day forecast //access lat and lon from previous function
//use one call API instead of 5 day forecast //better accessibility to needed information
function getForecast(latitude, longitude) {
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=hourly,minutely&appid=8d9ace3ef89c0fbba0cc95223e221079';

    fetch(forecastUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                // let tempResult = document.createElement('p');
                // let temperature = document.querySelector('#current_temp').appendChild(tempResult);

                let uvIndex = document.querySelector('#current_uv_index');
                uvIndex.textContent = 'UV Index: ' + data.current.uvi;

            })
        }
    })
};

//define function to render search history
function printCityList() {
    //To Do - clear previous selection before appending
    for (i = 0; i < cityList.length; i++) {

        let searchHistoryEl = document.createElement('div');
        searchHistoryEl.classList.add('search_history');
        searchHistoryEl.textContent = cityList[i];

        searchHistoryEl.addEventListener('click', function (event) {
            let userInput = event.target.innerText;
            getCurrent(userInput);

        })

        document.querySelector('.search_history_container').appendChild(searchHistoryEl)
    }
}

//add event listener to search button
searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();

    //use event to access user input
    console.log(event);
    let userInput = cityInput.value;
    getCurrent(userInput);

    //call function to render search history within this function for access to needed variables
    cityList.push(userInput);
    printCityList();
});

//To Do - store search history in local storage
