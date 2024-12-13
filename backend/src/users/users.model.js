require("dotenv").config({ path: "../../.env" });

const environment = process.env.NODE_ENV;
const config = require("../../knexfile")[environment];
const db = require("knex")(config)

const USERS_TABLE="users"

module.exports={
  USERS_TABLE,
  async all(limit) {
    return await db(USERS_TABLE).limit(limit)
  },
  async find(id) {
    return await db(USERS_TABLE).where({id})
  },
  async save(data){
    await db.table(USERS_TABLE).insert(data)
    return this.find(data.id)
  }
}
