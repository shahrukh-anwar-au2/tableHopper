const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.app.locals.loggedin == true) {
    const db = req.app.locals.db;
    db.collection("restaurants")
      .find()
      .sort({ avgRating: -1 })
      .toArray((err, result) => {
        if (err) throw err;
        res.render("customerhome", {
          title: "Home",
          assets: "customerhome",
          navlink: req.app.locals.username,
          option1: "Logout",
          navadd1: "/logout",
          data: result
        });
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
