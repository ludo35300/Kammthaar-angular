export interface EnergyStatistics {
    consumed_this_month: number;
    consumed_this_year: number;
    consumed_today: number;
    generated_this_month: number;
    generated_this_year: number;
    generated_today: number;
    total_consumed: number;
    total_generated: number;
    date: Date;
}