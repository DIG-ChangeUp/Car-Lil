import { atom } from 'jotai';

// export const userDataAtom = atom({ email: '', userId: '' });
//ユーザーの認証時にemailを保持、shareテーブルに登録するデータを作成
export const userEmailAtom = atom<string | null>('');
// export const shareDataAtom = atom<object>({
//   user_id: null,
//   carport_id: null,
//   share_car_id: null,
//   start_at: 'string',
//   end_at: 'string',
// });
//ユーザー（オーナーorテナント）に紐づく全てのデータを保持
export type User = {
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
  photo_url: string | '';
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
};
export type UserData = {
  user?: User;
};
export const userDataAtom = atom<UserData[]>([]);
//shareテーブルに登録するデータ
export type Share = {
  user_id: number | null;
  carport_id: number | null;
  share_car_id: number | null;
  start_at: string | '';
  end_at: string | '';
};
export type ShareData = {
  share?: Share;
};
export const shareDataAtom = atom<Share>({
  user_id: null,
  carport_id: null,
  share_car_id: null,
  start_at: '',
  end_at: '',
});
//オーナー画面で選択された車両に紐づくデータ
export type SelectedData = {
  user?: User;
};
export const selectedDataAtom = atom<SelectedData>({});
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
  photo_url: string;
  share_prise: number;
  share_state: string;
  user_id: number;
};
export const allCarPorteAtom = atom<AllCarPort[]>([]);
