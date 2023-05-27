import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiKey = '54342efa60864d368d04db1762a29d7d';

  constructor(private http: HttpClient, private sharedServices: SharedService) { }


  getGeoLocationAndWeather(cityName = ''): Observable<any> {
    return new Observable<any>((observer) => {
      if (navigator.geolocation && cityName === '') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const cityAPICall = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.apiKey}`;
            const weatherAPICall = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,${this.sharedServices.weatherConditions}&daily=weathercode&current_weather=true&timezone=GMT&forecast_days=7`;
            const firstRequest$ = this.http.get(cityAPICall);
            const secondRequest$ = this.http.get(weatherAPICall);
            observer.next(forkJoin([firstRequest$, secondRequest$]));
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else if (cityName != '') {
        const cityAPICall = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${this.apiKey}`;
        const response$ = this.http.get(cityAPICall)
          .pipe(
            switchMap((resp: any) => {
              // Extract the necessary data from the first API response
              const data = resp['results'][0]['geometry'];
              // Use the extracted data to make the second API request
              const weatherAPICall = `https://api.open-meteo.com/v1/forecast?latitude=${data.lat}&longitude=${data.lng}&hourly=temperature_2m,${this.sharedServices.weatherConditions}&daily=weathercode&current_weather=true&timezone=GMT&forecast_days=7`;
              return this.http.get(weatherAPICall)
            })
          )
          .subscribe((resp: any) => {
            observer.next(resp);
            observer.complete();
          });
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }


}
