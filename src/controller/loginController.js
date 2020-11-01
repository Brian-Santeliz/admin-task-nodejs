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
      return;
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
  loginGetIniciar(req, res) {
    res.render("login", {
      nombre: "Inicia Sessión Administra tus tareas",
    });
  }
}

module.exports = Login;
