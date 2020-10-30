const Sequelize = require("sequelize");
const database = require("../config");
const Proyecto = require("./Proyectos");
const Tarea = database.define("tarea", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER(11),
  },
  tarea: Sequelize.STRING(50),
  estado: Sequelize.INTEGER(1),
});
Tarea.belongsTo(Proyecto);
module.exports = Tarea;
