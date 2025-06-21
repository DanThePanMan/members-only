const express = require("express");
const app = express();
const path = require("path");

//set up files for views and public
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

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
