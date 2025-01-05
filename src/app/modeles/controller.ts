export interface Controller {
    controller_load_amperage: number;
    controller_load_power: number;
    controller_load_voltage: number;
    controller_temperature: number;
    controller_day_time: boolean;
    controller_night_time: boolean;
    controller_date: Date;
}

export interface GaugesController{
    label: string;
    value: number;
    unit: string;
    max: number;
}
