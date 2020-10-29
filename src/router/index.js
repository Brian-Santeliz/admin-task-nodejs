const { Router } = require("express");
const Home = require("../controller/homeController");
const controller = new Home();
const router = Router();
router.get("/", controller.homeController);
router.get("/new", controller.newController);
router.post("/new", controller.newPostController);
module.exports = router;
