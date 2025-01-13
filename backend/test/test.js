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
  it('lengthが１以上ある', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/share/1`);
    const result = response.data;
    console.log('👻👻👻👻👻', result.data, '👻👻👻👻👻');
    expect(result.data.length).to.be.at.least(1);
  });
});

// POST ===========================================
describe('POST /api/addUser', async () => {});
describe('POST /api/users/email', async () => {});
describe('POST /api/users/owner/email', async () => {});
describe('POST /api/allCarports', async () => {});
describe('POST /api/distance', async () => {});
describe('POST /api/addNewShareData', async () => {});
describe('POST /api/addNewReservation', async () => {});
describe('POST /api/rentalData', async () => {});
