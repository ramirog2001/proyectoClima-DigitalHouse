const urlBase = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = ''
const diffKelvin = 273.15

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city){
        fetchWeather(city)
    }
    else{
        alert('Ingrese una ciudad')
    }
})

document.getElementById('cityInput').addEventListener("keypress", function(event){
    if(event.key == "Enter")
        document.getElementById('searchButton').click()
})

function fetchWeather(city){
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
        .then(data => data.json())
        .then(res => showWeatherData(res))
}

function showWeatherData(data){
    const divWeatherResponse = document.getElementById('weatherResponse')
    divWeatherResponse.innerHTML = ''

    const cityName = data.name
    const countryName = data.sys.country
    const temp = data.main.temp - diffKelvin
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon
        
    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `La temperatura es de ${Math.floor(temp)}ºC`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `La humedad es del ${humidity}%`

    const iconInfo = document.createElement('img')
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `La descripción meteorológica es: ${description}`

    divWeatherResponse.appendChild(cityInfo)
    divWeatherResponse.appendChild(tempInfo)
    divWeatherResponse.appendChild(humidityInfo)
    divWeatherResponse.appendChild(iconInfo)
    divWeatherResponse.appendChild(descriptionInfo)
}