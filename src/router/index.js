const { Router } = require("express");
const { body } = require("express-validator");
const Proyecto = require("../controller/proyectoController");
const Tareas = require("../controller/tareaController");
const proyectoController = new Proyecto();
const tareaController = new Tareas();
const router = Router();

router.get("/", proyectoController.homeController);
router.get("/new", proyectoController.newController);
router.post(
  "/new",
  body("titulo").not().isEmpty().trim().escape(),
  proyectoController.newPostController
);
router.get("/proyecto/:url", proyectoController.proyectoGetController);
router.get(
  "/proyecto/editar/:id",
  proyectoController.proyectoGetEditarController
);
router.post(
  "/proyecto/editar/:id",
  body("titulo").not().isEmpty().trim().escape(),
  proyectoController.proyectoPostEditarController
);
router.delete(
  "/proyecto/eliminar/:url",
  proyectoController.proyectoDeleteController
);

router.post(
  "/tarea/agregar/:url",
  body("tarea").not().isEmpty().trim().escape(),
  tareaController.tareaPostController
);

module.exports = router;
