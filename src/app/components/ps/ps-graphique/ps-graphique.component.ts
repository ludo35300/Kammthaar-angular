import { Component, Input, SimpleChanges } from '@angular/core';
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
import { PsService } from '../../../services/ps/ps.service';

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
  selector: 'app-ps-graphique',
  templateUrl: './ps-graphique.component.html',
  styleUrl: './ps-graphique.component.scss'
})
export class PsGraphiqueComponent {
  @Input() selectedLabel: string | null = null;

  isLoading = true;
  faSun = faSun;
  
  // Propriétés utilisées dans le HTML pour apx-chart
  chartSeries: ApexAxisChartSeries = [];
  chartOptions: Partial<ChartOptions> = {};

  constructor(private psService: PsService) {
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
        case 'Ampérage':
          this.getAmperage24h();
          break;
        case 'Voltage':
          this.getVoltage24h();
          break;
        case 'Puissance':
          this.getPower24h();
          break;
        default:
          console.error('Label inconnu:', this.selectedLabel);
        this.isLoading = false;
      }
    }
  }

  getAmperage24h() {
        this.psService.getAmperageData24H().subscribe({
          next: (data) => this.handleChartData(data, 'A', 'Ampérage'),
          error: (error) => this.handleError(error),
        });
  }
    
  getVoltage24h() {
        this.psService.getVoltageData24H().subscribe({
          next: (data) => this.handleChartData(data, 'V', 'Voltage'),
          error: (error) => this.handleError(error),
        });
  }
    
  getPower24h() {
        this.psService.getPowerData24H().subscribe({
          next: (data) => this.handleChartData(data, 'W', 'Puissance'),
          error: (error) => this.handleError(error),
        });
  }

  handleChartData(data: any[], unit: string, title: string) {
    const chartData = data.map((item: any) => ({
          x: new Date(item.time).getTime(),
          y: item.value,
    }));
    
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

}
