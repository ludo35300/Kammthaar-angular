export interface Errors {
    anti_reverse_mosfet_short_circuit: boolean;
    charging_mosfet_short_circuit: boolean;
    charging_or_anti_reverse_mosfet_open_circuit: boolean;
    disequilibrium_in_three_circuits: boolean;
    // fault: boolean;
    input_over_current: boolean;
    load_mosfet_short_circuit: boolean;
    load_over_current: boolean;
    load_short_circuit: boolean;
    pv_input_short_circuit: boolean;
  }
    
  export interface ChargingEquipmentStatus {
    charging_status: string;
    input_voltage_status: string;
    running: boolean;
    errors: Errors;
  }