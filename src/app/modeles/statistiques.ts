export interface Statistiques{
    consumed_energy_month: number;
    consumed_energy_today: number;
    consumed_energy_total: number;
    consumed_energy_year: number;
    generated_energy_month: number;
    generated_energy_today: number;
    generated_energy_total: number;
    generated_energy_year: number;
    max_battery_voltage_today: number;
    max_ps_voltage_today: number;
    min_battery_voltage_today: number;
    min_ps_voltage_today: number;
    last_measurement_time: Date;
}

export interface GaugesStatistiques{
    label: string;
    value: number;
    unit: string;
    max: number;
}
