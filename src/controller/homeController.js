const Proyecto = require("../models/Proyectos");
class Home {
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
      if (!proyecto) return res.send("No existe este proyecto");
      res.render("tarea", {
        nombre: "Comienza Agregando Tarea",
        proyecto,
        proyectos,
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
}
module.exports = Home;
