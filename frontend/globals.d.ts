import { ITimeZone } from './src/components/TimeBarIndicator';

export interface IRentalData {
  carport_id: number;
  carport_address: string;
  share_car_id: number;
  share_price: number;
  car_id: number;
  car_maker: string;
  car_name: string;
  car_type: string;
  car_capacity: number;
  car_image_url1: string;
  car_image_url2: string;
  rental_date: Date;
  owner_rental_time: ITimeZone | null;
  booking_time: ITimeZone[];
}

export interface ICheckRentalData {
  carport_id: number | undefined;
  carport_address: string | undefined;
  share_car_id: number | undefined;
  share_price: number | undefined;
  car_id: number | undefined;
  car_maker: string | undefined;
  car_name: string | undefined;
  car_type: string | undefined;
  car_capacity: number | undefined;
  car_image_url1: string | undefined;
  car_image_url2: string | undefined;
  start_rental_date: Date | undefined;
  end_rental_date: Date | undefined;
  rental_time: number | undefined; //ここは、分に換算した時間が入ります
}

export interface IUser {
  user_id: number | null;
  carport_id: number | null;
  share_car_id: number | null;
  username: string | '';
  email: string | '';
  user_type: string | '';
  car_name: string | '';
  maker: string | '';
  car_type: string | '';
  capacity: number | null;
  share_prise: number | null;
  share_state: string | '';
  image_1: string | '';
  image_2: string | '';
  address: string | '';
  latitude: number | null;
  longitude: number | null;
  start_at: string | null;
  end_at: string | '';
  reserved_at: string | '';
  rent_at: string | '';
  rented_at: string | '';
  return_at: string | '';
  returned_at: string | '';
  evaluation: string | '';
}
export interface IUserData {
  user?: IUser;
}
//shareテーブルに登録するデータ
export interface IShare {
  user_id: number | null;
  carport_id: number | null;
  share_car_id: number | null;
  start_at: string | '';
  end_at: string | '';
}
export interface ShareData {
  share?: IShare;
}
export interface ISelectedCarData {
  car_name: string | '';
  share_prise: number | null;
}

export interface IRentalDateAndTime {
  date: string;
  start_at: string | null;
  end_at: string | null;
}

export interface IShareData {
  id: number;
  user_id: number;
  carport_id: number;
  share_car_id: number;
  start_at: string;
  end_at: string;
}

export interface IAllCarPort {
  address: string;
  capacity: number;
  car_id: number;
  car_name: string;
  car_type: string;
  carport_id: number;
  distance: number;
  id: number;
  latitude: string;
  longitude: string;
  maker: string;
  image1: string;
  image2: string;
  share_prise: number;
  share_state: string;
  user_id: number;
}

export interface ILocation {
  lat: number;
  lng: number;
}

// ルート距離リスト google routes api
export interface IDistanceData {
  carData: IAllCarPort;
  distance: IDistance;
  duration: IDuration;
}

export interface IDuration {
  text: string;
  value: number;
}

export interface IRoute {
  legs: ILeg[];
}

export interface ILeg {
  end_address: string;
  distance: IDistance;
}

export interface IDistance {
  text: string;
  value: number;
}

export interface IMapSelectedPointData {
  zoom: number | undefined;
  latLng: ILocation;
}

export interface ILoginData {
  name: string;
  password: string;
  email: string;
}
