import requests,json

api_key = 'cc85a58af07a289e260ce12f4bea5864'
city_name = 'Caracas'
api_url = f'http://pro.openweathermap.org/data/2.5/forecast/hourly?q={city_name}&cnt={4}&appid={api_key}'
response = requests.get(api_url)
response = response.json()
print(response)


