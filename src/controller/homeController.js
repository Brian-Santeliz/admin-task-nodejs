const Proyecto = require("../models/Proyectos");
class Home {
  async homeController(req, res) {
    const proyectos = await Proyecto.findAll();
    res.render("home", {
      nombre: "Administra tus proyectos",
      proyectos,
    });
  }
  async newController(req, res) {
    const proyectos = await Proyecto.findAll();
    res.render("new", {
      nombre: "Nuevo Proyecto",
      proyectos,
    });
  }
  async newPostController(req, res) {
    const { titulo } = req.body;

    let error = [];
    if (!titulo) {
      error.push({ error: "Agrega el titulo al proyecto" });
    }
    if (error.length > 0) {
      res.render("new", {
        nombre: "Nuevo Proyecto",
        error,
      });
      return;
    }
    await Proyecto.create({
      titulo,
    });
    res.redirect("/");
  }
  async proyectoGetController(req, res) {
    try {
      const { url } = req.params;
      const proyecto = await Proyecto.findOne({
        where: { url },
      });
      const proyectos = await Proyecto.findAll();

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
}
module.exports = Home;
