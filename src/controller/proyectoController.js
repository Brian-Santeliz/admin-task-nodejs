const Proyecto = require("../models/Proyectos");
const Tarea = require("../models/Tareas");
class Proyectos {
  async homeController(req, res) {
    try {
      const proyectos = await Proyecto.findAll();
      res.render("home", {
        nombre: "Administra tus proyectos",
        proyectos,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async newController(req, res) {
    try {
      const proyectos = await Proyecto.findAll();
      res.render("new", {
        nombre: "Nuevo Proyecto",
        proyectos,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async newPostController(req, res) {
    try {
      const proyectos = await Proyecto.findAll();
      const { titulo } = req.body;
      let error = [];
      if (!titulo) {
        error.push({ error: "Agrega el titulo al proyecto" });
      }
      if (error.length > 0) {
        res.render("new", {
          nombre: "Nuevo Proyecto",
          error,
          proyectos,
        });
        return;
      }
      await Proyecto.create({
        titulo,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
  async proyectoGetController(req, res) {
    try {
      const { url } = req.params;
      const promiseOne = Proyecto.findOne({
        where: { url },
      });
      const promiseTwo = Proyecto.findAll();

      const [proyecto, proyectos] = await Promise.all([promiseOne, promiseTwo]);
      const tareas = await Tarea.findAll({
        where: {
          proyectoId: proyecto.id,
        },
      });
      if (!proyecto) return res.send("No existe este proyecto");
      res.render("tarea", {
        nombre: "Comienza Agregando Tarea",
        proyecto,
        proyectos,
        tareas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async proyectoGetEditarController(req, res) {
    try {
      const { id } = req.params;
      const [proyecto, proyectos] = await Promise.all([
        Proyecto.findOne({
          where: { id },
        }),
        Proyecto.findAll(),
      ]);
      res.render("new", {
        nombre: `Editar Proyecto - ${proyecto.titulo}`,
        proyecto,
        proyectos,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async proyectoPostEditarController(req, res) {
    try {
      const { id } = req.params;
      const { titulo } = req.body;
      let error = [];
      const [proyecto, proyectos] = await Promise.all([
        Proyecto.findOne({
          where: { id },
        }),
        Proyecto.findAll(),
      ]);
      if (!titulo) {
        error.push({ error: "Agrega el titulo al proyecto" });
      }
      if (error.length > 0) {
        res.render("new", {
          nombre: `Editar Proyecto - ${proyecto.titulo}`,
          error,
          proyectos,
          proyecto,
        });
        return;
      }
      await Proyecto.update(
        {
          titulo,
        },
        {
          where: { id },
        }
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
  async proyectoDeleteController(req, res, next) {
    try {
      const { url } = req.query;
      const response = await Proyecto.destroy({
        where: { url },
      });
      if (!response) return next();
      res.status(200).json("Proyecto eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Proyectos;
