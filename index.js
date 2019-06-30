require("dotenv").config();
const express = require("express");
const app = express();
const ownerslogin = require("./ownerslogin");
const customerslogin = require("./customerslogin");
const customerhome = require("./customerhome");
const restaurant = require("./restaurant");
const exphbs = require("express-handlebars");
const mongoClient = require("mongodb").MongoClient;
const session = require("express-session");
app.locals.loggedin;
app.locals.username;
var url = process.env.MY_DB;

mongoClient.connect(url, (err, client) => {
  if (err) throw err;
  app.locals.db = client.db("tableHopper");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(
  session({
    secret: "Express session secret!"
  })
);

app.use("/", customerslogin);
app.use("/ownerslogin", ownerslogin);
app.use("/customerhome", customerhome);
app.use("/restaurant", restaurant);

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
