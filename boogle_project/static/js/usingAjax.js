$("document").ready(function () {
  var numbers = [1, 2, 3];
  $("#butn").click(function () {
    console.log("button clicked");
    $.ajax({
      url: "/js",
      type: "POST",
      data: { name: "bishal" },
      success: function (response) {
        console.log("successful");
        numbers.push(1);
        console.log(numbers);
        var para = document.createElement("p");
        var paraText = document.createTextNode("Response" + numbers);
        para.appendChild(paraText);
        var element = document.getElementById("div1");
        console.log(element, " this is the element div");
        element.appendChild(para);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  function ajax_call_flask() {
    $.ajax({
      url: "/js",
      type: "POST",
      data: { name: "bishal" },
      success: function (response) {
        console.log("successful");
        numbers.push(1);
        console.log(numbers);
        var para = document.createElement("p");
        var paraText = document.createTextNode("Response" + numbers);
        para.appendChild(paraText);
        var element = document.getElementById("div1");
        console.log(element, " this is the element div");
        element.innerHTML = "";
        element.appendChild(para);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  var total_time = 5;
  var difference = 5;
  function countDownTimer() {
    console.log("Difference time", difference);
    if (difference == 0) {
      difference = 5;
      ajax_call_flask();
    }
    difference -= 1;
    console.log("Difference-----time", difference);
    var para = document.getElementById("timerId");
    para.innerHTML = difference;
  }
  setInterval(countDownTimer, 1000);
});
