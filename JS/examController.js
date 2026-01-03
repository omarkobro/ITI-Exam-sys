//auto-init exam
window.onload = function () {
  var savedState = getExamState();

  if (savedState && !savedState.isSubmitted) {
    restoreExam(savedState);
  } else {
    startNewExam();
  }
  // initExam();
};

function startNewExam() {
  sessionStorage.setItem('examStarted', 'true');

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
  var state = initExamState(shuffledQuesstions);

  state.startTime = Date.now();
  saveExamState(state);

  initExam(EXAM_CONFIG.DURATION_SECONDS);
}

//restore exam
function restoreExam(savedState) {
  examState = savedState;
  sessionStorage.setItem('examStarted', 'true');

  // Calculate elapsed time and remaining
  var elapsedMs = Date.now() - examState.startTime;
  var elapsedSeconds = Math.floor(elapsedMs / 1000);
  var remainingTime = EXAM_CONFIG.DURATION_SECONDS - elapsedSeconds;

  if (remainingTime <= 0) {
    handleExamTimeOut();
    return;
  }
  initExam(remainingTime);
}

function initExam(initialRemaining = EXAM_CONFIG.DURATION_SECONDS) {
  var currentQuestion = getCurrentQuestion();

  renderQuestion(currentQuestion);
  renderAnswers(currentQuestion);
  updateNavigationButtons();
  renderMarkedQuestionsList();
  updateProgressBar();
  updateMarkButton();
  //start exam timer
  startExamTimer(
    initialRemaining,
    function (remainingSeconds) {
      updateTimerDisplay(remainingSeconds);
    },
    function () {
      handleExamTimeOut();
    }
  );

  handleExamEvents();
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
      saveExamState(examState);
    }
  });

  // next button

  nextBtn = document.getElementById('next-btn');
  nextBtn.addEventListener('click', function () {
    goToNextQuestion();
    renderCurrentQuestion();
    saveExamState(examState);
  });

  // previous button
  prevBtn = document.getElementById('prev-btn');
  prevBtn.addEventListener('click', function () {
    goToPrevQuestion();
    renderCurrentQuestion();
    saveExamState(examState);
  });

  /// handle mark for reveiw
  var markBtn = document.getElementById('mark-btn');
  markBtn.addEventListener('click', function () {
    var currentQuestion = examState.questions[examState.currentIndex];

    // console.log(currentQuestion); //CORRECT

    markQuestionToggler(currentQuestion.id);

    renderMarkedQuestionsList();
    updateMarkButton();
    saveExamState(examState);
  });

  //Submit Btn
  var SubmitBtn = document.getElementById('submitButton');
  SubmitBtn.addEventListener('click', submitExam);
}

// submit exam
function submitExam() {
  if (examState.isSubmitted) {
    return;
  }

  // var confirmSubmit = confirm('Are you sure you want to submit the exam?');

  // if (!confirmSubmit) {
  //   return;
  // }

  Swal.fire({
    title: 'Are you sure you want to submit the exam?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Submit',
    denyButtonText: `Return to Exam`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success');

      setTimeout(function () {
        examState.isSubmitted = true;
        stopExamTimer();
        examState.score = calcScore();
        //
        sessionStorage.setItem('examStarted', 'false');
        saveLastExamResult(examState.score);
        clearExamState();
        window.location.href = ROUTES.RESULT;
      },1500);
      
    } else if (result.isDenied) {
      return;
    }
  });
}

///Handle Exam TIME OUT
function handleExamTimeOut() {
  if (examState.isSubmitted) {
    return;
  }

  examState.isSubmitted = true;
  stopExamTimer();
  examState.score = calcScore();
  sessionStorage.setItem('examStarted', 'false');

  saveLastExamResult(examState.score);
  clearExamState();

  window.location.href = ROUTES.RESULT;
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
