$("#forgotlink").on("click", () => {
  $("#login").addClass("d-none");
  $("#forgot").removeClass("d-none");
});

$("#signuplink").on("click", () => {
  $("#login").addClass("d-none");
  $("#signup").removeClass("d-none");
});
