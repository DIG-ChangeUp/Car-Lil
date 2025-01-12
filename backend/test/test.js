const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const axios = require('axios');
const API_BASE_URL = `http://localhost:${process.env.PORT}`;
chai.use(chaiHttp);

// chai url:https://www.chaijs.com/api/bdd/
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

  it('正しいkeyと型を持つ', async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/reservations/tenant/2`
    );
    const result = response.data;
    expect(result.data[0]).to.have.property('id').to.be.a('number');
    expect(result.data[0]).to.have.property('share_car_id').to.be.a('number');
    expect(result.data[0]).to.have.property('reserved_at').to.be.a('string');
    expect(result.data[0]).to.have.property('rent_at').to.be.a('string');
    expect(result.data[0]).to.have.property('owner_user_id').to.be.a('number');
    expect(result.data[0]).to.have.property('car_name').to.be.a('string');
    expect(result.data[0]).to.have.property('address').to.be.a('string');
  });
});
