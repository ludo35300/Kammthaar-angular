export interface LoadData {
    current: number;
    power: number;
    voltage: number;
    date: Date;
}

export interface GaugesLoad{
    label: string;
    value: number;
    unit: string;
    max: number;
}