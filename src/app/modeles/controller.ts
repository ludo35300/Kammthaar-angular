export interface Controller {
    amperage: number;
    power: number;
    voltage: number;
    temperature: number;
    day_time: boolean;
    night_time: boolean;
    date: Date;
}

export interface GaugesController{
    label: string;
    value: number;
    unit: string;
    max: number;
}
