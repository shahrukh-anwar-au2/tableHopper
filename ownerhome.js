const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.get("/", (req, res) => {
  if (req.app.locals.ownerloggedid == true) {
    const db = req.app.locals.db;
    db.collection("restaurants")
      .find({ ownerName: req.app.locals.ownerusername })
      .sort({ avgRating: -1 })
      .toArray((err, result) => {
        if (err) throw err;
        res.render("ownerhome", {
          title: "Home",
          assets: "ownerhome",
          navlink: req.app.locals.ownerusername,
          option1: "Add Restaurant",
          navadd1: "/addrestaurant",
          option2: "Logout",
          navadd2: "/ownerslogin/logout",
          data: result
        });
      });
  } else {
    res.redirect("/ownerslogin");
  }
});

router.post("/update", (req, res) => {
  var db = req.app.locals.db;
  db.collection("restaurants").updateOne(
    { restaurantName: req.body.restaurantName },
    {
      $set: {
        restaurantSlogan: req.body.restaurantSlogan,
        description: req.body.description
      }
    }
  );
  res.redirect("/ownerhome");
});

router.get("/:id", (req, res) => {
  var db = req.app.locals.db;
  db.collection("restaurants").deleteOne(
    { _id: ObjectId(req.params.id) },
    (err, result) => {
      if (err) throw err;
      res.redirect("/ownerhome");
    }
  );
});

module.exports = router;
