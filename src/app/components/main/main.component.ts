import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  temperature: number = 0;
  currCityName: string;
  weatherCondition: string;
  weatherForecast = [];


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
        console.log(resp);

        // Setting city name
        this.currCityName = resp[0].results[0]['components']['city'];

        // Setting up weather condition
        if (resp[1]['current_weather']['weathercode'] in this.sharedService.weatherCodes) {
          this.weatherCondition = this.sharedService.weatherCodes[resp[1]['current_weather']['weathercode']];
          this.temperature = resp[1]['current_weather']['temperature'];
        }

        // Setting up 7 days forecast
        this.weatherForecast = resp[1]['daily']['time'].map((date, index) => {
          if (resp[1]['current_weather']['weathercode'] in this.sharedService.weatherCodes) {
            this.weatherCondition = this.sharedService.weatherCodes[resp[1]['current_weather']['weathercode']];
          }
          return { day: date, weatherCode: resp[1]['daily']['weathercode'][index] };
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
        // Setting city name
        this.currCityName = event.option.value;
        // Setting up weather condition
        if (resp['current_weather']['weathercode'] in this.sharedService.weatherCodes) {
          this.weatherCondition = this.sharedService.weatherCodes[resp['current_weather']['weathercode']];
          this.temperature = resp['current_weather']['temperature'];
        }

        // Setting up 7 days forecast
        this.weatherForecast = resp['daily']['time'].map((date, index) => {
          if (resp['current_weather']['weathercode'] in this.sharedService.weatherCodes) {
            this.weatherCondition = this.sharedService.weatherCodes[resp['current_weather']['weathercode']];
          }
          return { day: date, weatherCode: resp['daily']['weathercode'][index] };
        });
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  callDetailsPage(event) {
    debugger;
    // Navigate to the target route with the data as query parameters
    this.router.navigate(['/target-route'], { queryParams: { name: "poonam" } });
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
