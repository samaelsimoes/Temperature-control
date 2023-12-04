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
  paramGraphicDiario;

  constructor() { }

  ngOnInit() {
    this.param = [
      {
        high: 50,
        labels: ['00:00 H', '01:00 H', '02:00 H', '03:00 H', '04:00 H', '05:00 H', '06:00 H', '07:00 H'],
        series: [
          [10, 20, 30, 35, 43, 32, 35, 35]
        ],
        title: 'Temperatura diario',
        icon: 'access_time',
        desc: 'valores por semana'
      }
    ]

    this.paramChuveiro = [
      {
        category: 'chuveiroLigado',
        name: 'Chuveiro Ligados',
        online: 5,
        totalExistente: 6,
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
        online: 38,
        totalExistente: 42,
        icon: 'ac_unit',
        css: 'card-header-info',
        cssSubiten: '',
      },
    ];

    this.paramGraphicDiario = [
      {
        high: 1000,
        labels: ['13/10/23', '14/10/23', '15/10/23', '16/10/23', '17/10/23', '18/10/23', '19/10/23', '20/10/23'],
        series: [
          [10, 14, 17, 22, 55, 15, 10, 20]
        ],
        title: 'Consumo Diario',
        icon: 'access_time',
        desc: 'valores por semana'
      }
    ]
  }
}
