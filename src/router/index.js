const { Router } = require("express");
const { body } = require("express-validator");
const Proyecto = require("../controller/proyectoController");
const Tareas = require("../controller/tareaController");
const Login = require("../controller/loginController");
const Middleware = require("../middleware/helper");
const proyectoController = new Proyecto();
const tareaController = new Tareas();
const loginController = new Login();
const auth = new Middleware();
const router = Router();

router.get("/", auth.authMiddleware, proyectoController.homeController);
router.get("/new", auth.authMiddleware, proyectoController.newController);
router.post(
  "/new",
  auth.authMiddleware,
  body("titulo").not().isEmpty().trim().escape(),
  proyectoController.newPostController
);
router.get(
  "/proyecto/:url",
  auth.authMiddleware,
  proyectoController.proyectoGetController
);
router.get(
  "/proyecto/editar/:id",
  auth.authMiddleware,
  proyectoController.proyectoGetEditarController
);
router.post(
  "/proyecto/editar/:id",
  auth.authMiddleware,
  body("titulo").not().isEmpty().trim().escape(),
  proyectoController.proyectoPostEditarController
);
router.delete(
  "/proyecto/eliminar/:url",
  auth.authMiddleware,
  proyectoController.proyectoDeleteController
);

router.post(
  "/tarea/agregar/:url",
  auth.authMiddleware,
  body("tarea").not().isEmpty().trim().escape(),
  tareaController.tareaPostController
);
router.patch(
  "/tarea/actualizar/:id",
  auth.authMiddleware,
  tareaController.tareaPatchController
);
router.delete(
  "/tarea/eliminar/:id",
  auth.authMiddleware,
  tareaController.tareaDeleteController
);

router.get("/registrar", loginController.loginGetRegistrar);
router.post("/registrar", loginController.loginPostRegistrar);
router.get("/login", loginController.loginGetIniciar);
router.post("/login", loginController.loginPostIniciar);
router.get("/logout", loginController.loginGetLogout);
module.exports = router;
