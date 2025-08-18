const API_KEY = "faede2ad3a8e1a01b31d264a69f12483"

function getWeatherUrl(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

function getIconUrl(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = getWeatherUrl(lat, lon);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather");
            const city = document.querySelector("#city");
            const weatherIcon = document.querySelector("#weather-icon");
            const weatherDescription = document.querySelector("#weather-description");

            weatherIcon.src = getIconUrl(data.weather[0].icon);
            weatherIcon.alt = data.weather[0].description;

            city.innerText = data.name;
            weatherDescription.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;

            weatherIcon.style.display = "inline-block";
            weatherIcon.style.width = "50px";
            weatherIcon.style.height = "50px";
            weatherIcon.style.marginRight = "10px";
            weatherIcon.style.verticalAlign = "middle";
            weatherIcon.style.display = "inline";
            weatherIcon.style.marginLeft = "10px";
            weatherIcon.style.marginTop = "5px";
            weatherIcon.style.marginBottom = "5px";
            weatherIcon.style.borderRadius = "50%";
            weatherIcon.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
            weatherIcon.style.transition = "transform 0.3s ease";
            weatherIcon.addEventListener("mouseover", () => {
                weatherIcon.style.transform = "scale(1.1)";
            });
            weatherIcon.addEventListener("mouseout", () => {
                weatherIcon.style.transform = "scale(1)";
            });

            weather.classList.remove(HIDDEN_CLASSNAME);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Unable to retrieve weather data. Please try again later.");
        });
}
function error() {
    alert("Unable to retrieve your location");
}

navigator.geolocation.getCurrentPosition(success, error);