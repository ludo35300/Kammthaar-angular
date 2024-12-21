import { Component, Input } from '@angular/core';
import { faCheck, faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-infos-serveur',
  templateUrl: './infos-serveur.component.html',
  styleUrl: './infos-serveur.component.scss'
})
export class InfosServeurComponent {
  @Input() isServerOnline: boolean | null = null;
  @Input() systemInfo: any | null = null;

  faWarning = faWarning;
  faCheck = faCheck;

}
