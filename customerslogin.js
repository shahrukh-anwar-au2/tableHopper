var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("customerslogin", {
    title: "Login",
    assets: "customerslogin",
    logolink: "/",
    navlink: "Login as Customer",
    option1: "Login as Restaurant Owner",
    navadd1: "/ownerslogin"
  });
});

router.post("/signup", (req, res) => {
  var db = req.app.locals.db;
  db.collection("customersLoginData").insert(req.body);
  res.redirect("/");
});

router.post("/login", (req, res) => {
  var db = req.app.locals.db;
  db.collection("customersLoginData")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          req.body.username == result[i].username &&
          req.body.password == result[i].password
        ) {
          req.session.loggedin = true;
          req.app.locals.loggedin = req.session.loggedin;
          req.session.username = result[i].username;
          req.app.locals.username = req.session.username;
        }
      }
      res.redirect("/customerhome");
    });
});

router.post("/forgot", (req, res) => {
  var db = req.app.locals.db;
  db.collection("customersLoginData")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        if (
          req.body.username == result[i].username &&
          req.body.securityQues == result[i].securityQues
        ) {
          db.collection("customersLoginData").updateOne(
            { username: result[i].username },
            {
              $set: { password: req.body.password }
            }
          );
        }
      }
      res.redirect("/");
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.app.locals.loggedin = false;
  req.app.locals.username = "";
  res.redirect("/");
});

module.exports = router;
