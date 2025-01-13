import { Component, Input, OnInit } from '@angular/core';
import { BatterieParametres } from '../../../modeles/batterie_parametres';
import { faCircleInfo, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss'
})
export class ParametresComponent{
  @Input() batterieParametresData: BatterieParametres | null = null;
  
  isLoading = true;
  faCircleInfo = faCircleInfo;
  faSun = faSun

  ngOnChanges(){
    if(this.batterieParametresData){
      this.isLoading = false;
    }
  }

}
