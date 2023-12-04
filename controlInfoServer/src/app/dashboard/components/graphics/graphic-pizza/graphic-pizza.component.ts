import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-graphic-pizza',
  templateUrl: './graphic-pizza.component.html',
  styleUrls: ['./graphic-pizza.component.css']
})
export class GraphicPizzaComponent implements OnInit {

  @Input() title: string;
  @Input() desc: string;
  @Input() icon: string;

  @Input() previsaoGastos: number;
  @Input() gastosNaoPrevisao: number;
  @Input() lucroTotal: number;

  percentPrevisaoGastos;
  percentLucroTotal;
  percentGastosNaoPrevisao;

  constructor() { }

  ngOnInit() {
    const total = this.previsaoGastos + this.gastosNaoPrevisao + this.lucroTotal;

    this.percentPrevisaoGastos = ((this.previsaoGastos / total) * 100).toString() + '%';
    this.percentGastosNaoPrevisao = ((this.gastosNaoPrevisao / total) * 100).toString() + '%';
    this.percentLucroTotal = ((this.lucroTotal / total) * 100).toString() + '%';

    console.log('previsaoGastos:', this.previsaoGastos);
    console.log('gastosNaoPrevisao:', this.gastosNaoPrevisao);
    console.log('lucroTotal:', this.lucroTotal);

    const data = {
      labels: ['Gastos Previstos', 'Gastos Não Previstos', 'Lucro Total'],
      series: [this.previsaoGastos, this.gastosNaoPrevisao, this.lucroTotal]
    };

    const colors = {
      'Gastos Previstos': '#FF5733',
      'Gastos Não Previstos': '#FFC300',
      'Lucro Total': '#33FF77'
    };

    const options = {
      donut: true,
      donutWidth: 100,
      showLabel: true,
      labelInterpolationFnc: (value, idx) => {
        const label = value;
        return label + ': R$' + data.series[idx];
      },
      labelDirection: 'explode'
    };

    const responsiveOptions = [];

    const pieChart = new Chartist.Pie('#pieChart', data, options, responsiveOptions);

    const legend = document.querySelector('#chart-legend');
    data.labels.forEach((label, idx) => {
      const color = colors[label];
      const value = data.series[idx];
      const percent = ((value / total) * 100).toFixed(2);
      const legendItem = document.createElement('div');
      legendItem.innerHTML = `
        <span class="legend-label" style="font-weight: bold;">${label}:</span>  R$${value} (${percent}%)
      `;
      legend.appendChild(legendItem);
    });

  }
}
