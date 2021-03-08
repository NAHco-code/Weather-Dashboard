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

//dates
let today = document.querySelector('#today');
today.textContent = moment().format('ll');
let tomorrow = document.querySelector('#date_1');
tomorrow.textContent = moment().add(1, 'days').format('ll');
let tomorrow2 = document.querySelector('#date_2');
tomorrow2.textContent = moment().add(2, 'days').format('ll');
let tomorrow3 = document.querySelector('#date_3');
tomorrow3.textContent = moment().add(3, 'days').format('ll');
let tomorrow4 = document.querySelector('#date_4');
tomorrow4.textContent = moment().add(4, 'days').format('ll');
let tomorrow5 = document.querySelector('#date_5');
tomorrow5.textContent = moment().add(5, 'days').format('ll');


//define function to access current weather conditions
function getCurrent(cityInput) {

    let currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=8d9ace3ef89c0fbba0cc95223e221079';

    fetch(currentWeatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                console.log(data)

                //append data from API to DOM
                let cityName = document.querySelector('#city_name');
                cityName.textContent = data.name;

                // let icon = document.querySelector('#current_icon');
                // let iconCall = data.weather[0].icon;
                // icon.innerHTML = '<img src=`http://openweathermap.org/img/wn/`' +iconCall+ '.png id="current_icon" alt="weather icon"/>';

                let temp = document.querySelector('#current_temp');
                temp.textContent = 'Temperature: ' + data.main.temp + ' f';

                let humidity = document.querySelector('#current_humid');
                humidity.textContent = 'Humidity:  ' + data.main.humidity + '%';

                let windSpeed = document.querySelector('#current_wind');
                windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';

                //access uv index from onecall used for 5 day forecast

                //testing
                console.log(data.weather[0].icon);

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

                //append uv data to current conditions div
                let uvIndex = document.querySelector('#current_uv');
                uvIndex.textContent = 'UV Index: ' + data.current.uvi;

                // let icon = document.querySelector('#current_icon');
                // icon.textContent = data.weather.icon;

                //temp forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)

                let temp1 = document.querySelector('#temp_1');
                temp1.textContent = 'Temp: ' + data.daily[1].temp.day + ' f';
                let temp2 = document.querySelector('#temp_2');
                temp2.textContent = 'Temp: ' + data.daily[2].temp.day + ' f';
                let temp3 = document.querySelector('#temp_3');
                temp3.textContent = 'Temp: ' + data.daily[3].temp.day + ' f';
                let temp4 = document.querySelector('#temp_4');
                temp4.textContent = 'Temp: ' + data.daily[4].temp.day + ' f';
                let temp5 = document.querySelector('#temp_5');
                temp5.textContent = 'Temp: ' + data.daily[5].temp.day + ' f';


                //humidity forecast
                //TODO for loop
                // for (i = 0; i < forecast.length; i++)
                let humid1 = document.querySelector('#humid_1');
                humid1.textContent = 'Humidity: ' + data.daily[1].humidity + '%';
                let humid2 = document.querySelector('#humid_2');
                humid2.textContent = 'Humidity: ' + data.daily[2].humidity + '%';
                let humid3 = document.querySelector('#humid_3');
                humid3.textContent = 'Humidity: ' + data.daily[3].humidity + '%';
                let humid4 = document.querySelector('#humid_4');
                humid4.textContent = 'Humidity: ' + data.daily[4].humidity + '%';
                let humid5 = document.querySelector('#humid_5');
                humid5.textContent = 'Humidity: ' + data.daily[5].humidity + '%';

            })
        }
    })
};

//define function to render search history
function printCityList() {
    //clear previous selection before appending

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
