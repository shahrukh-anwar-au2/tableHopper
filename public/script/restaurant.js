var h5 = document.querySelectorAll("h5");
for (var i = 0; i < h5.length; i++) {
  var rating = parseFloat(h5[i].innerHTML);
  var star = `<i class="fa fa-star"></i>`.repeat(rating);
  h5[i].innerHTML = star;
}
