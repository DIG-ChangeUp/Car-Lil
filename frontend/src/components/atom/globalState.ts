import { atom } from 'jotai';
import { ISelectedCarData, IShare, IUserData } from '../../../globals';

// export const userDataAtom = atom({ email: '', userId: '' });
//ユーザーの認証時にemailを保持、shareテーブルに登録するデータを作成
export const userEmailAtom = atom<string | null>(null);
//ユーザー（オーナー）に紐づく全てのデータを保持
export const userDataAtom = atom<IUserData[]>([]);
// shareテーブルに保存するためのデータを保持
export const shareDataAtom = atom<IShare>({
  user_id: null,
  carport_id: null,
  share_car_id: null,
  start_at: '',
  end_at: '',
});
//オーナー画面で選択された車両に紐づくデータ
export const selectedCarDataAtom = atom<ISelectedCarData>({
  car_name: '',
  share_prise: null,
});
// オーナーが選択した貸出日の配列
export const rentalDaysAtom = atom<string[]>([]);
// 貸出登録用
type RentalDateAndTime = {
  date: string;
  start_at: string | null;
  end_at: string | null;
};
export const rentalDateAndTimesAtom = atom<RentalDateAndTime[]>([]);
export const rentalStartTimeAtom = atom<string | null>('10:00');
export const rentalEndTimeAtom = atom<string | null>('16:00');

// オーナー 貸出予定一覧
export const borrowDateAtom = atom<borrow[] | []>([]);
type borrow = {
  id: number;
  user_id: number;
  carport_id: number;
  share_car_id: number;
  start_at: string;
  end_at: string;
};

type Location = {
  latitude: number;
  longitude: number;
};
export const locationAtom = atom<Location>({
  latitude: 35.1704169,
  longitude: 136.8849973,
});

export const selectInfoWindowAtom = atom<AllCarPort | null>(null);
export const isOpenInfoWindowAtom = atom<boolean>(false);
type PrevLocation = {
  latitude: number | null;
  longitude: number | null;
};
export const prevLocationAtom = atom<PrevLocation>({
  latitude: null,
  longitude: null,
});

// mapページの表示切替え
export const viewModeAtom = atom<'map' | 'list'>('map');

// map pin用
export type AllCarPort = {
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
  image_1: string;
  image_2: string;
  share_prise: number;
  share_state: string;
  user_id: number;
};
export const allCarPorteAtom = atom<AllCarPort[]>([]);

// 自分のルート距離リスト google routes api
type DistanceData = {
  routes: Route[];
};

type Route = {
  legs: Leg[];
};

type Leg = {
  end_address: string;
  distance: Distance;
};

type Distance = {
  text: string;
  value: number;
};
export const distanceDataAtom = atom<DistanceData[]>([]);
