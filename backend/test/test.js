const chai = require('chai');
const expect = chai.expect;

const axios = require('axios');
const API_BASE_URL = `http://localhost:${process.env.PORT}`;

// chaiのドキュメント url:https://www.chaijs.com/api/bdd/
/*
 * fetchより、記述の少ないaxiosを使用
 * 返値は以下の構成
 * response = {
 *   data: {},          // サーバーから返されるデータ
 *   status: 200,       // HTTPステータスコード
 * }
 * statusコード 400などはtry,catchを使い、処理をする
 * */

// GET ===========================================
describe('GET /api/reservations/tenant/:user_id', () => {
  it('ステータス200を返す', async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/reservations/tenant/2`
    );
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/reservations/tenant/error`);
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('lengthが１以上ある', async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/reservations/tenant/2`
    );
    const result = response.data;
    expect(result.data.length).to.be.at.least(1);
  });
  it('user_id = 2 のデータのみを持つ', async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/reservations/tenant/2`
    );
    const result = response.data.data.every((value) => value.user_id === 2);
    expect(result).to.true;
  });
  it('正しいkeyと型を持つ', async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/reservations/tenant/2`
    );
    const result = response.data;
    expect(result.data[0]).to.have.property('id').to.be.a('number');
    expect(result.data[0]).to.have.property('user_id').to.be.a('number');
    expect(result.data[0]).to.have.property('share_car_id').to.be.a('number');
    expect(result.data[0]).to.have.property('reserved_at').to.be.a('string');
    expect(result.data[0]).to.have.property('rent_at').to.be.a('string');
    expect(result.data[0]).to.have.property('owner_user_id').to.be.a('number');
    expect(result.data[0]).to.have.property('car_name').to.be.a('string');
    expect(result.data[0]).to.have.property('address').to.be.a('string');
  });
});

describe('GET /api/share/:share_car_id', async () => {
  it('ステータス200を返す', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/share/1`);
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/share/error`);
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
});

// POST ===========================================
describe('POST /api/addUser', async () => {
  it('ステータス200を返す', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/addUser`, {
      email: 'test1@mail.com',
      user_type: 'オーナー',
    });
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/addUser`, {
        email: null,
        user_type: null,
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('ユーザー情報が登録される', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/addUser`, {
      email: 'test2@mail.com',
      user_type: 'オーナー',
    });
    const result = response.data;
    expect(result.data.email).to.equal('test2@mail.com');
    expect(result.data.user_type).to.equal('オーナー');
  });
});

describe('POST /api/users/email', async () => {
  it('ステータス200を返す', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/users/email`, {
      email: 'test2@mail.com',
    });
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/email`, {
        email: 'test3@mail.com',
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('登録されているユーザー情報を取得する', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/users/email`, {
      email: 'test2@mail.com',
    });
    const result = response.data;
    expect(result.email).to.equal('test2@mail.com');
  });
});

describe('POST /api/users/owner/email', async () => {
  it('ステータス200を返す', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/users/owner/email`, {
      email: 'test2@mail.com',
    });
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/owner/email`, {
        email: 'test3@mail.com',
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('登録されているユーザー情報を取得する', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/users/owner/email`, {
      email: 'test2@mail.com',
    });
    const result = response.data;
    expect(result.data[0].email).to.equal('test2@mail.com');
  });
});

