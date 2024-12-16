import { Component, Input, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { BatterieRealtimeService } from '../../../services/batterie/batterie-realtime.service';
import { ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  NgApexchartsModule} from 'ng-apexcharts';
import { faSun } from '@fortawesome/free-solid-svg-icons';

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
  dropShadow?: NgApexchartsModule;
};


@Component({
  selector: 'app-batterie-graphique',
  templateUrl: './batterie-graphique.component.html',
  styleUrl: './batterie-graphique.component.scss'
})
export class BatterieGraphiqueComponent {
  @Input() selectedLabel: string | null = null;
  isLoading = true;
  batterieData: any ;
  faSun= faSun;

  
  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
 

  constructor(private batterieService: BatterieRealtimeService) {
    this.chartOptions = {
      series: [
        {
          name: 'Pourcentage de Batterie',
          data: [] // Initialisation des données vides
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        },
      },
      xaxis: {
        type: 'datetime', // Gestion des timestamps
      },
      tooltip: {
        x: {
          format: 'dd MMM HH:mm', // Format attendu
        },
      },
      dropShadow: undefined, // Supprimez cette propriété si elle n'existe pas dans ApexCharts
      stroke: {
        width: 1,
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'Valeur',
        },
      },
      title: {
        text: 'Pourcentage Batterie sur 24h',
        align: 'center',
      },
    };
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading=true;
    
    if (changes['selectedLabel'] && this.selectedLabel) {

      switch (this.selectedLabel) {
        case 'Pourcentage':
          this.getPourcent24h();
          break;
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

  getPourcent24h() {
    this.batterieService.getPourcent24h().subscribe({
      next: (data) => this.handleChartData(data, '%', 'Pourcentage Batterie sur 24h'),
      error: (error) => this.handleError(error),
    });
  }
  
  // Méthode pour gérer les autres types de données
  getAmperage24h() {
    this.batterieService.getAmperage24h().subscribe({
      next: (data) => this.handleChartData(data, 'A', 'Amperage sur 24h'),
      error: (error) => this.handleError(error),
    });
  }
  
  getVoltage24h() {
    this.batterieService.getVoltage24h().subscribe({
      next: (data) => this.handleChartData(data, 'V', 'Voltage sur 24h'),
      error: (error) => this.handleError(error),
    });
  }
  
  getTemp24h() {
    this.batterieService.getTemp24h().subscribe({
      next: (data) => this.handleChartData(data, '°C', 'Température sur 24h'),
      error: (error) => this.handleError(error),
    });
  }
  
  getPower24h() {
    this.batterieService.getPower24h().subscribe({
      next: (data) => this.handleChartData(data, 'W', 'Puissance sur 24h'),
      error: (error) => this.handleError(error),
    });
  }

  handleChartData(data: any[], unit: string, title: string) {
    const chartData = data.map((item: any) => ({
      x: new Date(item.time).getTime(),
      y: item.value,
    }));
  
    this.chartOptions.series = [
      {
        name: title,
        data: chartData,
      },
    ];
  
    this.chartOptions.tooltip = {
      x: {
        format: 'dd MMM HH:mm',
      },
    };
  
    this.chartOptions.title = {
      text: title,
      align: 'center',
    };
  
    this.isLoading = false;
  }
  
  handleError(error: any) {
    console.error('Erreur lors de la récupération des données:', error);
    this.isLoading = false;
  }
  

}