/* const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "leavemgt",
  password: "root",
  port: 5432,
});


pool.connect()
module.exports=pool; */

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_DATABASE_USER,
    process.env.PG_DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    }
);

module.exports = sequelize