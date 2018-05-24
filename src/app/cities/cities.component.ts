import {Component, OnInit, Output, ViewChild, EventEmitter, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CitiesDataSource, CitiesItem} from './cities-datasource';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CitiesDataSource;
  cityName = '';
  private key = environment.api_key;
  selectedCity = '';
  covert = 273.15;
  chart = [];
  title: string;

  constructor(private _http: HttpClient) {
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nimi', 'maakunta'];

  ngOnInit() {
    this.dataSource = new CitiesDataSource(this.paginator, this.sort);
  }

  city(row: any) {
    this.cityName = row.nimi;
    this.title = this.cityName;
    this._http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.cityName + ',fi&APPID=' + this.key)
      .subscribe(res => {
        let temp_max = res['list'].map(res => res.main.temp_max - this.covert)
        let temp_min = res['list'].map(res => res.main.temp_min - this.covert)
        let alldates = res['list'].map(res => res.dt)


        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('fi', {year: 'numeric', month: 'numeric', day: 'numeric'}));

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: weatherDates,
              datasets: [
                {
                  data: temp_max,
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  data: temp_min,
                  borderColor: '#ffcc00',
                  fill: false
                },
              ]
            },
            options: {
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }]
              }
            }

          });
        });
      })

  }
}
