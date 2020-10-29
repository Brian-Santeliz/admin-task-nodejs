const Proyecto = require("../models/Proyectos");
class Home {
  homeController(req, res) {
    res.render("home", {
      nombre: "Administra tus proyectos",
    });
  }
  newController(req, res) {
    res.render("new", {
      nombre: "Nuevo Proyecto",
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
    res.render("new", {
      nombre: "Nuevo Proyecto",
    });
  }
}
module.exports = Home;
