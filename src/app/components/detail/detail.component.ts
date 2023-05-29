import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Chart from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit, AfterViewInit {
  lineChart: any;
  barChart: any;
  precipitation: Number;
  cloudcover: Number;
  pressure: Number;
  humidity: Number;

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    let weatherData = this.sharedService.weatherForecasting;
    console.log(weatherData)
    this.createLineChart(weatherData['apparent_temperature']);
    this.createBarChart(weatherData['windspeed_10m']);
    this.precipitation = Number((weatherData['precipitation'].reduce((acc, curr) => acc + curr) / 24).toFixed(2));
    this.cloudcover = Number((weatherData['cloudcover'].reduce((acc, curr) => acc + curr) / 24).toFixed(2));
    this.pressure = Number((weatherData['pressure_msl'].reduce((acc, curr) => acc + curr) / 24).toFixed(2));
    this.humidity = Number((weatherData['relativehumidity_2m'].reduce((acc, curr) => acc + curr) / 24).toFixed(2));
  }

  ngAfterViewInit() { }

  createLineChart(data) {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
        datasets: [{
          label: 'Hourly Temperature',
          data: data,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createBarChart(data) {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'],
        datasets: [{
          label: 'Hourly Windspeed',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
