export interface BatterieParametres {
    battery_capacity: number;
    battery_charge: number;
    battery_discharge: number;
    battery_rated_voltage: number;
    battery_type: string;
    boost_charging_voltage: number;
    boost_duration: number;
    boost_reconnect_voltage: number;
    charging_limit_voltage: number;
    charging_mode: string;
    default_load_mode: string;
    discharging_limit_voltage: number;
    equalize_charging_voltage: number;
    equalize_duration: number;
    float_charging_voltage: number;
    low_voltage_reconnect: number;
    over_voltage_disconnect: number;
    over_voltage_reconnect: number;
    rated_charging_current: number;
    rated_load_current: number;
    real_rated_voltage: number;
    temp_compensation_coefficient: number;
    under_voltage_recover: number;
    batterie_parametres_date: Date; 
}
