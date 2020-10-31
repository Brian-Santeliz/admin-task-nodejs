const Tarea = require("../models/Tareas");
const Proyecto = require("../models/Proyectos");
class Tareas {
  async tareaPostController(req, res, next) {
    try {
      const { url } = req.params;
      const { tarea } = req.body;
      const [proyectos, proyecto] = await Promise.all([
        Proyecto.findAll(),
        Proyecto.findOne({
          where: { url },
        }),
      ]);
      if (!tarea) {
        res.render("tarea", {
          error: "Agrega una tarea",
          proyecto,
          nombre: "Comienza Agregando Tarea",
          proyectos,
        });
        return;
      }
      const insert = await Tarea.create({
        tarea,
        estado: 0,
        proyectoId: proyecto.id,
      });
      //en caso de que no se pueda agregar
      if (!insert) return next();
      res.redirect(`/proyecto/${proyecto.url}`);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Tareas;
