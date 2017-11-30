console.log("yo");
var questions = [
  {
    question: "What is 60% of 40?",
    answers: ["24", "25", "26", "27"],
    correctAns: "24"
  },
  {
   question: "Which is the best bargain?",
   answers: ["3.5 kg of washing detergent for $12.60", "1 kg of washing detergent for $3.50", "2 kg of washing detergent for $6.90", "500 g of washing detergent for $1.80"],
   correctAns: "2 kg of washing detergent for $6.90"
  },
  {
    question: "What is 0.75 as the lowest possible fraction",
    answers: ["4.4/3", "3.3/4", "4/3", "3/4"],
    correctAns: "3/4"
  },
  {
    question: "Which is the best bargain?",
    answers: ["250 ml of liquid soap for $2.10", "400 ml of liquid soap for $4.80", "500 ml of liquid soap for $4.30", "1 liter of liquid soap for $9.80"],
    correctAns: "250 ml of liquid soap for $2.10"
  },
  {
    question: "Which is the best bargain?",
    answers: ["Six 150 g pots of yoghurt for $2.70", "Six 125 g pots of yoghurt for $3.00", "One 1 kg pot of yoghurt for $3.20", "One 500 g pot of yoghurt for $1.65"],
    correctAns: "Six 150 g pots of yoghurt for $2.70"
  },
  {
    question: "What is 4995 divided by 15?",
    answers: ["London", "Spokanne", "Paris", "Madrid"],
    correctAns: "Paris"
  },
  {
    question: "What do the numbers 16, 25 and 36 have in common",
    answers: ["Circle", "Triangle", "Square", "Rectangle"],
    correctAns: "Square"
  },
  {
    question: "How many hours are there in seven days?",
    answers: ["169", "168", "162", "165"],
    correctAns: "168"
  }
];

var answerDOM = $("#answers");
var questionDOM = $("#question");
var countDown = 6;
var clear;
var correctAns = 0;
var wrongAns = 0;
var congratsAudio = new Audio('./assets/congrats.flac');

//this will keep track of our index
//supposed to see one question at a time
var nextQuestion = 0;
//then we want to genereate another question
  //prob a func
function generateQuestion (){
  startTimer()

  questionDOM.empty()
  answerDOM.empty()
  $("#displayQuestions").append("<br>");
  questionDOM.append("1" + "." + " " + questions[nextQuestion].question);

  for (var i = 0; i < questions[nextQuestion].answers.length; i++) {
      var btn = $("<button>");
      btn.append(questions[nextQuestion].answers[i]);
      btn.attr("data-answer", questions[nextQuestion].answers[i]);
      btn.attr("id", "answer")
      //show btn on screen
    answerDOM.append(btn)
    }
}

//they can click on one onf the answers and if its correct we increment a counter

// we will need a timer
  //var for how long our timer runs //check
  //setInterval to call a func every 1 second
  function startTimer (){
     clear = setInterval(timer, 1000)
  }
  function timer(){
    //deincrenemt our countdown var
    --countDown
    //each second we want to redisplay the var for timer coundown on the screen
    $("#timer").text("Timer: " + countDown)
    do{
      generateQuestion()
    }
    while(countDown == 0)

    //if cowntdown var is 0 call next question
    calculateScore()
    if (countDown === 0) {
      //increment out next question var
      // ++nextQuestion
      // //stop the countdown
      // clearInterval(clear)
      // //reset our coundown var
      // countDown = 5;
      // //display next question

      clearInterval(clear)
      revealAnswer()
    }
  }

  function calculateScore(){
    $("#answer").on("click", function(){
      if($("#answer").val() === questions[nextQuestion].correctAns){
        console.log("You got the correct the correct answer");
        correctAns++;
        $("#correctAnswers").append("<p> Coreect Answer </p>");
      }
      else{
        console.log("Wrong answer");
        wrongAns++;
        $("#wrongAnswers").append("<p> Your answer is wrong! Correct Answer is "+ questions[nextQuestion].correctAns + "</p>");
      }
    })
  }

  function revealAnswer(){
      if(correctAns > wrongAns){
        congratsAudio.play();

        var img = $("<img>");
        img.attr("src", "../images/con.jpeg"); //this is how we create attributes with jQuery
        img.attr("id", "congrats")
        $("#quiz").html(img);

        $("#scoreDisplay").html()
        var btn = $("<button>");
        btn.attr("id", "reset")
        $("buttons").append(btn)

        btn.on("click", function(){
          $("#start").on("click", function(){
            $("#timer").text("Timer: "+ countDown)
            console.log("hi");
            generateQuestion();
          })

        })
      }
    }

// at the end of the game we will display what they got wrong and right
//



  $("#start").on("click", function(){
    $("#timer").text("Timer: "+ countDown)
    console.log("hi");
    generateQuestion();
  })
