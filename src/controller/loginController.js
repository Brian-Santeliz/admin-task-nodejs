const Usuario = require("../models/Usuarios");
const bcrypt = require("bcrypt");
class Login {
  loginGetRegistrar(req, res) {
    res.render("registrar", {
      nombre: "Registrate En Task Manager",
    });
  }
  async loginPostRegistrar(req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        //mandar un error
      }
      const response = await Usuario.create({
        email,
        password,
      });
      res.render("registrar", {});
    } catch (error) {}
  }
}

module.exports = Login;
