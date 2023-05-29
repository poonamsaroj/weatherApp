import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
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
    'Delhi'];  // City lists

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


  weatherCodes = {
    0: { 'name': "Clear sky", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    1: { 'name': "Mainly clear", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    2: { 'name': "Partly cloudy", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    3: { 'name': "Overcast", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    45: { 'name': "Fog and depositing rime fog", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    48: { 'name': "Fog and depositing rime fog", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    51: { 'name': "Light intensity Drizzle", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    53: { 'name': "Drizzle: Moderate intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    55: { 'name': "Drizzle: Dense intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    56: { 'name': "Freezing Drizzle: Light intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    57: { 'name': "Freezing Drizzle: Dense intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    61: { 'name': "Rain: Slight intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    63: { 'name': "Rain: Moderate intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    65: { 'name': "Rain: Heavy intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    66: { 'name': "Freezing Rain: Light intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    67: { 'name': "Freezing Rain: Heavy intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    71: { 'name': "Snow fall: Slight intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    73: { 'name': "Snow fall: Moderate intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    75: { 'name': "Snow fall: Heavy intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    77: { 'name': "Snow grains", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    80: { 'name': "Rain showers: Slight intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    81: { 'name': "Rain showers: Moderate intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    82: { 'name': "Rain showers: Violent intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    85: { 'name': "Snow showers: Slight intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    86: { 'name': "Snow showers: Heavy intensity", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    95: { 'name': "Thunderstorm: Slight or moderate", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    96: { 'name': "Thunderstorm with slight hail", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' },
    99: { 'name': "Thunderstorm with heavy hail", 'weatherImg': 'https://cdn-icons-png.flaticon.com/128/869/869869.png' }
  };

  weatherForecasting;

  constructor() { }
}
