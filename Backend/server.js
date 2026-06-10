require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");


connectToDB();


app.get("/", (req, res) => {
  res.send("Backend is running");
});


app.listen(process.env.PORT, () => {

    console.log("Server is running successfully");
})