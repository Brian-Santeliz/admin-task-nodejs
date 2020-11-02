const Sequelize = require("sequelize");
require("dotenv").config({ path: "enviorement.env" });
const sequelize = new Sequelize(
  process.env.BD,
  process.env.USUARIO,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    operatorAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
