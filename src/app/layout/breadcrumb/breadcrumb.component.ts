import { Component, Input } from '@angular/core';
import { Controller } from '../../modeles/controller';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() title: string = 'Page Title';
  @Input() controllerData: Controller | null = null;
  @Input() breadcrumbs: { label: string, url?: string }[] = [];
  @Input() isServerOnline: boolean | null = null;

  

  
  faSun = faSun;
  faMoon = faMoon;
}
