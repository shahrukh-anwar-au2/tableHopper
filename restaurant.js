const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
var reviews;
var resId;
var upload = multer({ dest: "public/images" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

router.get("/:id", (req, res) => {
  if (req.app.locals.loggedin == true) {
    resId = req.params.id;
    var db = req.app.locals.db;
    db.collection("reviews")
      .find({ resId: req.params.id })
      .toArray((err, result) => {
        if (err) throw err;
        reviews = result;
      });
    db.collection("restaurants")
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, result) => {
        if (err) throw err;
        res.render("restaurant", {
          title: "Restaurant",
          assets: "restaurant",
          logolink: "/customerhome",
          navlink: req.app.locals.username,
          option1: "Home",
          option2: "Logout",
          navadd1: "/customerhome",
          navadd2: "/logout",
          data: result,
          reviewData: reviews
        });
      });
  } else {
    res.redirect("/");
  }
});

router.post("/reviews", upload.single("photo"), async (req, res) => {
  var db = req.app.locals.db;

  const result = await cloudinary.uploader.upload(req.file.path, {
    width: 400,
    height: 300
  });
  console.log(result);
  db.collection("reviews").insert({
    rating: req.body.rating,
    review: req.body.review,
    photo: result.secure_url,
    resId: resId,
    username: req.app.locals.username
  });
  db.collection("reviews")
    .find({ resId: resId })
    .toArray((err, result) => {
      if (err) throw err;
      var ratingSum = 0;
      var len = result.length;
      for (var i = 0; i < len; i++) {
        ratingSum += parseFloat(result[i].rating);
      }
      var avgRating = ratingSum / len;
      var db = req.app.locals.db;
      db.collection("restaurants").updateOne(
        { _id: ObjectId(resId) },
        { $set: { avgRating: avgRating } }
      );
    });
  res.redirect("/restaurant/" + resId);
});

module.exports = router;
