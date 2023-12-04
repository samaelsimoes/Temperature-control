import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
@Component({
  selector: 'app-data-centers',
  templateUrl: './data-centers.component.html',
  styleUrls: ['./data-centers.component.scss']
})
export class DataCentersComponent implements OnInit {
  paramDataCenter;
  paramNormalDays;
  paramTemperatureIncidents;
  paramGraphicDiario;
  paramGastosImprevistos = [];


  constructor() {
  }

  ngOnInit() {
    this.paramDataCenter = [];
    this.paramNormalDays = [];
    this.paramTemperatureIncidents = [];

    this.paramGraphicDiario = [
      {
        high: 1000,
        labels: ['13/10/23', '14/10/23', '15/10/23', '16/10/23', '17/10/23', '18/10/23', '19/10/23', '20/10/23'],
        series: [
          [10, 14, 17, 22, 55, 15, 10, 20]
        ],
        title: 'Consumo mensal',
        icon: 'access_time',
        desc: 'valores por semana'
      }
    ]

    this.paramGastosImprevistos = [
      {
        high: 1000,
        labels: ['13/10/23', '14/10/23', '15/10/23', '16/10/23', '17/10/23', '18/10/23', '19/10/23', '20/10/23'],
        series: [
          [200, 5, 5, 55, 78, 5, 10, 20]
        ],
        title: 'Gastos previstos',
        icon: 'access_time',
        desc: 'valores por semana'
      }
    ]

    this.paramNormalDays = [
      {
        high: 400,
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [12, 17, 7, 17, 23, 18, 38]
        ],
        title: 'Dias normais',
        icon: 'access_time',
        desc: 'updated 4 minutes ago'
      }
    ]

    this.paramTemperatureIncidents = [
      {
        high: 400,
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [230, 750, 450, 300, 280, 240, 200, 190]
        ],
        title: 'Incidentes com temperatura',
        icon: 'access_time',
        desc: 'campaign sent 2 days ago'
      }
    ]

    this.paramDataCenter = [
      {
        category: 'dataCenter',
        name: 'Data Center Online',
        online: 49,
        totalExistente: 50,
        descricao: 'Chegando ao limite...',
        icon: 'cloud',
        css: 'card-header-warning',
        cssSubiten: 'text-danger',
      },
      {
        category: 'server',
        name: 'Server Online',
        descricao: 'Tempo real',
        online: 200,
        totalExistente: 300,
        icon: 'dns',
        css: 'card-header-success',
        cssSubiten: '',
      },
      {
        category: 'temperaturaCritica',
        name: 'Temperatura Crítica',
        descricao: 'Temperatura crítica',
        online: '85',
        totalExistente: '300',
        icon: 'device_thermostat',
        css: 'card-header-danger',
        cssSubiten: '',
      },
      {
        category: 'temperaturaReal',
        name: 'Temperatura em Tempo Real',
        grausCelsius: 13,
        online: '13 ºC',
        totalExistente: '',
        descricao: 'Controle de temperatura',
        icon: 'ac_unit',
        css: 'card-header-info',
        cssSubiten: '',
      }
    ];
  }
}
