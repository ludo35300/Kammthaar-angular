import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dischargingErrors'
})
export class DischargingErrorsPipe implements PipeTransform {

  private errorTranslations: Record<string, string> = {
    boost_over_voltage: 'Surtension en mode Boost',
    fault: 'Défaut général détecté',
    input_over_voltage: 'Surtension à l’entrée',
    output_over_voltage: 'Surtension à la sortie',
    output_voltage_abnormal: 'Tension de sortie anormale',
    short_circuit: 'Court-circuit détecté',
    short_circuit_high_voltage_side: 'Court-circuit côté haute tension',
    unable_to_discharge: 'Incapacité à décharger',
    unable_to_stop_discharging: 'Incapacité à arrêter la décharge',
  };

  transform(value: string): string {
    return this.errorTranslations[value] || 'Erreur inconnue';
  }
}
