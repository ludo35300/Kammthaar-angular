import { Component, Input } from '@angular/core';
import { Gauge, Ps } from '../../../modeles/ps';
import { PsService } from '../../../services/ps/ps.service';
import { faArrowRight, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ps-data',
  templateUrl: './ps-data.component.html',
  styleUrl: './ps-data.component.scss'
})
export class PsDataComponent {
  @Input() isServerOnline: boolean | null = null;
  isLoading = true;

  psData: Ps | null = null;
  lastPsData: Ps | null = null;

  faArrowRight = faArrowRight
  faSun = faSun


  // Configuration des jauges
  gauges: Gauge[] = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55, dataKey: 'voltageData', chartData: null },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30, dataKey: 'amperageData', chartData: null },
    { label: 'Puissance', value: 0, unit: 'W', max: 500, dataKey: 'powerData', chartData: null }
  ];

  constructor(
    private psService: PsService
  ){}

  ngOnChanges(): void {
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.isServerOnline){
      this.getPsRealtime();
    // Sinon on récupère la derniere entrée enregistrée dans InfluxDB
    }else{
      this.getLastPsData();
    }
  }
    

  
  getPsRealtime(){
    // On récupere les données en temps réel du panneau solaire (Voltage, Ampérage & Power)
    this.psService.getPsData().subscribe({
      next: (data) => {
        this.psData = data;
        this.updateGauges(data)
        this.isLoading = false;
        this.lastPsData = null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données du PS:', error);
        this.isLoading = false;
      },
    });
  }

  // On récupère les dernières statistiques enregistrées
  getLastPsData(){
    this.psService.getLastPsData().subscribe({
      next: (data) => {
        this.lastPsData = data;
        console.log(this.lastPsData)
        this.updateGauges(data);
        this.isLoading = false;
        this.psData= null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données de statistiques:', error);
        this.isLoading = false;
      },
    });
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Ps): void {
    if (!data) return;
    this.gauges.forEach((gauge) => {
      switch (gauge.dataKey) {
        case 'voltageData':
          gauge.value = data.ps_voltage || 0;
          break;
        case 'amperageData':
          gauge.value = data.ps_amperage || 0;
          break;
        case 'powerData':
          gauge.value = data.ps_power || 0;
          break;
      }
    });
  }
    

}
