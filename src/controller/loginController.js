class Login {
  loginGetRegistrar(req, res) {
    res.render("registrar", {
      nombre: "Registrate En Task Manager",
    });
  }
}

module.exports = Login;
