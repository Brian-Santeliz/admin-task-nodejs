const Usuario = require("../models/Usuarios");
class Login {
  loginGetRegistrar(req, res) {
    res.render("registrar", {
      nombre: "Registrate En Task Manager",
    });
  }
  async loginPostRegistrar(req, res) {
    const { email, password } = req.body;
    try {
      await Usuario.create({
        email,
        password,
      });
      res.redirect("/login");
    } catch (e) {
      req.flash(
        "error",
        e.errors.map((e) => e.message)
      );
      res.render("registrar", {
        mensajeError: req.flash(),
        nombre: "Registrate En Task Manager",
        email,
        password,
      });
    }
  }
}

module.exports = Login;
