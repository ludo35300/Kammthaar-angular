export interface Ps {
    voltage: number;
    amperage: number;
    power: number;
    date: Date;
}

export interface Gauge{
        label: string;
        value: number;
        unit: string;
        max: number;
        dataKey: string;
        chartData: any; 
}
