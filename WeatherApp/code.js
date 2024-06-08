let cityNameElem = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let w_sunrise = document.querySelector(".weather_sunrise");
let w_sunset = document.querySelector(".weather_sunset");

let citySearch = document.querySelector(".weather_search");

// to get the actual country name
const getCountryName = (code) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// to get the date and time
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(curDate);
};

// to format time from timestamp to 12-hour format
const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes.substr(-2)} ${ampm}`;
    return formattedTime;
};

//search functionality
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = document.querySelector('.location_input').value;
    getWeatherData(location);
    document.querySelector('.location_input').value = "";
});

const getWeatherData = async (location) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=48d7eb644b9695116787b90f329850cb`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        const { main, name, weather, wind, sys, dt } = data;

        cityNameElem.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

        w_temperature.innerHTML = `${main.temp.toFixed(1)}&#176;C`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;

        w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}&#176;C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${(wind.speed * 3.6).toFixed(1)} km/h`; // Convert m/s to km/h
        w_pressure.innerHTML = `${main.pressure} hPa`;
        w_sunrise.innerHTML = formatTime(sys.sunrise);
        w_sunset.innerHTML = formatTime(sys.sunset);

    } catch (error) {
        console.log(error);
    }
}

// Automatically load weather data for a default location
window.addEventListener('load', () => {
    getWeatherData('odisha,in');
});
