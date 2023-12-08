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
  paramCard;
  paramGraphicDiario;
  paraGraphicMetricas;
  totalDados = 0;

  constructor(
    private snackBar: MatSnackBar,
    private serviceDashBoard: ServiceDashBoard,
  ) { }

  dadosChuveiro() {
    const info = '?data_inicio=2023-01-01&data_fim=2023-06-01';
    this.paramCard = []

    this.serviceDashBoard.getApisConsumoChuveiro(info).subscribe(
      (api: any) => {
        this.totalDados = api.consumo_chuveiro.length;

        this.paramCard.push({
          category: 'Dados Chuveiro mensal',
          name: 'Total de dados gerados',
          online: this.totalDados,
          totalExistente: 9999,
          descricao: ' Chegando ao limite...',
          status: '',
          icon: 'access_time',
          css: 'card-header-success',
          cssSubiten: '',
        }
      )
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
      },
      (error: any) => {
        // Lida com erros, se necessário
        console.error(error);
      }
    );
    
    this.serviceDashBoard.getApisAnalisePreditiva(info).subscribe(
      (api: any) => {
        // Verificar se há dados de análise preditiva
        if (api.analisePreditiva && api.analisePreditiva.length > 0) {
          // Formatar os dados para o formato desejado
          const dataFormatted = api.analisePreditiva.map(item => {
            return {
              date: item.data,
              totalConsumption: Math.ceil(parseFloat(item.totalConsumo)), // Arredondar para cima
              totalPower: parseFloat(item.totalPotencia),
              totalTime: parseInt(item.totalTempoLigado), // Supondo que totalTempoLigado seja em minutos
            };
          });
    
          // Calcular os totais
          const totalConsumption = dataFormatted.reduce((total, item) => total + item.totalConsumption, 0);
          const totalPower = dataFormatted.reduce((total, item) => total + item.totalPower, 0);
          const totalTime = dataFormatted.reduce((total, item) => total + item.totalTime, 0);
    
          // Calcular os totais em reais (supondo valores arbitrários)
          const valorKwHora = 0.01; // Valor do kWh em reais
          const gastoEmReaisConsumo = totalConsumption * valorKwHora;
          const gastoEmReaisPotenciaEnergia = totalPower * valorKwHora;
    
          // Limitar a 10 itens
          const limitedData = dataFormatted.slice(0, 10);
    
          // Criar o array final no formato desejado com apenas 10 itens
          this.paraGraphicMetricas = [
            {
              high: 50, // Valor arbitrário para high
              labels: limitedData.map(item => {
                const dateParts = item.date.split('-');
                return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Formato "DD/MM/YYYY"
              }),
              series: [
                limitedData.map(item => item.totalTime), // Ajustado para incluir apenas o tempo total no series
              ],
              title: 'Tempo Total Diário',
              icon: 'access_time',
              desc: 'Tempo total de ligação diário',
              tempoTotalDiario: limitedData.map(item => item.totalTime), // Adicionando tempo total diário
              totalConsumption,
              totalPower,
              totalTime, // Adicionando totalTime como um parâmetro separado
              gastoEmReaisConsumo, // Adicionando o gasto em reais para consumo
              gastoEmReaisPotenciaEnergia, // Adicionando o gasto em reais para potência
            },
          ];
    

          console.log(this.paraGraphicMetricas)
          this.paramCard.push(
            {
            category: 'Tempo total',
            name: 'Total de horas',
            online: this.paraGraphicMetricas[0].totalTime,
            descricao: ' Horas totais utilizadas...',
            status: '',
            icon: 'access_time',
            css: 'card-header-success',
            cssSubiten: '',
          },
          {
            category: 'Potencia total',
            name: 'Total de potencia',
            online: this.paraGraphicMetricas[0].totalPower,
            descricao: ' Potencia total...',
            status: '',
            icon: 'access_time',
            css: 'card-header-success',
            cssSubiten: '',
          },
          {
            category: 'Total consumo',
            name: 'Cosumo',
            online: this.paraGraphicMetricas[0].totalPower,
            descricao: ' Consumo total...',
            status: '',
            icon: 'access_time',
            css: 'card-header-success',
            cssSubiten: '',
          },
          {
            category: 'Gasto em reais consumo mensal',
            name: 'Gasto em reais consumo mensal',
            online: 'R$ ' + this.paraGraphicMetricas[0].gastoEmReaisConsumo,
            descricao: ' Gasto consumo real total...',
            status: '',
            icon: 'access_time',
            css: 'card-header-success',
            cssSubiten: '',
          },
          {
            category: 'Gasto em reais energia',
            name: 'Gasto em reais energia mensal',
            online: 'R$ ' + this.paraGraphicMetricas[0].gastoEmReaisPotenciaEnergia,
            descricao: ' Gasto energia real total...',
            status: '',
            icon: 'access_time',
            css: 'card-header-success',
            cssSubiten: '',
          },
          )
        } else {
          console.log('Nenhum dado de análise preditiva disponível.');
        }
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
