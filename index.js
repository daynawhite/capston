require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users")
const petRoutes = require("./routes/pets")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes)
app.use(petRoutes)
const port = process.env.PORT || 3330;
app.get("/",(req, res) => {
    res.json("Welcome to my server.")
})

app.listen(port,() => {
    console.log("listening on port", port)
})