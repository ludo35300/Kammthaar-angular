import { Component, Input } from '@angular/core';
import { faCarBattery } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-batterie-pourcentage',
  templateUrl: './batterie-pourcentage.component.html',
  styleUrl: './batterie-pourcentage.component.scss'
})
export class BatteriePourcentageComponent {
  @Input() isServerOnline!: boolean | null;
  @Input() batteryCharge!: Observable<any>; // Observable pour recevoir les données

  currentCharge: number = 0; // Variable locale pour stocker le pourcentage actuel


  faCarBattery = faCarBattery; 
  
  ngOnInit(): void {
    // Récupération de l'Observable
    this.batteryCharge.subscribe(data => {
      this.currentCharge = data || 0; 
    });
  }


  getProgressBarClass(): string {
    if (this.currentCharge > 75) {
      return 'progress-good'; // Vert pour 75% ou plus
    } else if (this.currentCharge > 40) {
      return 'bg-warning'; // Orange pour 40%-75%
    } else {
      return 'progress-danger'; // Rouge pour moins de 40%
    }
  }
}
