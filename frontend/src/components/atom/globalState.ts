import { atom } from 'jotai';

export const userDataAtom = atom({ email: '', userId: '' });
// オーナーが選択した貸出日の配列
export const rentalDaysAtom = atom<string[]>([]);
// 貸出登録用
type rentalDateAndTime = {
  date: string;
  start_at: string | null;
  end_at: string | null;
};
export const rentalDateAndTimesAtom = atom<rentalDateAndTime[]>([]);
export const rentalStartTimeAtom = atom<string | null>('10:00');
export const rentalEndTimeAtom = atom<string | null>('16:00');
// 初期値をミットランドとしている
export const locationAtom = atom({
  latitude: 35.1701884,
  longitude: 36.8853477,
});
