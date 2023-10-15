import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-chuveiro',
  templateUrl: './chuveiro.component.html',
  styleUrls: ['./chuveiro.component.scss']
})
export class ChuveiroFileComponent implements OnInit {
  param = [];
  paramChuveiro = [];

  constructor() { }

  ngOnInit() {
    this.param = [
      {
        high: 1000,
        labels: ['00:00 H', '01:00 H', '02:00 H', '03:00 H', '04:00 H', '05:00 H', '06:00 H', '07:00 H'],
        series: [
          [10, 300, 850, 300, 100, 5, 200, 900]
        ],
        title: 'Consumo mensal',
        icon: 'access_time',
        desc: 'valores por semana'
      }
    ]

    this.paramChuveiro = [
      {
        category: 'chuveiroLigado',
        name: 'Chuveiro Ligados',
        online: 98,
        totalExistente: 99,
        descricao: 'Chegando ao limite...',
        status: 'warning',
        icon: 'access_time',
        css: 'card-header-success',
        cssSubiten: '',
      },
      {
        category: 'TempoTemperatura',
        name: 'Temperatura em tempo real dos chuveiro',
        descricao: 'Controle em tempo real',
        online: 200,
        totalExistente: 300,
        icon: 'ac_unit',
        css: 'card-header-info',
        cssSubiten: '',
      },
    ];
  }
}
