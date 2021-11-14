const bcrypt = require("bcrypt");
const passport = require("passport");
const {Strategy} = require("passport-local");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const User = require("../models/User");

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => bcrypt.hashSync(password, 10, null);

passport.use(
    "login",
    new Strategy((username, password, done) => {
        User.findOne({username}, (err, user) => {
            if (err) return done(err);
            if (!user) {
                console.log("Usuario no encontrado");
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log("Contraseña incorrecta");
                return done(null, false);
            }
            return done(null, user);
        });
    })
);

passport.use(
    "signup",
    new Strategy({passReqToCallback: true}, (req, username, password, done) => {
        User.findOne({username}, (err, user) => {
            if (err) return done(err);
            if (user) {
                console.log("El usuario ya existe");
                return done(null, false);
            }
            const newUser = {
                ...req.body,
                username,
                password: createHash(password)
            };

            User.create(newUser, (err, user) => {
                if (err) return done(err);
                console.log("Usuario creado");
                return done(null, user);
            });
        });
    })
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/facebook/callback",
            profileFields: ["id", "displayName", "photos"],
            scope: ["email"]
        },
        (accesToken, refreshToken, userProfile, done) => {
            console.log(userProfile);
            return done(null, userProfile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    done(null, id);
});

module.exports = passport;
