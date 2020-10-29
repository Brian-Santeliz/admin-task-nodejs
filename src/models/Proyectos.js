const Sequelize = require("sequelize");
const database = require("../config");

const Proyecto = database.define("proyecto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: Sequelize.STRING,

  url: Sequelize.STRING,
});

module.exports = Proyecto;