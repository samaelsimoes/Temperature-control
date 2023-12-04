import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-graphic-success',
  templateUrl: './graphic-success.component.html',
  styleUrls: ['./graphic-success.component.css']
})
export class GraphicSuccessComponent implements OnInit {

  @Input() param: any;
  paramGraphic;
  title;
  desc;
  icon;

  constructor( ) { }

  ngOnInit() {
    this.paramGraphic = this.param[0];
    this.title = this.param[0].title;
    this.desc = this.param[0].desc;
    this.icon = this.param[0].icon;

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
      high: 300, // : we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    const dailySalesChart = new Chartist.Line('#consumoMensal', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
    const dataCompletedTasks: any = {
      labels: this.param[0].labels,
      series: this.param[0].series
    };

    const optionsCompletedTasks: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // : we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    const consumoMensal = new Chartist.Line('#consumoMensal', dataCompletedTasks, optionsCompletedTasks);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(consumoMensal);
  }

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
}
