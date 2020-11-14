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
  var total_time = 30;
  var difference = 30;
  function countDownTimer() {
    console.log("Difference time", difference);

    difference -= 1;
    console.log("Difference-----time", difference);
    var para = document.getElementById("timerId");
    para.innerHTML = difference;
  }
  setInterval(countDownTimer, 1000);
});
