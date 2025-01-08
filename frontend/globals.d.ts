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
