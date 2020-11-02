const Helper = require("../helpers/prettier");

class Midleware extends Helper {
  helper(req, res, next) {
    const controlador = new Helper();
    res.locals.helper = controlador;
    res.locals.mensaje = req.flash();
    next();
  }
  authMiddleware(req, res, next) {
    const autenticado = req.isAuthenticated();
    if (!autenticado) {
      res.redirect("/login");
      return;
    }
    next();
  }
}
module.exports = Midleware;
