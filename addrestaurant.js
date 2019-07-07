const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

var upload = multer({ dest: "public/images" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

router.get("/", (req, res) => {
  res.render("addrestaurant", {
    title: "Add Restaurant",
    assets: "addrestaurant",
    logolink: "/ownerhome",
    navlink: req.app.locals.ownerusername,
    option1: "Home",
    navadd1: "/ownerhome",
    option2: "Logout",
    navadd2: "/ownerslogin/logout"
  });
});

router.post("/add", upload.array("photos", 3), async (req, res) => {
  var db = req.app.locals.db;
  var result = [];
  for (var i = 0; i < req.files.length; i++) {
    result.push(
      await cloudinary.uploader.upload(req.files[i].path, {
        width: 1880,
        height: 1058
      })
    );
  }
  console.log(result);
  db.collection("restaurants").insert({
    ownerName: req.app.locals.ownerusername,
    restaurantName: req.body.restaurantName,
    restaurantSlogan: req.body.restaurantSlogan,
    description: req.body.description,
    photo1: result[0].secure_url,
    photo2: result[1].secure_url,
    photo3: result[2].secure_url
  });
  res.redirect("/ownerhome");
});

module.exports = router;
