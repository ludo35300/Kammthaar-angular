export interface Errors {
  boost_over_voltage: boolean;
  fault: boolean;
  input_over_voltage: boolean;
  output_over_voltage: boolean;
  output_voltage_abnormal: boolean;
  short_circuit: boolean;
  short_circuit_high_voltage_side: boolean;
  unable_to_discharge: boolean;
  unable_to_stop_discharging: boolean;
}
    
export interface DischargingEquipmentStatus {
    input_voltage_status: string;
    output_power_load: string;
    running: boolean;
    errors: Errors;
}