import { Component, OnInit } from '@angular/core';
import { DataCenterInfoInterface } from '../interface/dataCenterInfoInterface';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  test: Date = new Date();
  dataCenterInfo!: any;

  constructor( ) { }

  ngOnInit() {
    this.dataCenterInfo = [
      {
        category: 'dataCenter',
        name: 'Data Center Online',
        online: 49,
        totalExistente: 50,
        descricao: 'Chegando ao limite...',
        status: 'warning',
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
