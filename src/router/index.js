const { Router } = require("express");
const Home = require("../controller/homeController");
const { body } = require("express-validator");
const controller = new Home();
const router = Router();
router.get("/", controller.homeController);
router.get("/new", controller.newController);
router.post(
  "/new",
  [body("titulo").not().isEmpty().trim().escape()],
  controller.newPostController
);
module.exports = router;
