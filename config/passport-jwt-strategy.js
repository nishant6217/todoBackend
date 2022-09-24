const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const Person = require("../models/individualPerson");

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "person",
};
passport.use(
    new JWTStrategy(opts, async (jwtPayload, done) => {
        try {
            const person = await Person.findById(jwtPayload._id);
            if (person) {
                return done(null, person);
            }
            return done(null, false);
        } catch (error) {
            console.log("error ", error);
            return res.status(500).json({
                message: "internal server error",
                error,
            });
        }
    })
);

passport.serializeUser((person, done) => {
    return done(null, person.id);
});

passport.deserializeUser((id, done) => {
    Person.findById(id, (err, person) => {
        if (err) {
            console.log("Error in finding user in passport");
            return done(err);
        }
        return done(null, person);
    });
});

passport.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    // if user is not signed in
    return res.status(401).json({
        message: "Unauthorized",
    });
};

module.exports = passport;
