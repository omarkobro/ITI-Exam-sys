function initExam() {
  //check the user state
  var user = getUser();

  if (!user) {
    window.location.href = ROUTES.LOGIN;
    return;
  }
  // init questions
  var qeustionsCopy = QUESTIONS_BANK.slice();
  var shuffledQuesstions = shuffleArray(qeustionsCopy);

  // init exam state
  initExamState(shuffledQuesstions);
  var currentQuestion = getCurrentQuestion();

  //render qeustion
  renderQuestion(currentQuestion);

  renderAnswers(currentQuestion);

  updateNavigationButtons();

  //start exam timer
  startExamTimer(
    function (remainingSeconds) {
      updateTimerDisplay(remainingSeconds);
    },
    function () {
      handleExamTimeOut();
    }
  );

  handleExamEvents();
}

///Handle Exam TIME OUT
function handleExamTimeOut() {
  if (examState.isSubmitted) {
    return;
  }

  examState.isSubmitted = true;
  stopExamTimer();
  examState.score = calcScore();

  saveLastExamResult(examState.score);

  window.location.href = ROUTES.TIMEOUT;
}

//auto-init exam
window.onload = function () {
  initExam();
};

// submit exam
function submitExam() {
  if (examState.isSubmitted) {
    return;
  }

  var confirmSubmit = confirm('Are you sure you want to submit the exam?');
  if (!confirmSubmit) {
    return;
  }

  examState.isSubmitted = true;
  stopExamTimer();
  examState.score = calcScore();


  saveLastExamResult(examState.score);

  window.location.href = ROUTES.RESULT;
}

//////Exam Events
function handleExamEvents() {
  //slect answer event
  var answerContainer = document.getElementById('answers-container');

  answerContainer.addEventListener('change', function (e) {
    if (e.target.name == 'answer') {
      console.log(e.target.value);

      var question = getCurrentQuestion();
      selectAnswer(question.id, parseInt(e.target.value));
      updateProgressBar();
    }
  });

  // next button

  nextBtn = document.getElementById('next-btn');
  nextBtn.addEventListener('click', function () {
    goToNextQuestion();
    renderCurrentQuestion();
  });

  // previous button
  prevBtn = document.getElementById('prev-btn');
  prevBtn.addEventListener('click', function () {
    goToPrevQuestion();
    renderCurrentQuestion();
  });

  /// handle mark for reveiw
  var markBtn = document.getElementById('mark-btn');

  markBtn.addEventListener('click', function () {
    var currentQuestion = examState.questions[examState.currentIndex];

    // console.log(currentQuestion); //CORRECT

    markQuestionToggler(currentQuestion.id);

    renderMarkedQuestionsList();
    updateMarkButton();
  });

  //Submit Btn

  var SubmitBtn = document.getElementById('submitButton');
  SubmitBtn.addEventListener('click', submitExam);
}

///calcualte score

function calcScore() {
  var score = 0;

  for (var i = 0; i < examState.questions.length; i++) {
    var question = examState.questions[i];
    var selectedAnswerIdx = examState.answers[question.id];

    if (selectedAnswerIdx === undefined) {
      continue;
    }

    if (question.answers[selectedAnswerIdx].isCorrect) {
      score++;
    }
  }
  return score;
}
