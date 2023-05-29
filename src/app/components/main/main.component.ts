import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../../services.service';
import { mergeMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  cityName = new FormControl();
  cityOptions: string[];
  filteredOptions!: Observable<string[]>;
  temperature: number;
  currCityName: string;
  weatherCondition: {};
  weatherForecast = [];
  timelyForecast = [];


  constructor(private http: HttpClient, private myService: ServicesService, private sharedService: SharedService, private router: Router) {
    this.cityOptions = sharedService.cityOptions;
  }

  ngOnInit() {
    this.autoComplete();
    this.getCurrentGeoLocation();
  }

  getCurrentGeoLocation() {
    this.myService.getGeoLocationAndWeather().pipe(
      mergeMap((innerObservable: Observable<any>) => innerObservable)
    ).subscribe({
      next: (resp) => {
        // Saving forecast
        this.timelyForecast = resp[1]['hourly'];

        // Setting city name
        this.currCityName = resp[0].results[0]['components']['city'];

        // Setting up weather condition
        if (resp[1]['current_weather']['weathercode'] in this.sharedService.weatherCodes) {
          this.weatherCondition = {
            'name': this.sharedService.weatherCodes[resp[1]['current_weather']['weathercode']].name,
            'img': this.sharedService.weatherCodes[resp[1]['current_weather']['weathercode']].weatherImg
          };
          this.temperature = resp[1]['current_weather']['temperature'];
        }

        // Setting up weekly forecast
        this.weatherForecast = resp[1]['daily']['time'].map((date, index) => {
          let temp;
          const ind = resp[1]['hourly']['time'].findIndex(item => item === date + 'T00:00');
          if (ind !== -1) {
            temp = resp[1]['hourly']['apparent_temperature'][ind];
          }
          return {
            day: date,
            weatherCode: this.sharedService.weatherCodes[resp[1]['daily']['weathercode'][index]].shortName,
            weatherImg: this.sharedService.weatherCodes[resp[1]['daily']['weathercode'][index]].weatherImg,
            temp: temp
          };
        });
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


  // If different city is being selected 
  onCityChange(event) {
    this.myService.getGeoLocationAndWeather(event.option.value).subscribe({
      next: (resp) => {
        // Saving forecast
        this.timelyForecast = resp['hourly'];

        // Setting city name
        this.currCityName = event.option.value;

        // Setting up weather condition
        if (resp['current_weather']['weathercode'] in this.sharedService.weatherCodes) {
          this.weatherCondition = {
            'name': this.sharedService.weatherCodes[resp['current_weather']['weathercode']].name,
            'img': this.sharedService.weatherCodes[resp['current_weather']['weathercode']].weatherImg
          };
          this.temperature = resp['current_weather']['temperature'];
        }

        // Setting up weekly forecast
        this.weatherForecast = resp['daily']['time'].map((date, index) => {
          let temp;
          const ind = resp['hourly']['time'].findIndex(item => item === date + 'T00:00');
          if (ind !== -1) {
            temp = resp['hourly']['apparent_temperature'][ind];
          }
          return {
            day: date,
            weatherCode: this.sharedService.weatherCodes[resp['daily']['weathercode'][index]].shortName,
            weatherImg: this.sharedService.weatherCodes[resp['daily']['weathercode'][index]].weatherImg,
            temp: temp
          };
        });
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  callDetailsPage(event) {
    let desired_date = event;
    const filteredData = {
      apparent_temperature: [],
      precipitation: [],
      visibility: [],
      weathercode: [],
      windspeed_10m: [],
      relativehumidity_2m: [],
      dewpoint_2m: [],
      cloudcover: [],
      pressure_msl: [],
      soil_temperature_0cm: [],
      surface_pressure: []
    };

    const filteredIndex = this.timelyForecast['time'].map((date, index) => {
      let trunc_date = date.split("T")[0];
      if (trunc_date.startsWith(desired_date)) {
        return index;
      }
      return null;
    }).filter(index => index !== null);
    filteredIndex.forEach(filteredIndex => {
      filteredData.apparent_temperature.push(this.timelyForecast['apparent_temperature'][filteredIndex]);
      filteredData.precipitation.push(this.timelyForecast['precipitation'][filteredIndex]);
      filteredData.visibility.push(this.timelyForecast['visibility'][filteredIndex]);
      filteredData.weathercode.push(this.timelyForecast['weathercode'][filteredIndex]);
      filteredData.windspeed_10m.push(this.timelyForecast['windspeed_10m'][filteredIndex]);
      filteredData.relativehumidity_2m.push(this.timelyForecast['relativehumidity_2m'][filteredIndex]);
      filteredData.dewpoint_2m.push(this.timelyForecast['dewpoint_2m'][filteredIndex]);
      filteredData.cloudcover.push(this.timelyForecast['cloudcover'][filteredIndex]);
      filteredData.pressure_msl.push(this.timelyForecast['pressure_msl'][filteredIndex]);
      filteredData.soil_temperature_0cm.push(this.timelyForecast['soil_temperature_0cm'][filteredIndex]);
      filteredData.surface_pressure.push(this.timelyForecast['surface_pressure'][filteredIndex]);
    });
    this.sharedService.weatherForecasting = filteredData;
    this.router.navigate(['/detail']);
  }


  // OnChange feature on autocomplete() {
  private autoComplete() {
    this.filteredOptions = this.cityName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  // Autocompete logic
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

}
