const Usuario = require("../models/Usuarios");
class Login {
  loginGetRegistrar(req, res) {
    res.render("registrar", {
      nombre: "Registrate En Task Manager",
    });
  }
  async loginPostRegistrar(req, res) {
    try {
      const { email, password } = req.body;
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
        nombre: "Registrate En Task Manager",
        mensajeError: req.flash(),
      });
    }
  }
}

module.exports = Login;
