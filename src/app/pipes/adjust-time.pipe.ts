import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adjustTime'
})
export class AdjustTimePipe implements PipeTransform {

  transform(value: Date | string | number, hoursToAdjust: number): Date {
    const date = new Date(value); // Convertit en objet Date
    console.log(date);
    date.setHours(date.getHours() + hoursToAdjust); // Ajuste l'heure
    return date; // Retourne la nouvelle date
  }

}
