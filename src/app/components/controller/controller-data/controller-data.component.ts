import { Component, Input } from '@angular/core';
import { Controller, GaugesController } from '../../../modeles/controller';
import { ControllerService } from '../../../services/controller/controller.service';
import { faArrowRight, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controller-data',
  templateUrl: './controller-data.component.html',
  styleUrl: './controller-data.component.scss'
})

export class ControllerDataComponent {
  @Input() isServerOnline: boolean | null = null;
  isLoading = true;

  controllerData: Controller | null = null;
  lastControllerData: Controller | null = null;

  faArrowRight = faArrowRight
  faSun = faSun

  // Configuration des jauges
  gauges: GaugesController[] = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55 },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30 },
    { label: 'Puissance', value: 0, unit: 'W', max: 500 },
    { label: 'Température', value: 0, unit: '°C', max: 50 }
  ];

  constructor(
    private controllerService: ControllerService
  ) {}

  ngOnChanges(): void {
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.isServerOnline){
      this.getControllerRealtime();
    // Sinon on récupère la derniere entrée enregistrée dans InfluxDB
    }else{
      this.getLastControllerData();
    }
  }

  // Récupération des infos du controller pour récupére la date
  getControllerRealtime(){
    this.controllerService.getControllerRealtime().subscribe({
      next: (data) => {
        this.controllerData = data;
        this.updateGauges(this.controllerData);
        this.isLoading = false;
        this.lastControllerData = null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données du controlleur MPPT:', error);
        this.isLoading = false;
      },
    });
  }

  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.lastControllerData = data;
        this.updateGauges(this.lastControllerData);
        this.isLoading = false;
        this.controllerData = null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des dernières données du controlleur MPPT:', error);
        this.isLoading = false;
      },
    });
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Controller): void {
    if (!data) return;
    this.gauges = [
      { label: 'Voltage', value: data.controller_load_voltage || 0, unit: 'V', max: 24 },
      { label: 'Ampérage', value: data.controller_load_amperage || 0, unit: 'A', max: 30 },
      { label: 'Puissance', value: data.controller_load_power || 0, unit: 'W', max: 100 },
      { label: 'Température', value: data.controller_temperature || 0, unit: '°C', max: 50 }
    ];
  }

}
