export interface ICarPort {
  id: number;
  user_id: number;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface IDrawCarPort {
  id: number;
  user_id: number;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  rootDistance: number;
}