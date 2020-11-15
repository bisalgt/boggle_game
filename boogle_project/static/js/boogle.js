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

  function ajax_call_flask_reset() {
    $.ajax({
      url: "/intermediate",
      type: "GET",
      success: function (response) {
        console.log("successful response");
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  var total_time = 30;
  var difference = 30;
  function countDownTimer() {
    console.log("Difference time", difference);
    if (difference == 0) {
      difference = 30;
      showEntered = [];
      correctAnswers = [];
      var para = document.getElementById("totalGuessesId");
      para.innerHTML = "Total Entered : ";
      var para2 = document.getElementById("validGuessesId");
      para2.innerHTML = "Correct Answers : ";
      ajax_call_flask_reset();
    }
    difference -= 1;
    console.log("Difference-----time", difference);
    var para = document.getElementById("timerId");
    para.innerHTML = difference;
  }

  $("#resetBtnId").click(function () {
    console.log("my counter reset btn pressed", myC);
    clearInterval(myC);
    difference = 30;
    showEntered = [];
    correctAnswers = [];
    var para = document.getElementById("totalGuessesId");
    para.innerHTML = "Total Entered : ";
    var para2 = document.getElementById("validGuessesId");
    para2.innerHTML = "Correct Answers : ";
    document.getElementById("mainGame").style.display = "none";
    document.getElementById("stopBtnId").style.display = "none";
    document.getElementById("resetBtnId").style.display = "none";
    var para3 = document.getElementById("timerId");
    para3.innerHTML = difference;
    console.log("print here");
    $.ajax({
      url: "/",
      type: "GET",
      success: function (response) {
        console.log("successful response by reset");
        // var tableRef = document.getElementsByTagName("table");
        // console.log(tableRef);

        // table update while clicking reset button work remain
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  $("#stopBtnId").click(function () {
    console.log("my counter stop btn pressed", myC);
    clearInterval(myC);
    // counterFunc("stop");
    // counterFunc("stop");
  });
  //   function counterFunc(args) {
  //     if (args == "stop") {
  //       console.log(myCounter, "inside stop of counter");
  //       clearInterval(myCounter);
  //       return "hey";
  //     }
  //     var myCounter = setInterval(countDownTimer, 1000);
  //   }

  //   function counterStartFunc(){
  //     var myCounter = setInterval(countDownTimer, 1000);
  //     return myCounter
  //   }
  var myC;
  $("#countBtnId").click(function () {
    // var value_btn = document.getElementById("countBtnId").value;
    console.log("button clicked of countdown  ");
    console.log("inside if block");
    //   document.getElementById("countBtnId").setAttribute("value", "stop");
    document.getElementById("mainGame").style.display = "inline";
    document.getElementById("stopBtnId").style.display = "inline";
    document.getElementById("resetBtnId").style.display = "inline";
    console.log("button clicked of countdown started");
    // counterFunc("nth");
    myC = setInterval(countDownTimer, 1000);
    //   console.log("inside else block");
    //   document.getElementById("countBtnId").setAttribute("value", "start");
    //   console.log("else block");
    //   difference = 3;
    //   showEntered = [];
    //   correctAnswers = [];
    //   var para = document.getElementById("totalGuessesId");
    //   para.innerHTML = "Total Entered : ";
    //   var para2 = document.getElementById("validGuessesId");
    //   para2.innerHTML = "Correct Answers : ";
    //   document.getElementById("mainGame").style.display = "none";
    //   clearInterval(myCounter);
    //   console.log("print here");
    //   ajax_call_flask_reset();
    // }
  });
});
