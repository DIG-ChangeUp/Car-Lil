import { atom } from 'jotai';
import {
  IRentalDateAndTime,
  ISelectedCarData,
  IShare,
  IUserData,
  IShareData,
  IAllCarPort,
  ILocation,
  IDistanceData,
  IMapSelectedPointData,
} from '../../../globals';

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

export const selectedDateAtom = atom<string[]>([]);
export const selectedDateAndTimesAtom = atom<IRentalDateAndTime[]>([]);

// オーナー 貸出予定一覧
export const currentShareDataAtom = atom<IShareData[] | []>([]);

export const locationAtom = atom<ILocation | null>(null);
export const getDistanceApiRequestTimeAtom = atom<Date | null>(null);
export const diffDistanceAtom = atom<number | null>(null);
export const selectInfoWindowAtom = atom<IAllCarPort | null>(null);
export const isOpenInfoWindowAtom = atom<boolean>(false);
export const viewModeAtom = atom<'map' | 'list'>('map');
export const allCarPorteAtom = atom<IAllCarPort[]>([]);
export const distanceDataAtom = atom<IDistanceData[]>([]);

export const mapSelectPointData = atom<IMapSelectedPointData | null>(null);
