$("document").ready(function () {
  $("#butn").click(function () {
    console.log("button clicked");
    $.ajax({
      url: "/js",
      type: "POST",
      data: { name: "bishal" },
      success: function (response) {
        console.log("successful");
        console.log(response);
      },
    });
  });
});
