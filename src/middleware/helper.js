class Midleware {
  helper(req, res, next) {
    res.locals.mensaje = req.flash();
    res.locals.usuario = req.user;
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
