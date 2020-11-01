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
      const errores = e.errors;
      res.render("registrar", {
        nombre: "Registrate En Task Manager",
        errores,
      });
    }
  }
}

module.exports = Login;
