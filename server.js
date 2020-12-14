const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
app.set("view engine", "ejs");
// app.use(session({ cookie: { maxAge: 60000 }}));
app.use(bodyParser.urlencoded({ extended: true }));
//Routing
app.use(require("./routes/index"));
app.use("/BSQuanLy", require("./routes/BSQuanLy"));
app.use("/BS", require("./routes/BS"));

app.listen(config.port, () => {
  console.log(`SERVER RUNNING AT PORT ${config.port}...`);
});
