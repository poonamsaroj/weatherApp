import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Forecast {
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {

  cityName = new FormControl();   // Form control for picking city

  cityOptions: string[] = ['Toronto', 'Ottawa', 'Vancover'];  // City lists
  filteredOptions!: Observable<string[]>;
  weatherData: any;  // Information about weather

  weatherForcast: Forecast[] = [];

  constructor(private http: HttpClient) {
    this.cityName.setValue('Ottawa');   // Set the city value to the current location
  }

  ngOnInit() {
    this.filteredOptions = this.cityName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    // let city = this.cityName.value;
    let city = 'New York';

    // Make a request to the geocoding API
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=54342efa60864d368d04db1762a29d7d`)
      .then(response => response.json())
      .then(data => {
        // Extract the latitude and longitude from the API response
        const { lat, lng } = data.results[0].geometry;

        // Use the obtained coordinates as needed
        console.log(`Latitude: ${lat}, Longitude: ${lng} `);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  // Autocompete logic
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Current location - on load
  public getCurrentLocation() {
    const latitude = 45.3517673; // Example latitude
    const longitude = -75.8115491; // Example longitude

    // Make a request to the geocoding API
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=54342efa60864d368d04db1762a29d7d`)
      .then(response => response.json())
      .then(data => {
        debugger;
        // Extract the city name from the API response
        const cityName = data.results[0].components.city;

        // Use the obtained city name as needed
        console.log('City Name:', cityName);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  // Get long and lat by city name
  public getGeoLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`).subscribe((data) => {

        });
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            console.log('The request to get user location timed out.');
            break;
        }
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

}
