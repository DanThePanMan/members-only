const LocalStrategy = require("passport-local").Strategy;
const { Pool } = require("pg");
require("dotenv").config({
    path: require("path").resolve(__dirname, "../../.env"),
});
const pool = new Pool({
    connectionString: process.env.DATABASE_CONNECTION_STRING,
});
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
    localStrategy = new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (username, password, done) => {
            try {
                const { rows } = await pool.query(
                    "SELECT * FROM users WHERE email = $1",
                    [username]
                );
                const user = rows[0];

                if (!user) {
                    return done(null, false, { message: "Incorrect username" });
                }
                const match = await bcrypt.compare(
                    password,
                    String(user.password)
                );
                if (!match) {
                    return done(null, false, { message: "Incorrect password" });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    );

    passport.use(localStrategy);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const { rows } = await pool.query(
                "SELECT * FROM users WHERE id = $1",
                [id]
            );
            const user = rows[0];

            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
