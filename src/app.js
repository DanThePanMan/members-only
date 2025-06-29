const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: false }));
const db = require("./models/db.js");

//imports for passport
const session = require("express-session");
const passport = require("passport");
require("./util/passportUtils")(passport);

//set up files for views and public
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//set up req parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    if (!req.user) {
        res.redirect("/members_only");
    } else {
        res.redirect("/posts");
    }
});

app.get("/members_only", (req, res) => {
    res.render("members_only");
});

app.get("/posts", async (req, res) => {
    console.log("on root");
    const posts = await db.getPosts();
    let user = req.user;

    if (posts) {
        res.render("index", { posts, user });
    } else {
        res.status(500).send("Error 500, internal server error");
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
