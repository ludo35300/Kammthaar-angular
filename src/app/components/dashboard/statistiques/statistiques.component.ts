import { Component, Input } from '@angular/core';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions,
} from "ng-apexcharts";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.scss'
})
export class StatistiquesComponent {
  isLoading = true;
  chartOptions: any;
  faSun = faSun;
  @Input() energyStatistics7days: any | null = null;

  
  ngOnInit(){
    this.loadChart();
    if(this.energyStatistics7days != null){
      this.isLoading = false;
    }
  }
  // Configuration des gauges
  constructor(){}

  loadChart() {
    const dates = Object.keys(this.energyStatistics7days);
    const consumed = dates.map(date => this.energyStatistics7days[date].consumed_today);
    const generated = dates.map(date => this.energyStatistics7days[date].generated_today);

    this.chartOptions = {
      series: [
        { name: "Consommation", data: consumed },
        { name: "Production", data: generated }
      ],
      chart: {
        type: "bar",
        height: 300,
        background: "#1C455D",
        toolbar: { show: false }
      },
      grid: { show: false },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: 'end'
        }
      },
      dataLabels: {  enabled: false },
      title: {
        text: "Statistiques des 7 derniers jours",
        margin: 10,
        style: {
          fontSize:  '14px',
          fontWeight:  '400',
          fontFamily:  "Manrope",
          color:  '#ffffffd9'
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize:  '12px',
            fontWeight:  '200',
            fontFamily:  "Manrope",
            colors: '#ffffffd9',
          },
          formatter: (value: number) => { return `${value.toFixed(1)} KWh`; } // Ajoute KWh
        }
      },
      xaxis: {
        categories: dates,
        labels:{
          style: {
            fontSize:  '12px',
            fontWeight:  '300',
            fontFamily:  "Manrope",
            colors: '#ffffffd9',
          },
          formatter: (value: number) => {
            const date = new Date(value);
            const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
            return new Intl.DateTimeFormat('fr-FR', options).format(date); 
          },
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: "#ffffffd9" }
      },
      tooltip: {
        theme: 'dark',
        x: {
          formatter: (value: number) => {
            const date = new Date(value);
            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric', month: 'long', day: 'numeric'
            };
            return new Intl.DateTimeFormat('fr-FR', options).format(date); 
          },
        },
        y: { formatter: (val: number) => `${val} KWh` }
      },
    };
  }
}
