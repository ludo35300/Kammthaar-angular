export interface DailyStatistics {
    day_time: boolean;
    night_time: boolean;
    maximum_battery_voltage_today: number;
    minimum_battery_voltage_today: number;
    date: Date;
}