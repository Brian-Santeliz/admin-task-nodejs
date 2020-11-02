const mysqlSession = require("express-mysql-session");
module.exports = sessionStore = new mysqlSession({
  host: "localhost",
  port: 3306,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.BD,
});
