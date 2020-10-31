const Sequelize = require("sequelize");
const database = require("../config");
const Proyecto = require("./Proyectos");
const bcrypt = require("bcrypt");

const Usuario = database.define(
  "usuario",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11),
    },
    email: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(65),
      allowNull: false,
    },
  },
  {
    hooks: {
      async beforeCreate(usuario) {
        try {
          const { password } = usuario;
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(password, salt);
        } catch (error) {
          console.log(error);
        }
      },
    },
  }
);

/* 1 usuario tiene muchos(m) Proyectos */
Usuario.hasMany(Proyecto);
module.exports = Usuario;
