// OwnerSelectCarでのサンプルデータ用ファイル、DB整備した本番では不要

export type Car = {
  id: number;
  car_name: string;
  maker: string;
  capacity: number;
  car_type: string;
  photo_url: string;
};
export type ShareCar = {
  id: number;
  user_id: number;
  car_id: number;
  carport_id: number;
  share_prise: number;
  share_state: string;
};

export const cars: Car[] = [
  {
    id: 1,
    car_name: 'スイフト',
    maker: 'suzuki',
    capacity: 5,
    car_type: 'コンパクト',
    photo_url: './images/image001',
  },
  {
    id: 2,
    car_name: 'ノア',
    maker: 'toyota',
    capacity: 7,
    car_type: 'ミニバン',
    photo_url: './images/image001',
  },
  {
    id: 3,
    car_name: 'フリード',
    maker: 'honda',
    capacity: 6,
    car_type: 'ミニバン',
    photo_url: './images/image001',
  },
  {
    id: 4,
    car_name: 'クラウン',
    maker: 'toyota',
    capacity: 5,
    car_type: 'セダン',
    photo_url: './images/image001',
  },
  {
    id: 5,
    car_name: 'ノート',
    maker: '日産',
    capacity: 5,
    car_type: 'コンパクト',
    photo_url: './images/image001',
  },
  {
    id: 6,
    car_name: 'プリウス',
    maker: 'toyota',
    capacity: 5,
    car_type: 'セダン',
    photo_url: './images/image001',
  },
  {
    id: 7,
    car_name: 'CX-5',
    maker: 'mazda',
    capacity: 5,
    car_type: 'SUV',
    photo_url: './images/image001',
  },
  {
    id: 8,
    car_name: 'セレナ',
    maker: '日産',
    capacity: 7,
    car_type: 'ミニバン',
    photo_url: './images/image001',
  },
  {
    id: 9,
    car_name: 'アルファード',
    maker: 'toyota',
    capacity: 8,
    car_type: 'ミニバン',
    photo_url: './images/image001',
  },
  {
    id: 10,
    car_name: 'N-BOX',
    maker: 'honda',
    capacity: 4,
    car_type: 'コンパクト',
    photo_url: './images/image001',
  },
];
export const shareCars: ShareCar[] = [
  {
    id: 1,
    user_id: 5,
    car_id: 1,
    carport_id: 1,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 2,
    user_id: 6,
    car_id: 2,
    carport_id: 2,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 3,
    user_id: 7,
    car_id: 3,
    carport_id: 3,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 4,
    user_id: 8,
    car_id: 4,
    carport_id: 4,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 5,
    user_id: 8,
    car_id: 5,
    carport_id: 5,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 6,
    user_id: 8,
    car_id: 6,
    carport_id: 6,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 7,
    user_id: 8,
    car_id: 7,
    carport_id: 7,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 8,
    user_id: 8,
    car_id: 8,
    carport_id: 8,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 9,
    user_id: 8,
    car_id: 9,
    carport_id: 9,
    share_prise: 330,
    share_state: '待機',
  },
  {
    id: 10,
    user_id: 8,
    car_id: 10,
    carport_id: 10,
    share_prise: 330,
    share_state: '待機',
  },
];
