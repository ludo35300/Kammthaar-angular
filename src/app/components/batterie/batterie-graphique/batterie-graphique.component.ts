import { Component, Input, SimpleChanges } from '@angular/core';
import { BatterieService } from '../../../services/batterie/batterie.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexGrid,
} from 'ng-apexcharts';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { Batterie } from '../../../modeles/batterie';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  yaxis?: ApexYAxis;
  title: ApexTitleSubtitle;
  apexTooltip: ApexTooltip;
  fill?: any; // ApexFill n'est pas importé par défaut, mais est utilisé pour les gradients
};

@Component({
  selector: 'app-batterie-graphique',
  templateUrl: './batterie-graphique.component.html',
  styleUrls: ['./batterie-graphique.component.scss']
})
export class BatterieGraphiqueComponent {
  @Input() selectedLabel: string = "Pourcentage";
  @Input() batterieData24h : Batterie[] = [];

  // Propriétés utilisées dans le HTML pour apx-chart
  chartSeries: ApexAxisChartSeries = [];
  chartOptions: Partial<ChartOptions> = {};


  isLoading = true;
  faSun = faSun;

  constructor(private batterieService: BatterieService) {
    // Configuration de base du graphique
    this.isLoading = true;
    this.chartOptions = {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      xaxis: {
        labels: {
          show: false, // Masquer les étiquettes de l'axe Y
        },
        axisTicks: {
          show: false, // Masque les ticks (lignes courtes)
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      grid: {
        show: false
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#21D4FD'], // Couleur de fin
          shadeIntensity: 1,
          type: 'vertical',
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 100],
        },
      },
      apexTooltip: {
        theme: 'dark',
        x: {
          formatter: (value: number) => {
            const date = new Date(value);
            const options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            };
            return new Intl.DateTimeFormat('fr-FR', options).format(date); 
          },
        }
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;

    if (changes['selectedLabel'] && this.selectedLabel) {
      switch (this.selectedLabel) {
        case 'Pourcentage':
          this.handleChartData( '%', 'Charge')
          break;
        case 'Ampérage':
          this.handleChartData( '%', 'Charge')
          break;
        case 'Voltage':
          this.handleChartData( '%', 'Charge')
          break;
        case 'Température':
          this.handleChartData( '%', 'Charge')
          break;
        case 'Puissance':
          this.handleChartData( '%', 'Charge')
          break;
        default:
          console.error('Label inconnu:', this.selectedLabel);
          this.isLoading = false;
      }
    }
  }

  getPourcent24h() {
    this.batterieService.getPourcent24h().subscribe({
      next: (data) => this.handleChartData( '%', 'Charge'),
      error: (error) => this.handleError(error),
    });
  }
  // getAmperage24h() {
  //   this.batterieService.getAmperage24h().subscribe({
  //     next: (data) => this.handleChartData(data, 'A', 'Ampérage'),
  //     error: (error) => this.handleError(error),
  //   });
  // }
  // getVoltage24h() {
  //   this.batterieService.getVoltage24h().subscribe({
  //     next: (data) => this.handleChartData(data, 'V', 'Voltage'),
  //     error: (error) => this.handleError(error),
  //   });
  // }
  // getTemp24h() {
  //   this.batterieService.getTemp24h().subscribe({
  //     next: (data) => this.handleChartData(data, '°C', 'Température'),
  //     error: (error) => this.handleError(error),
  //   });
  // }
  // getPower24h() {
  //   this.batterieService.getPower24h().subscribe({
  //     next: (data) => this.handleChartData(data, 'W', 'Puissance'),
  //     error: (error) => this.handleError(error),
  //   });
  // }

  handleChartData( unit: string, title: string) {
    
    const chartData = this.batterieData24h.map((item: any) => ({
      x: new Date(item.time).getTime(),
      y: item.battery_pourcent.value,
    }));
    console.log(chartData)

    this.chartSeries = [
      {
        name: title,
        data: chartData,
      },
    ];

    this.chartOptions = {
      ...this.chartOptions,
      apexTooltip: {
        ...this.chartOptions.apexTooltip,
        y: {
          formatter: (val: number) => `${val} ${unit}`,
        },
      },
      title: {
        text: title+' sur 24 heures',
        margin: 10,
        style: {
          fontSize:  '14px',
          fontWeight:  '400',
          fontFamily:  "Manrope",
          color:  '#5A5A5A'
        },
      },
    };
    this.isLoading = false;

    
  }

  handleError(error: any) {
    console.error('Erreur lors de la récupération des données:', error);
    this.isLoading = false;
  }

  private extractData() {
    const sortedData = this.batterieData24h
    .map((data) => ({
      battery_pourcent: data.battery_pourcent,
      battery_time: data.battery_time, // Assurez-vous que `battery_time` est un objet Date
    }))
    .sort((a, b) => a.battery_time.getTime() - b.battery_time.getTime()); // Trier par `battery_time`

  // console.log(sortedData);
  }
}