describe('POST /api/allCarports', async () => {
  it('ステータス200を返す', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/allCarports`, {
      currentPosition: {
        lat: 35.05274,
        lng: 137.158755,
      },
    });
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/allCarports`, {
        lat: null,
        lng: null,
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('number型のdistance列が含まれている', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/allCarports`, {
      currentPosition: {
        lat: 35.05274,
        lng: 137.158755,
      },
    });
    const result = response.data;
    expect(result.data[0]).to.have.property('distance').to.be.a('number');
  });
});

// describe('POST /api/distance', async () => {
//   it('ステータス200を返す', async () => {
//     const response = await axios.post(`${API_BASE_URL}/api/distance`, {
//       currentPosition: {
//         lat: 35.05274,
//         lng: 137.158755,
//       },
//     });
//     expect(response.status).to.equal(200);
//   });
//   it('ステータス400を返す', async () => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/distance`, {
//         lat: null,
//         lng: null,
//       });
//     } catch (error) {
//       expect(error.response.status).to.equal(400);
//     }
//   });
//   it('carData、distance、duration列を持っている', async () => {
//     const response = await axios.post(`${API_BASE_URL}/api/distance`, {
//       currentPosition: {
//         lat: 35.05274,
//         lng: 137.158755,
//       },
//     });
//     const result = response.data.data[0];
//     expect(result).to.have.property('carData').to.be.an('object');
//     expect(result).to.have.property('distance').to.be.an('object');
//     expect(result).to.have.property('duration').to.be.an('object');
//   });
//   it('carData、distance、duration列内に正しいプロパティを持っている', async () => {
//     const response = await axios.post(`${API_BASE_URL}/api/distance`, {
//       currentPosition: {
//         lat: 35.05274,
//         lng: 137.158755,
//       },
//     });
//     const carData = response.data.data[0].carData;
//     const distance = response.data.data[0].distance;
//     const duration = response.data.data[0].duration;
//     expect(carData).to.have.property('distance').to.be.a('number');
//     expect(distance).to.have.property('text').to.be.an('string');
//     expect(distance).to.have.property('value').to.be.an('number');
//     expect(duration).to.have.property('text').to.be.an('string');
//     expect(duration).to.have.property('value').to.be.an('number');
//   });
// });

describe('POST /api/addNewShareData', async () => {
  const testShareData = {
    user_id: 4,
    carport_id: 1,
    share_car_id: 1,
    start_at: '2025-01-29T00:00',
    end_at: '2025-01-29T23:45',
  };
  it('ステータス200を返す', async () => {
    const response = await axios.post(
      `${API_BASE_URL}/api/addNewShareData`,
      testShareData
    );
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/addNewShareData`, {
        ...testShareData,
        start_at: null,
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('送ったデータと登録されたデータが等しい', async () => {
    const response = await axios.post(
      `${API_BASE_URL}/api/addNewShareData`,
      testShareData
    );
    expect(response.data.data.user_id).to.equal(4);
    expect(response.data.data.carport_id).to.equal(1);
    expect(response.data.data.share_car_id).to.equal(1);
    expect(response.data.data.start_at).to.equal('2025-01-28T15:00:00.000Z');
    expect(response.data.data.end_at).to.equal('2025-01-29T14:45:00.000Z');
  });
});

describe('POST /api/addNewReservation', async () => {
  const testData = {
    user_id: 5,
    share_car_id: 1,
    carport_id: 1,
    share_state: '予約',
    reserved_at: '2025-01-01T0:00:00',
    rent_at: '2025-01-28T07:00:00.000',
    rented_at: null,
    return_at: '2025-01-28T09:00:00.000',
    returned_at: null,
    evaluation: null,
    is_refueled: null,
    is_washed: null,
  };

  const _returnRentalData = {
    carport_id: 1,
    carport_address: '愛知県名古屋市西区',
    share_car_id: 1,
    share_price: 330,
    car_id: 1,
    car_maker: '日産',
    car_name: 'ノートオーラ',
    car_type: 'コンパクト',
    car_capacity: 5,
    car_image_url1: 'noteAura_Ext.png',
    car_image_url2: 'noteAura_Int.png',
    rental_date: '2024-12-19T00:00:00.000Z',
    owner_rental_time: {
      strTime: '07:00',
      endTime: '23:00',
    },
    booking_time: [
      {
        strTime: '14:00',
        endTime: '16:00',
      },
    ],
  };

  it('ステータス200を返す', async () => {
    const response = await axios.post(
      `${API_BASE_URL}/api/addNewReservation`,
      testData
    );
    expect(response.status).to.equal(200);
  });
  it('ステータス400を返す', async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/addNewReservation`, {
        ...testData,
        share_state: null,
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
  it('送ったデータと登録されたデータが等しい', async () => {
    const response = await axios.post(
      `${API_BASE_URL}/api/addNewReservation`,
      testData
    );
    expect(response.data).to.equal('登録が完了しました');
  });
});

describe('POST /api/rentalData', async () => {
  const testRentalData = {
    carport_id: 1,
    carport_address: '愛知県名古屋市西区',
    share_car_id: 1,
    share_price: 330,
    car_id: 1,
    car_maker: '日産',
    car_name: 'ノートオーラ',
    car_type: 'コンパクト',
    car_capacity: 5,
    car_image_url1: 'noteAura_Ext.png',
    car_image_url2: 'noteAura_Int.png',
    rental_date: '2024-12-19T00:00:00.000Z',
    owner_rental_time: {
      strTime: '07:00',
      endTime: '23:00',
    },
    booking_time: [
      {
        strTime: '14:00',
        endTime: '16:00',
      },
    ],
  };
  it('ステータス200を返す', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/rentalData`, {
      share_car_id: 1,
      car_port_id: 1,
    });
    expect(response.status).to.equal(200);
  });
  it('シェアカーID１番のスペーシアカスタムを返す', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/rentalData`, {
      share_car_id: 1,
      car_port_id: 1,
    });
    expect(response.data.data.car_name).to.equal('スペーシアカスタム');
  });
  it('データが無い場合にノートオーラのデモデータが返る', async () => {
    const response = await axios.post(`${API_BASE_URL}/api/rentalData`, {
      share_car_id: 0,
      car_port_id: 0,
    });
    expect(response.data.data).to.deep.equal(testRentalData);
  });
});
