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
  newPostController(req, res) {
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
  }
}
module.exports = Home;
