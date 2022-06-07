//PAGE LOAD//
//*** GET SAVED ITEMS FROM LOCAL STORAGE ***//
// let savedSearchArray = JSON.parse(localStorage.getItem('savedSearchArray'));

// if (!savedSearchArray) {
let savedSearchArray =
    ['Columbus',
        'Bend',
        'Los Angeles',
        'San Francisco',
        'Savannah',
        'New York'];


// Define Global Date Variables
// Moment.js
let today = document.querySelector('#today');
today.textContent = moment().format('ll');
let tomorrow = document.querySelector('#date_1');
tomorrow.textContent = moment().add(1, 'days').format('l');
let tomorrow2 = document.querySelector('#date_2');
tomorrow2.textContent = moment().add(2, 'days').format('l');
let tomorrow3 = document.querySelector('#date_3');
tomorrow3.textContent = moment().add(3, 'days').format('l');
let tomorrow4 = document.querySelector('#date_4');
tomorrow4.textContent = moment().add(4, 'days').format('l');
let tomorrow5 = document.querySelector('#date_5');
tomorrow5.textContent = moment().add(5, 'days').format('l');


// Define variables for getCurrent function
const searchBtnEl = document.querySelector('#search-btn');
let searchInputEl = document.querySelector('#search-input');

// Define getCurrent function to access current weather conditions
function getCurrent(searchInputEl) {

    // Current Weather Data API call
    let currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputEl + '&units=imperial&appid=c6a9bf78cf3b504fe7e8382ca53765c4';

    fetch(currentWeatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                // Append data from API to DOM
                let cityName = document.querySelector('#city_name');
                cityName.textContent = data.name;

                //icon not working
                let icon = document.querySelector('#current-icon');
                let iconCall = data.weather[0].icon;
                icon.setAttribute('src', 'http://openweathermap.org/img/wn/' +iconCall+ '.png');

                let temp = document.querySelector('#current_temp');
                temp.textContent = 'Temperature: ' + data.main.temp;

                let humidity = document.querySelector('#current_humid');
                humidity.textContent = 'Humidity:  ' + data.main.humidity;

                let windSpeed = document.querySelector('#current_wind');
                windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';

                //testing
                console.log(data.weather[0].icon);

                //call function to render 5 day forecast in this function for access to latitude and longitude from city search in current weather function
                getForecast(data.coord.lat, data.coord.lon);

                //access uv index from onecall used for 5 day forecast
            })
        }
    })
};

//define function to get 5 day forecast //access lat and lon from previous function
//use one call API instead of 5 day forecast //better accessibility to needed information
function getForecast(latitude, longitude) {
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=hourly,minutely&appid=c6a9bf78cf3b504fe7e8382ca53765c4';

    fetch(forecastUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                //append uv data to current conditions div
                let uvIndex = document.querySelector('#current_uv');
                uvIndex.textContent = 'UV Index: ' + data.current.uvi;

                // let icon = document.querySelector('#current_icon');
                // icon.textContent = data.weather.icon;

                //temp forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                let temp1 = document.querySelector('#temp_1');
                temp1.textContent = data.daily[1].temp.day;
                let temp2 = document.querySelector('#temp_2');
                temp2.textContent = data.daily[2].temp.day;
                let temp3 = document.querySelector('#temp_3');
                temp3.textContent = data.daily[3].temp.day;
                let temp4 = document.querySelector('#temp_4');
                temp4.textContent = data.daily[4].temp.day;
                let temp5 = document.querySelector('#temp_5');
                temp5.textContent = data.daily[5].temp.day;


                //humidity forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                let humid1 = document.querySelector('#humid_1');
                humid1.textContent = data.daily[1].humidity;
                let humid2 = document.querySelector('#humid_2');
                humid2.textContent = data.daily[2].humidity;
                let humid3 = document.querySelector('#humid_3');
                humid3.textContent = data.daily[3].humidity;
                let humid4 = document.querySelector('#humid_4');
                humid4.textContent = data.daily[4].humidity;
                let humid5 = document.querySelector('#humid_5');
                humid5.textContent = data.daily[5].humidity;

            })
        }
    })
};


//select each search history list item
let searchHistCon = document.querySelector('#search-history-list')
let searchedItemEl = searchHistCon.querySelectorAll('li.search-history-item');

console.log(searchedItemEl);

//define function to render search history
function renderSearchHistory() {
    //clear previous selection before appending

    for (i = 0; i < savedSearchArray.length; i++) {

        let newSearchedItem = document.createElement('li');
        newSearchedItem.classList.add('search-history-item');
        newSearchedItem.textContent = savedSearchArray[i];

        newSearchedItem.addEventListener('click', function (event) {
            let newUserInput = event.target.innerText;
            getCurrent(newUserInput);

        })

        searchHistCon.appendChild(newSearchedItem)
    }
}

getCurrent('Columbus');
renderSearchHistory(savedSearchArray);

//add event listener to search button
searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();

    //use event to access user input
    console.log(event);
    let userInput= searchInputEl.value;

    getCurrent(userInput);

    //call function to render search history within this function for access to needed variables
    savedSearchArray.push(userInput);

    renderSearchHistory();
});

//To Do - store search history in local storage

//if statement to evaluate - if there is a value in search history
    // then loop through the savedTasksArray and push the value onto the array if the labeled time on timeblock matches the time value in the savedTasksArray
    // let contains = function(userInput) {

    //     let findNaN = userInput !== userInput;
    //     let indexOf;

    //     if (!findNaN && typeof Array.prototype.indexOf === 'function') {
    //         indexOf = Array.prototype.indexOf;
    //     } else {
    //         indexOf = function (userInput) {
    //             let i = -1, index = -1;

    //             for (i = 0; i < this.length; i++) {
    //                 let newSearch = this[i];

    //                 if ((findNaN && newSearch !== newSearch) || newSearch === userInput) {
    //                     index = i;

    //                 }
    //             }
    //         };
    //     }
    // }
