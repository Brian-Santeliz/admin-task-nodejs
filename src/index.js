const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const routerHome = require("./router/");
const database = require("./config");
const Midleware = require("./middleware/helper");
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");
dotenv.config({ path: "enviorement.env" });

const app = express();

app.set("puerto", process.env.PORT || 3000);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const middleware = new Midleware();
app.use(middleware.helper);
app.use("/", routerHome);
database
  .sync()
  .then(() => console.log("Conectado a MySQL"))
  .catch((e) => console.log(e));
app.listen(app.get("puerto"), () => {
  console.log(`Servidor en el puerto: ${app.get("puerto")}`);
});
