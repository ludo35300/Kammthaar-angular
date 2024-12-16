export interface Ps {
    ps_voltage: number;
    ps_amperage: number;
    ps_power: number;
    ps_date: Date;
}

export interface Gauge{
        label: string;
        value: number;
        unit: string;
        max: number;
        dataKey: string;
        chartData: any; 
}
