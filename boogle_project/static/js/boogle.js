$("document").ready(function () {
  var showEntered = [];
  var correctAnswers = [];
  $("#btnId").click(function () {
    console.log("Button clicked", document.getElementById("inputId").value);
    var newGuess = $("#inputId").val();
    showEntered.push(newGuess);
    var inputContent = document.getElementById("inputId");
    // inputContent.setAttribute("value", "");
    inputContent.value = "";
    console.log(inputContent);
    console.log("show entered", showEntered);
    $.ajax({
      url: "/",
      type: "POST",
      data: { enterData: showEntered, guess: newGuess },
      success: function (response) {
        console.log("successful response");
        console.log(showEntered, "show entered total");
        var para = document.getElementById("totalGuessesId");
        para.innerHTML = "Total Entered : " + showEntered;
        console.log(response);
        if (response["result"]) {
          correctAnswers.push(newGuess);
        }
        var para2 = document.getElementById("validGuessesId");
        para2.innerHTML = "Correct Answers : " + correctAnswers;
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
