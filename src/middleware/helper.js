const Helper = require("../helpers/prettier");

/* 
Colocar aqui todos los metodos para los middlewares
 para solo instancear una clase 
 */
class Midleware extends Helper {
  helper(req, res, next) {
    const controlador = new Helper();
    res.locals.helper = controlador;
    next();
  }
}
module.exports = Midleware;
