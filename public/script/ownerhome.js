$(".edit-btn").on("click", function() {
  $(this)
    .parents()
    .children("#content")
    .addClass("d-none");
  $(this)
    .parents()
    .children("#update")
    .removeClass("d-none");
});

var avgRating = document.querySelectorAll(".avgRating");
for (var i = 0; i < avgRating.length; i++) {
  var rating = parseInt(avgRating[i].innerHTML);
  var star = `<i class="fa fa-star"></i>`.repeat(rating);
  avgRating[i].innerHTML = star;
}
