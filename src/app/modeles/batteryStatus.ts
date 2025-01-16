export interface Status {
  battery_inner_resistence_abnormal: boolean;
  battery_status: string;
  temperature_warning_status: string;
  wrong_identifaction_for_rated_voltage: boolean;
}
  
export interface BatteryStatus {
  current: number;
  power: number;
  state_of_charge: number;
  status: Status;
  temperature: number;
  voltage: number;
}