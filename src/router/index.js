const { Router } = require("express");
const { body } = require("express-validator");
const Proyecto = require("../controller/proyectoController");
const Tareas = require("../controller/tareaController");
const Login = require("../controller/loginController");
const proyectoController = new Proyecto();
const tareaController = new Tareas();
const loginController = new Login();
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
router.patch("/tarea/actualizar/:id", tareaController.tareaPatchController);
router.delete("/tarea/eliminar/:id", tareaController.tareaDeleteController);

//RUTA PARA LOGIN Y REGISTER
router.get("/registrar", loginController.loginGetRegistrar);
router.post("/registrar", loginController.loginPostRegistrar);
module.exports = router;
