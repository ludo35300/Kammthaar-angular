export interface Controller {
    controller_load_amperage: number;
    controller_load_power: number;
    controller_load_voltage: number;
    controller_temperature: number;
    is_day: boolean;
    is_night: boolean;
    controller_date: Date;
}

export interface GaugesController{
    label: string;
    value: number;
    unit: string;
    max: number;
}
