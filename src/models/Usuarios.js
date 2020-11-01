const Sequelize = require("sequelize");
const database = require("../config");
const Proyectos = require("./Proyectos");
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
      validate: {
        isEmail: {
          msg: "Debes ingresar un email valido.",
        },
        notEmpty: {
          msg: "El email no puede estar vacío.",
        },
      },
      unique: {
        args: true,
        msg: "Este usuario ya existe.",
      },
    },
    password: {
      type: Sequelize.STRING(65),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El password no puede estar vacío.",
        },
      },
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

Usuario.prototype.comparasPassword = async (password, passwordEncriptado) => {
  return await bcrypt.compare(password, passwordEncriptado);
};
/* 1 usuario tiene muchos(m) Proyectos 1:m */
// Usuario.hasMany(Proyectos);
module.exports = Usuario;
