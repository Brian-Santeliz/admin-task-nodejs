const Tarea = require("../models/Tareas");
const Proyecto = require("../models/Proyectos");
class Tareas {
  async tareaPostController(req, res, next) {
    try {
      const { url } = req.params;
      const { tarea } = req.body;
      const proyecto = await Proyecto.findOne({
        where: { url },
      });

      if (!tarea) {
        const proyectos = await Proyecto.findAll();
        const tareas = await Tarea.findAll({
          where: { proyectoId: proyecto.id },
        });
        res.render("tarea", {
          error: "Agrega una tarea",
          proyecto,
          nombre: "Comienza Agregando Tarea",
          proyectos,
          tareas,
        });
        return;
      }
      const insert = await Tarea.create({
        tarea,
        estado: 0,
        proyectoId: proyecto.id,
      });
      if (!insert) return next();
      res.redirect(`/proyecto/${proyecto.url}`);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Tareas;
