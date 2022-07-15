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
let time = document.querySelector('#time');
time.textContent = moment().format('h:mm a');
let today = document.querySelector('#today');
today.textContent = moment().format('MMM D');
let tomorrow = document.querySelector('#date_1');
tomorrow.textContent = moment().add(1, 'days').format('dddd');
let tomorrow2 = document.querySelector('#date_2');
tomorrow2.textContent = moment().add(2, 'days').format('dddd');
let tomorrow3 = document.querySelector('#date_3');
tomorrow3.textContent = moment().add(3, 'days').format('dddd');
let tomorrow4 = document.querySelector('#date_4');
tomorrow4.textContent = moment().add(4, 'days').format('dddd');
let tomorrow5 = document.querySelector('#date_5');
tomorrow5.textContent = moment().add(5, 'days').format('dddd');


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
                let cityName = document.querySelector('#city-name');
                cityName.textContent = data.name;

                let icon = document.querySelector('#current-icon');
                let iconCall = data.weather[0].icon;
                icon.setAttribute('src', 'http://openweathermap.org/img/wn/' +iconCall+ '.png');

                let temp = document.querySelector('#current-temp');
                temp.innerHTML = Math.round(data.main.temp) + `&#186;`;

                let description = document.querySelector('#desc');
                description.textContent = data.weather[0].main;

                let humidity = document.querySelector('#current-humid');
                humidity.innerHTML = 'Humidity:  ' + data.main.humidity + `&nbsp;&#37;`;

                let windSpeed = document.querySelector('#current_wind');
                windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';

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

                // Render icons for each day in forecast
                // Note: Must use <img> tag in html to use .setAttribute method to set the img src
                let icon1 = document.querySelector('#icon1');
                let icon1Call = data.daily[1].weather[0].icon;
                icon1.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon1Call+ '@2x.png');

                let icon2 = document.querySelector('#icon2');
                let icon2Call = data.daily[2].weather[0].icon;
                icon2.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon2Call+ '@2x.png');

                let icon3 = document.querySelector('#icon3');
                let icon3Call = data.daily[3].weather[0].icon;
                icon3.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon3Call+ '@2x.png');

                let icon4 = document.querySelector('#icon4');
                let icon4Call = data.daily[4].weather[0].icon;
                icon4.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon4Call+ '@2x.png');

                let icon5 = document.querySelector('#icon5');
                let icon5Call = data.daily[5].weather[0].icon;
                icon5.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon5Call+ '@2x.png');


                //description forecast
                //TODO: for loop
                let desc1 = document.querySelector('#desc_1');
                desc1.innerHTML = (data.daily[1].weather[0].main);
                let desc2 = document.querySelector('#desc_2');
                desc2.innerHTML = (data.daily[2].weather[0].main);
                let desc3 = document.querySelector('#desc_3');
                desc3.innerHTML = (data.daily[3].weather[0].main);
                let desc4 = document.querySelector('#desc_4');
                desc4.innerHTML = (data.daily[4].weather[0].main);
                let desc5 = document.querySelector('#desc_5');
                desc5.innerHTML = (data.daily[5].weather[0].main);

                //temp forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                let temp1 = document.querySelector('#temp_1');
                temp1.innerHTML = Math.round(data.daily[1].temp.day) + `&#186;`;
                let temp2 = document.querySelector('#temp_2');
                temp2.innerHTML = Math.round(data.daily[2].temp.day) + `&#186;`;
                let temp3 = document.querySelector('#temp_3');
                temp3.innerHTML = Math.round(data.daily[3].temp.day) + `&#186;`;
                let temp4 = document.querySelector('#temp_4');
                temp4.innerHTML = Math.round(data.daily[4].temp.day) + `&#186;`;
                let temp5 = document.querySelector('#temp_5');
                temp5.innerHTML = Math.round(data.daily[5].temp.day) + `&#186;`;

                //humidity forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                let humid1 = document.querySelector('#humid_1');
                humid1.innerHTML = (data.daily[1].humidity) + `&#37;`;
                let humid2 = document.querySelector('#humid_2');
                humid2.innerHTML = (data.daily[2].humidity) + `&#37;`;
                let humid3 = document.querySelector('#humid_3');
                humid3.innerHTML = (data.daily[3].humidity) + `&#37;`;
                let humid4 = document.querySelector('#humid_4');
                humid4.innerHTML = (data.daily[4].humidity) + `&#37;`;
                let humid5 = document.querySelector('#humid_5');
                humid5.innerHTML = (data.daily[5].humidity) + `&#37;`;

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
