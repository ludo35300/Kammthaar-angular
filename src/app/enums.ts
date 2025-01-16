
export enum TemperatureStatus {
    NORMAL = 'Normale',
    OVER_TEMP = 'Elevée',
    LOW_TEMP = 'Basse'
}

export enum BatteryStatusEnum {
    NORMAL = 'Normale',
    OVERVOLT = 'En surcharge',
    UNDERVOLT = 'En sous-tension',
    LOW_VOLT_DISCONNECT = 'Déconnectée (basse tension)',
    FAULT = 'Défaut'
}

export enum ChargingStatus {
    NO_CHARGING = 'Pas de charge',
    FLOAT = 'Floating',
    BOOST = 'Boost',
    EQUALIZATION = 'Egalisation'
}

export const ChargingStatusDescriptions = new Map<ChargingStatus, string>([
    [ChargingStatus.NO_CHARGING, 'Aucune charge en cours.'],
    [ChargingStatus.FLOAT, 'La batterie est maintenue à sa tension optimale.'],
    [ChargingStatus.BOOST, 'La batterie est en phase de charge rapide.'],
    [ChargingStatus.EQUALIZATION, 'Les cellules de la batterie sont équilibrées.'],
]);

export enum DischargingStatus {
    LIGHT = 'Faible charge',
    MODERATE = 'Charge modérée',
    RATED = 'Charge nominale',
    OVERLOAD = 'Surcharge'
}

export const DischargingStatusDescriptions = new Map<DischargingStatus, string>([
    [DischargingStatus.LIGHT, 'La puissance consommée par la charge est faible, généralement bien en deçà de la capacité maximale.'],
    [DischargingStatus.MODERATE, 'La puissance consommée par la charge est dans une plage moyenne.'],
    [DischargingStatus.RATED, ' La puissance consommée atteint la capacité nominale du système'],
    [DischargingStatus.OVERLOAD, 'La charge dépasse la capacité maximale, ce qui peut provoquer des dysfonctionnements ou endommager le système'],
]);

export enum VoltageChargingStatus {
    NORMAL = 'Normale',
    NO_INPUT_POWER = 'Pas d\'alimentation',
    HIGHER_INPUT = 'Surtension',
    INPUT_VOLTAGE_ERROR = 'Erreur de tension'
}
export const VoltageStatusChargingDescriptions = new Map<VoltageChargingStatus, string>([
    [VoltageChargingStatus.NORMAL, 'Tension du panneau solaire normale.'],
    [VoltageChargingStatus.NO_INPUT_POWER, 'Panneau déconnecté.'],
    [VoltageChargingStatus.HIGHER_INPUT, 'Tension du panneau trop élevée.'],
    [VoltageChargingStatus.INPUT_VOLTAGE_ERROR, 'Problème lié à la tension du panneau.'],
]);

export enum VoltageDischargingStatus {
    NORMAL = 'Normale',
    LOW = 'Faible',
    HIGH = 'Elevée',
    NO_ACCESS = 'Aucun accès'
}
export const VoltageStatusDischargingDescriptions = new Map<VoltageDischargingStatus, string>([
    [VoltageDischargingStatus.NORMAL, 'Tension d\'entrée normale.'],
    [VoltageDischargingStatus.LOW, 'La tension d\'entrée est inférieure au seuil minimum requis.'],
    [VoltageDischargingStatus.HIGH, ' La tension d\'entrée dépasse le seuil maximum autorisé.'],
    [VoltageDischargingStatus.NO_ACCESS, 'Aucune lecture de la tension d\'entrée n\'est possible, probablement en raison d\'un problème matériel ou d\'un dysfonctionnement.'],
]);