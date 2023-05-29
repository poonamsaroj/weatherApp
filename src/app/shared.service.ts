import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Dropdown city options
  cityOptions: string[] = [
    'Toronto',
    'Ottawa',
    'Vancover',
    'Paris',
    'London',
    'New York',
    'Tokyo',
    'Rome',
    'Sydney',
    'Dubai',
    'Moscow',
    'Beijing',
    'Istanbul',
    'Cairo',
    'Cape Town',
    'Barcelona',
    'Mumbai',
    'Berlin',
    'Buenos Aires',
    'Bangkok',
    'Delhi'];

  // Weather details to fetch in API calls
  weatherConditions: string[] = [
    'relativehumidity_2m',
    'dewpoint_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'snow_depth',
    'weathercode',
    'pressure_msl',
    'surface_pressure',
    'cloudcover',
    'cloudcover_low',
    'cloudcover_mid',
    'cloudcover_high',
    'visibility',
    'evapotranspiration',
    'et0_fao_evapotranspiration',
    'vapor_pressure_deficit',
    'windspeed_10m',
    'windspeed_80m',
    'windspeed_120m',
    'windspeed_180m',
    'winddirection_10m',
    'winddirection_80m',
    'winddirection_120m',
    'winddirection_180m',
    'windgusts_10m',
    'temperature_80m',
    'temperature_120m',
    'temperature_180m',
    'soil_temperature_0cm',
    'soil_temperature_6cm',
    'soil_temperature_18cm',
    'soil_temperature_54cm',
    'soil_moisture_0_1cm'
  ]

  // All weather codes with associated names and icon urls 
  weatherCodes = {
    0: { 'name': "It's a clear sky today, perfect for a bike ride.", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png', 'shortName': "Clear sky" },
    1: { 'name': "It's mainly a clear sky today, perfect for a walk.", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-512.png', 'shortName': "Maily clear" },
    2: { 'name': "You might see some clouds today, perfect for a picnic.", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/tiny-weather-1/512/cloudy-512.png', 'shortName': "Cloudy" },
    3: { 'name': "The sky is full of clouds today, enjoy your day.", 'weatherImg': 'https://cdn4.iconfinder.com/data/icons/weather-129/64/weather-4-512.png', 'shortName': "Overcast" },
    45: { 'name': "The weather might seem a bit foggy", 'weatherImg': 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_30-512.png', 'shortName': "Fog" },
    48: { 'name': "The weather might seem a very foggy", 'weatherImg': 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_30-512.png', 'shortName': "Fog" },
    51: { 'name': "You will see gentle drizzles, don't forget to carry an umberalla", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather11-512.png', 'shortName': "Light drizzle" },
    53: { 'name': "You will see moderate drizzles, don't forget to carry an umberalla", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png', 'shortName': "Medium drizzle" },
    55: { 'name': "You will see dense drizzles, don't forget to carry an umberalla", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-609/64/weather_cloud_drizzle_rain-512.png', 'shortName': "Dense drizzle" },
    56: { 'name': "You will see freezing drizzles, don't forget to layer yourself", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather11-512.png', 'shortName': "Light cold drizzle" },
    57: { 'name': "You will see freezing drizzles, don't forget to layer yourself", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-609/64/weather_cloud_drizzle_rain-512.png', 'shortName': "Dense cold drizzle" },
    61: { 'name': "It's slightly rainy today, best to carry an umberalla", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-03-512.png', 'shortName': "Slight rain" },
    63: { 'name': "It's moderatly rainy today, best to carry an umberalla", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-03-512.png', 'shortName': "Medium rain" },
    65: { 'name': "It's heavy rain today, best to carry an umberalla", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-32-512.png', 'shortName': "Heavy rain" },
    66: { 'name': "Freezing Rain: Light intensity", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-03-512.png', 'shortName': "Light cold rain" },
    67: { 'name': "Freezing Rain: Heavy intensity", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-03-512.png', 'shortName': "Heavy cold rain" },
    71: { 'name': "Snow fall: Slight intensity", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-vector-line-1/128/14-512.png', 'shortName': "Light snow fall" },
    73: { 'name': "Snow fall: Moderate intensity", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-vector-line-1/128/14-512.png', 'shortName': "Medium snow fall" },
    75: { 'name': "Snow fall: Heavy intensity", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-vector-line-1/128/14-512.png', 'shortName': "Heavy snow fall" },
    77: { 'name': "Snow grains", 'weatherImg': 'https://cdn1.iconfinder.com/data/icons/weather-and-atmospheric-phenomenon/64/weather_snow-grains-512.png', 'shortName': "Snow grains" },
    80: { 'name': "Rain showers: Slight intensity", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-03-512.png', 'shortName': "Light rain shower" },
    81: { 'name': "Rain showers: Moderate intensity", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-31-512.png', 'shortName': "Medium rain shower" },
    82: { 'name': "Rain showers: Violent intensity", 'weatherImg': 'https://cdn1.iconfinder.com/data/icons/weather-line-5/500/weather-32-512.png', 'shortName': "Dense rain shower" },
    85: { 'name': "Snow showers: Slight intensity", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-vector-line-1/128/14-512.png', 'shortName': "Light snow shower" },
    86: { 'name': "Snow showers: Heavy intensity", 'weatherImg': 'https://cdn2.iconfinder.com/data/icons/weather-glyph-2/128/64-512.png', 'shortName': "Heavy snow shower" },
    95: { 'name': "Thunderstorm: Slight or moderate", 'weatherImg': 'https://cdn1.iconfinder.com/data/icons/weather-281/64/thunder-512.png', 'shortName': "Light Thunderstorm" },
    96: { 'name': "Thunderstorm with slight hail", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-add-on/48/v-39-512.png', 'shortName': "Thunderstorm & light Hail" },
    99: { 'name': "Thunderstorm with heavy hail", 'weatherImg': 'https://cdn3.iconfinder.com/data/icons/weather-add-on/48/v-39-512.png', 'shortName': "Thunderstorm & heavy Hail" }
  };

  // Shared weather forcasting
  weatherForecasting: {};

  constructor() { }
}
