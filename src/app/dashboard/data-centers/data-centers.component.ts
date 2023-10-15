import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
@Component({
  selector: 'app-data-centers',
  templateUrl: './data-centers.component.html',
  styleUrls: ['./data-centers.component.scss']
})
export class DataCentersComponent implements OnInit {
  paramDataCenter = [];

  constructor() { }
  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {

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


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // : we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // : we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
  }
}
