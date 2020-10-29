const Sequelize = require("sequelize");
const database = require("../config");
const slug = require("slug");
const id = require("shortid");

const Proyecto = database.define(
  "proyecto",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: Sequelize.STRING,

    url: Sequelize.STRING,
  },
  {
    hooks: {
      beforeCreate(modelo) {
        const { titulo } = modelo;
        let url = slug(titulo);
        url = `${url}-${id()}`;
        modelo.url = url;
      },
    },
  }
);

module.exports = Proyecto;
