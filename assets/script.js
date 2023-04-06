//PAGE LOAD//
//*** GET SAVED ITEMS FROM LOCAL STORAGE ***//
let savedSearchArray = JSON.parse(localStorage.getItem('savedSearchArray'));

if (!savedSearchArray) {
    savedSearchArray = [
        'Columbus',
        'Bend',
        'Los Angeles',
        'San Francisco',
        'Savannah',
        'New York',
        'Nashville'
    ];
}

// Define Global Date Variables
// Moment.js
let time = document.querySelector('#time');
time.textContent = moment().format('h:mm a');
let today = document.querySelector('#today');
today.textContent = moment().format('MMM D');

let tomorrow = document.querySelector('#date_1');
tomorrow.textContent = moment().add(1, 'days').format('ddd');
let tomorrow2 = document.querySelector('#date_2');
tomorrow2.textContent = moment().add(2, 'days').format('ddd');
let tomorrow3 = document.querySelector('#date_3');
tomorrow3.textContent = moment().add(3, 'days').format('ddd');
let tomorrow4 = document.querySelector('#date_4');
tomorrow4.textContent = moment().add(4, 'days').format('ddd');
let tomorrow5 = document.querySelector('#date_5');
tomorrow5.textContent = moment().add(5, 'days').format('ddd');


// Define variables for getCurrent function
const searchBtnEl = document.querySelector('#search-btn');
const searchInputEl = document.querySelector('#search-input');

// Define getCurrent function to access current weather conditions
function getCurrent(searchInputEl) {

    // Current Weather Data API call
    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputEl + '&units=imperial&appid=c6a9bf78cf3b504fe7e8382ca53765c4';

    fetch(currentWeatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                // Append data from API to DOM
                const cityName = document.querySelector('#city-name');
                cityName.textContent = data.name;

                const icon = document.querySelector('#current-icon');
                const iconCall = data.weather[0].icon;
                icon.setAttribute('src', 'http://openweathermap.org/img/wn/' +iconCall+ '.png');

                const temp = document.querySelector('#current-temp');
                temp.innerHTML = Math.round(data.main.temp) + `&#186;`;

                const description = document.querySelector('#desc');
                description.textContent = data.weather[0].main;

                const humidity = document.querySelector('#current-humid');
                humidity.innerHTML = 'Humidity:  ' + data.main.humidity + `&nbsp;&#37;`;

                const windSpeed = document.querySelector('#current_wind');
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
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=hourly,minutely&appid=c6a9bf78cf3b504fe7e8382ca53765c4';

    fetch(forecastUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                //append uv data to current conditions div
                const uvIndex = document.querySelector('#current_uv');
                uvIndex.textContent = 'UV Index: ' + data.current.uvi;

                // Render icons for each day in forecast
                // Note: Must use <img> tag in html to use .setAttribute method to set the img src
                const icon1 = document.querySelector('#icon1');
                const icon1Call = data.daily[1].weather[0].icon;
                icon1.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon1Call+ '@2x.png');

                const icon2 = document.querySelector('#icon2');
                const icon2Call = data.daily[2].weather[0].icon;
                icon2.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon2Call+ '@2x.png');

                const icon3 = document.querySelector('#icon3');
                const icon3Call = data.daily[3].weather[0].icon;
                icon3.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon3Call+ '@2x.png');

                const icon4 = document.querySelector('#icon4');
                const icon4Call = data.daily[4].weather[0].icon;
                icon4.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon4Call+ '@2x.png');

                const icon5 = document.querySelector('#icon5');
                const icon5Call = data.daily[5].weather[0].icon;
                icon5.setAttribute('src', 'http://openweathermap.org/img/wn/' +icon5Call+ '@2x.png');


                //description forecast
                //TODO: for loop
                const desc1 = document.querySelector('#desc_1');
                desc1.innerHTML = (data.daily[1].weather[0].main);
                const desc2 = document.querySelector('#desc_2');
                desc2.innerHTML = (data.daily[2].weather[0].main);
                const desc3 = document.querySelector('#desc_3');
                desc3.innerHTML = (data.daily[3].weather[0].main);
                const desc4 = document.querySelector('#desc_4');
                desc4.innerHTML = (data.daily[4].weather[0].main);
                const desc5 = document.querySelector('#desc_5');
                desc5.innerHTML = (data.daily[5].weather[0].main);

                //temp forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                const temp1 = document.querySelector('#temp_1');
                temp1.innerHTML = Math.round(data.daily[1].temp.day) + `&#186;`;
                const temp2 = document.querySelector('#temp_2');
                temp2.innerHTML = Math.round(data.daily[2].temp.day) + `&#186;`;
                const temp3 = document.querySelector('#temp_3');
                temp3.innerHTML = Math.round(data.daily[3].temp.day) + `&#186;`;
                const temp4 = document.querySelector('#temp_4');
                temp4.innerHTML = Math.round(data.daily[4].temp.day) + `&#186;`;
                const temp5 = document.querySelector('#temp_5');
                temp5.innerHTML = Math.round(data.daily[5].temp.day) + `&#186;`;

                //humidity forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                const humid1 = document.querySelector('#humid_1');
                humid1.innerHTML = (data.daily[1].humidity) + `&#37;`;
                const humid2 = document.querySelector('#humid_2');
                humid2.innerHTML = (data.daily[2].humidity) + `&#37;`;
                const humid3 = document.querySelector('#humid_3');
                humid3.innerHTML = (data.daily[3].humidity) + `&#37;`;
                const humid4 = document.querySelector('#humid_4');
                humid4.innerHTML = (data.daily[4].humidity) + `&#37;`;
                const humid5 = document.querySelector('#humid_5');
                humid5.innerHTML = (data.daily[5].humidity) + `&#37;`;

            })
        }
    })
};


//select each search history list item
const searchHistCon = document.querySelector('#search-history-list')
const searchedItemEl = searchHistCon.querySelectorAll('li.search-history-item');

console.log(searchedItemEl);

//define function to render search history
function renderSearchHistory() {
    //clear previous selection before appending

    for (i = 0; i < savedSearchArray.length; i++) {

        const newSearchedItem = document.createElement('li');
        newSearchedItem.classList.add('search-history-item');
        newSearchedItem.textContent = savedSearchArray[i];

        newSearchedItem.addEventListener('click', function (event) {
            let newUserInput = event.target.innerText;
            getCurrent(newUserInput);

        })

        if (newSearchedItem.textContent !== "") {
            searchHistCon.prepend(newSearchedItem);
        }


    }
}

//add event listener to search button
searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();

    //use event to access user input
    console.log(event);
    let userInput= searchInputEl.value;

    getCurrent(userInput);

    //TODO: if statement to check edge cases of misspelled cities, etc


    savedSearchArray.push(userInput);
    //call function to render search history within this function for access to needed variables
    renderSearchHistory();

    localStorage.setItem('savedSearchArray', JSON.stringify(savedSearchArray));
});


const searchHistoryMenuLi = document.querySelector('#search-hist-menu-li');

searchHistoryMenuLi.addEventListener('click', renderSearchHistory());

getCurrent('Columbus');
