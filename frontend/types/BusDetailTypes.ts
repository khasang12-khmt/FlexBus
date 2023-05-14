export type Schedule = {
    day: string;
    frequency: string;
    operatingHours: string;
}

export type Facility = "Air conditioner"|"Luggage storage"|"Wifi"|"Power outlets"

export type BusDetail = {
    facilities: Facility[];
    schedule: Schedule[];
}