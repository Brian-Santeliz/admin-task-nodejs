const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../models/Usuarios");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          return done(null, false, { message: "Credenciales son necesarias." });
        }
        userFind = await Usuario.findOne({
          where: { email },
        });
        if (!userFind) {
          return done(null, false, { message: "Usuario no encontrado." });
        }
        const pass = await userFind.comparasPassword(
          password,
          userFind.password
        );
        if (!pass) {
          done(null, false, {
            message: "Tu contraseña no es correcta.",
          });
          return;
        }
        return done(null, userFind);
      } catch (e) {
        return done(e, false, {
          message: "Ha ocurrido un error con la autenticacion.",
        });
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findOne({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
