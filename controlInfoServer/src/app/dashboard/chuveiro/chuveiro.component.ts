import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ServiceDashBoard } from '../auth/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chuveiro',
  templateUrl: './chuveiro.component.html',
  styleUrls: ['./chuveiro.component.scss']
})
export class ChuveiroFileComponent implements OnInit {
  param = [];
  paramChuveiro = [];
  paramGraphicDiario;

  constructor(
    private snackBar: MatSnackBar,
    private serviceDashBoard: ServiceDashBoard,
  ) { }

  dadosChuveiro() {
    const info = '?data_inicio=2023-05-01&data_fim=2023-06-01';

    this.serviceDashBoard.getApis(info).subscribe(
      (api: any) => {
        // Formatar os dados para o formato desejado
        const dataFormatted = api.consumo_chuveiro.map(item => {
          return {
            date: item.data,
            consumption: Math.ceil(parseFloat(item.consumo)), // Arredondar para cima
          };
        });

        // Limitar a 10 itens
        const limitedData = dataFormatted.slice(0, 1000);

        // Criar o array final no formato desejado com apenas 10 itens
        this.paramGraphicDiario = [
          {
            high: 50, // Valor arbitrário para high
            labels: limitedData.map(item => {
              const dateParts = item.date.split('-');
              return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Formato "DD/MM/YYYY"
            }),
            series: [limitedData.map(item => item.consumption)],
            title: 'Gasto diario',
            icon: 'access_time',
            desc: 'valores diarios'
          },
        ];
        console.log(this.paramGraphicDiario);
      },
      (error: any) => {
        // Lida com erros, se necessário
        console.error(error);
      }
    );
  }

  ngOnInit() {

    this.dadosChuveiro();

  }
}
