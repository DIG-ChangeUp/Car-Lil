import { atom } from 'jotai';

// export const userDataAtom = atom({ email: '', userId: '' });
//ユーザーの認証時にemailを保持、shareテーブルに登録するデータを作成
export const userDataAtom = atom({ email: '' });
export type Share = {
  user_id: number;
  carport_id: number;
  share_car_id: number;
  start_at: string;
  end_at: string;
};
export const shareDataAtom = atom<object>({
  user_id: null,
  carport_id: null,
  share_car_id: null,
  start_at: 'string',
  end_at: 'string',
});
//シェアカーデータを保持
export type ShareCars = {
  id: number;
  user_id: number;
  car_id: number;
  carport_id: number;
  share_prise: number;
  share_state: string;
};
export const shareCarsDataAtom = atom<ShareCars[]>([]);
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

type Location = {
  latitude: number;
  longitude: number;
};
export const locationAtom = atom<Location>({
  latitude: 35.1704169,
  longitude: 136.8849973,
});
type Position = {
  lat: number;
  lng: number;
};
export const selectInfoWindowAtom = atom<Position | null>(null);
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
type AllCarPort = {
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
  photo_url: string;
  share_prise: number;
  share_state: string;
  user_id: number;
};
export const allCarPorteAtom = atom<AllCarPort[]>([]);
