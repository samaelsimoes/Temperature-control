import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-graphic-danger',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {
  @Input() param: any;
  title;
  desc;
  icon;

  currentPage = 1;
  itemsPerPage = 10;
  constructor() { }

  ngOnInit() {
    this.updateChartData();
  }

  updateChartData() {
    if (!this.param || !this.param[0]) {
        // Adicione um tratamento para quando 'this.param' ou 'this.param[0]' for undefined
        console.error('Dados de gráfico não disponíveis.');
        return;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const currentPageLabels = this.param[0].labels?.slice(startIndex, endIndex) || [];
    const currentPageSeries = this.param[0].series?.map(serie => serie.slice(startIndex, endIndex)) || [];
    this.title = this.param[0].title;
    this.desc = this.param[0].desc;
    this.icon = this.param[0].icon;

    const dataCompletedTasks: any = {
        labels: currentPageLabels,
        series: currentPageSeries
    };


    const optionsCompletedTasks: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 6000,
      axisX: {
        labelInterpolationFnc: function (value, index) {
          return index % 2 === 0 ? value : null;
        }
      },
      chartPadding: { top: 0, right: 20, bottom: 0, left: 20 }
    };

    const existingChart = document.getElementById('gastoImprevistos');
    if (existingChart) {
      existingChart.innerHTML = '';
    }

    const consumoMensal = new Chartist.Line('#gastoImprevistos', dataCompletedTasks, optionsCompletedTasks);

    this.startAnimationForLineChart(consumoMensal);
  }

  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 980;
    durations = 500;

    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 7900,
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
  }

  nextPage() {
    this.currentPage++;
    this.updateChartData();
  }

  prevPage() {
    this.currentPage--;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.updateChartData();
  }
}
