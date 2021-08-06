from flask import Flask, render_template, request, flash, jsonify
from flask.wrappers import Request
import requests,json
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def render_main():
    return render_template('main.html')


@app.route('/<string:city_name>')
def get_city_weather(city_name):
    now_weather = get_now_weather(city_name)

    send_weather = {
        'now_weather': now_weather
    }
    
    return send_weather

def get_now_weather(city_name):
    api_key = 'cc85a58af07a289e260ce12f4bea5864'
    api_url = f'http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}'
    weather_api_response = requests.get(api_url)
    weather_api_response = weather_api_response.json()
    now_weatther =  get_exact_weather(weather_api_response)

    return now_weatther

def get_exact_weather(response):
    temperature = response['main']['temp'] - 273.15
    temperature = round(temperature, 2)
    feels_like = response['main']['feels_like'] - 273.15
    feels_like = round(feels_like, 2)
    max_temp = response['main']['temp_max'] - 273.15
    max_temp = round(max_temp, 2)
    min_temp = response['main']['temp_min'] - 273.15
    min_temp = round(min_temp, 2)
    humidity = response['main']['humidity']
    weather_description = response['weather'][0]['description']
    wind_speed = response['wind']['speed']

    exact_weather = {
        'temperature': temperature,
        'feels_like': feels_like,
        'max_temp': max_temp,
        'min_temp': min_temp,
        'humidity': humidity,
        'weather_description': weather_description,
        'wind_speed': wind_speed
    }
    return exact_weather

if __name__ == '__main__':
    app.run(port=5000)

