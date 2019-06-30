var avgRating = document.querySelectorAll(".avgRating");
for (var i = 0; i < avgRating.length; i++) {
  var rating = parseInt(avgRating[i].innerHTML);
  var star = `<i class="fa fa-star"></i>`.repeat(rating);
  avgRating[i].innerHTML = star;
}
