import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargingErrors'
})
export class ChargingErrorsPipe implements PipeTransform {

  private errorTranslations: Record<string, string> = {
    anti_reverse_mosfet_short_circuit: 'Court-circuit du MOSFET anti-retour',
    charging_mosfet_short_circuit: 'Court-circuit du MOSFET de charge',
    charging_or_anti_reverse_mosfet_open_circuit: 'Circuit ouvert (charge ou anti-retour)',
    disequilibrium_in_three_circuits: 'Déséquilibre dans les trois circuits',
    fault: 'Défaut général détecté',
    input_over_current: 'Surtension d’entrée',
    load_mosfet_short_circuit: 'Court-circuit du MOSFET côté charge',
    load_over_current: 'Surcharge côté charge',
    load_short_circuit: 'Court-circuit côté charge',
    pv_input_short_circuit: 'Court-circuit d’entrée PV',
  };

  transform(value: string): string {
    return this.errorTranslations[value] || 'Erreur inconnue';
  }

}
