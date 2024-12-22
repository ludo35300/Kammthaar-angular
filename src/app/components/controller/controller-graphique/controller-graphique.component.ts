import { Component, Input, SimpleChanges } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { ChartOptions } from '../../batterie/batterie-graphique/batterie-graphique.component';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { ControllerService } from '../../../services/controller/controller.service';

@Component({
  selector: 'app-controller-graphique',
  templateUrl: './controller-graphique.component.html',
  styleUrl: './controller-graphique.component.scss'
})
export class ControllerGraphiqueComponent {
  @Input() selectedLabel: string | null = null;

  // Propriétés utilisées dans le HTML pour apx-chart
  chartSeries: ApexAxisChartSeries = [];
  chartOptions: Partial<ChartOptions> = {};
  
  isLoading = true;
  faSun = faSun;

  constructor(private controllerService: ControllerService) {
      // Configuration de base du graphique
      this.chartOptions = {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          type: 'datetime', // Permet de traiter les timestamps en millisecondes
        },
        stroke: {
          curve: 'smooth',
          width: 2,
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
        title: {
          text: 'Graphique du controlleur MPPT',
          align: 'center',
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
            case 'Température':
              this.getTemp24h();
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
      this.controllerService.getAmperage24h().subscribe({
        next: (data) => this.handleChartData(data, 'A', 'Ampérage'),
        error: (error) => this.handleError(error),
      });
    }

    getVoltage24h() {
      this.controllerService.getVoltage24h().subscribe({
        next: (data) => this.handleChartData(data, 'V', 'Voltage'),
        error: (error) => this.handleError(error),
      });
    }

    getPower24h() {
      this.controllerService.getPower24h().subscribe({
        next: (data) => this.handleChartData(data, 'W', 'Puissance'),
        error: (error) => this.handleError(error),
      });
    }

    getTemp24h() {
      this.controllerService.getTemperature24h().subscribe({
        next: (data) => this.handleChartData(data, '°C', 'Température'),
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
          align: 'center',
        },
      };
  
      this.isLoading = false;
    }

    handleError(error: any) {
      console.error('Erreur lors de la récupération des données:', error);
      this.isLoading = false;
    }

}
