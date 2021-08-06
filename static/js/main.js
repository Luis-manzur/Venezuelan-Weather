
const renderInitialTemplate = () => {
    const initialTemplate = document.getElementById('initial-template')
    document.getElementById('app').innerHTML = initialTemplate.innerHTML
    selectCity()
    

}

const selectCity = () => {
    const selectCity = document.getElementById('select-city')
    selectCity.onsubmit = (e) => {
        e.preventDefault()
        const selectedCity = document.getElementById('city-selected').value
        if (selectedCity != 'None') {
            renderWeatherInfoTemplate(selectedCity)
        } else {
            alert('Seleccione una ciudad')
        }
    }
}

const renderWeatherInfoTemplate = (selectedCity) => {
    document.getElementById('app').innerHTML = document.getElementById('loading-template').innerHTML

    fetch('https://venezuelan-weather.herokuapp.com/'+ selectedCity)
    .then(response => response.json())
    .then(data => {
        weatherNow = data
        readData(data, selectedCity)
        
        
    })
}

const readData = (data, selectedCity) => {
    const weatherInfoTemplate = document.getElementById('weather-info-template')
    document.getElementById('app').innerHTML = weatherInfoTemplate.innerHTML
    const cityName = document.getElementById('city-name')
    cityName.innerHTML = '<h2>'+selectedCity+'</h2>'
    const temperature = document.getElementById('temperature')
    dataTemperature = data['now_weather']['temperature']
    temperature.innerHTML = dataTemperature + ' Cº     '
    const feelsLike = document.getElementById('feels-like')
    dataFeelsLike = data['now_weather']['feels_like']
    feelsLike.innerHTML = 'Sensacion: '+dataFeelsLike + ' Cº'
    const maxTemp = document.getElementById('max-temp')
    const dataMaxTemp = data['now_weather']['max_temp']
    maxTemp.innerHTML = 'Temp Maxima: ' + dataMaxTemp + ' Cº'
    const minTemp = document.getElementById('min-temp')
    const dataMinTemp = data['now_weather']['min_temp']
    minTemp.innerHTML = 'Temp Minima: ' + dataMinTemp + ' Cº'
    const humidity = document.getElementById('humidity')
    const dataHumidity = data['now_weather']['humidity']
    humidity.innerHTML = 'Humedad: ' + dataHumidity + '%'
    const weatherDescription = document.getElementById('weather-description') 
    const dataWeatherDescription = data['now_weather']['weather_description']
    const selectedImg = setImage(dataWeatherDescription)
    console.log(selectedImg)
    document.getElementById('principal').src=selectedImg
    weatherDescription.innerHTML =  dataWeatherDescription
    const windSpeed = document.getElementById('wind-speed')
    const dataWindSpeed = data['now_weather']['wind_speed']
    windSpeed.innerHTML= 'Viento: ' + dataWindSpeed + ' m/h'

    selectCity()

    
}


const setImage = (dataWeatherDescription) => {
    if (dataWeatherDescription == 'drizzle') {
        let imgSrc = '../static/img/raining.png'
        return imgSrc

    }else if (dataWeatherDescription == 'broken clouds' || dataWeatherDescription == 'overcast clouds') {
        let imgSrc = '../static/img/cloud.png'
        return imgSrc
    }else if (dataWeatherDescription == 'scattered clouds' || dataWeatherDescription == 'few clouds') {
        let imgSrc = '../static/img/Logo.png'
        return imgSrc
    }
    
}
window.onload = () => {
    renderInitialTemplate()
}


    

