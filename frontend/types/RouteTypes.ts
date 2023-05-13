export type BusStep = {
  bus_no: string;
  departure: string;
  arrival: string;
  timestart: string;
  timeend: string;
  distance: string;
  duration: string;
};
export type Route = {
  price: string;
  departure: string;
  arrival: string;
  timestart: string;
  timeend: string;
  duration: string;
  distance: string;
  busSteps: BusStep[];
};
