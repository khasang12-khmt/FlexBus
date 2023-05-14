export type LocationName = {
  location_name: string | undefined;
};
export type Coord = {
  latitude: number;
  longitude: number;
};
export type CoordName = LocationName & Coord;