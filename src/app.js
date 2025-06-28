const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: false }));

//imports for passport
const session = require("express-session");
const passport = require("passport");
require("./util/passportUtils")(passport);

//set up files for views and public
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//set up req parsing
app.use(express.urlencoded({ extended: true })); // for form submissions (x-www-form-urlencoded)
app.use(express.json()); // for JSON requests (like fetch/AJAX)

//passport middleware
app.use(
    session({
        secret: "barbeque",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.session());

//routers
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    console.log("on root");
    res.send("Hello world!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
