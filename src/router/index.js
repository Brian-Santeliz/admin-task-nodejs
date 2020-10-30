const { Router } = require("express");
const Home = require("../controller/homeController");
const { body } = require("express-validator");
const controller = new Home();
const router = Router();

//Ruta para home
router.get("/", controller.homeController);
router.get("/new", controller.newController);
router.post(
  "/new",
  [body("titulo").not().isEmpty().trim().escape()],
  controller.newPostController
);

//Rutas para los proyectos
router.get("/proyecto/:url", controller.proyectoGetController);
router.get("/proyecto/editar/:id", controller.proyectoGetEditarController);
module.exports = router;
