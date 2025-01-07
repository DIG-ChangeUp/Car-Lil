const reservationsModel = require('./reservations.model');
const shareCarsModel = require('../shareCars/shareCars.model');
module.exports = {
  async addNewReservation(req, res) {
    //reservationsテーブルに新しい予約情報を登録
    const newData = await reservationsModel.save({
      user_id: req.body.user_id,
      share_car_id: req.body.share_car_id,
      carport_id: req.body.carport_id,
      share_state: req.body.share_state,
      reserved_at: req.body.reserved_at,
      rent_at: req.body.rent_at,
      rented_at: req.body.rented_at,
      return_at: req.body.return_at,
      returned_at: req.body.returned_at,
      evaluation: req.body.evaluation,
      is_refueled: null,
      is_washed: null,
    });
    const checkedNewData = await reservationsModel.findById(newData.id);
    if (checkedNewData) {
      res.status(200).json('登録が完了しました');
    } else {
      res.status(400).json('登録ができませんでした');
    }

    //!!!デモのため下の処理は行わない------------
    //上記登録後、対象車両のshare_carsテーブルのshare_stateを'予約'状態に変更
    // const shareStateBefore = await shareCarsModel.findByShareCarId(
    //   req.body.share_car_id
    // );
    // await shareCarsModel.editShareState(
    //   req.body.share_state,
    //   req.body.share_car_id
    // );
    // const shareStateAfter = await shareCarsModel.findByShareCarId(
    //   req.body.share_car_id
    // );
    // if (shareStateBefore !== shareStateAfter && shareStateAfter === '予約') {
    //   res.status(200).send('予約完了');
    //   console.log('予約完了');
    // }
  },

  async findReservationByUserId(req, res) {
    const user_id = req.params.user_id;
    const result = await reservationsModel.findByUserId(user_id);
    res.status(200).send({ data: result });
  },

  async findReservationByShareCarId(req, res) {
    const share_car_id = Number(req.params.share_car_id);
    const result = await reservationsModel.findByShareCarId(share_car_id);
    res.status(200).send({ data: result });
  },
};
