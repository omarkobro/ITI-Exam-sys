//Render Question function
function renderQuestion(question) {
  var questionBody = document.getElementById('question-body');
  var questionNumber = document.getElementById('question-number');

  questionBody.textContent = question.text;

  questionNumber.textContent =
    'Question ' + (getCurrentQuestionIdx() + 1) + ' of ' + totalQuestions();
  updateMarkButton();
  updatePagination();
  updateNavigationButtons();
}

// Render Current Question
function renderCurrentQuestion() {
  var question = getCurrentQuestion();
  var index = getCurrentQuestionIdx();

  renderQuestion(question, index);
  renderAnswers(question);
  updateMarkButton();
  updateNavigationButtons();
  updatePagination();
  updateProgressBar();
}

//Render Answers
function renderAnswers(question) {
  var answerSpans = document.querySelectorAll('.answer-span');
  var raidoButtons = document.getElementsByName('answer');

  var selectedAnswer = getSelectedAnswer(question.id);

  for (var i = 0; i < 4; i++) {
    answerSpans[i].textContent = question.answers[i].text;

    raidoButtons[i].value = i;

    if (selectedAnswer == i) {
      raidoButtons[i].checked = true;
    } else {
      raidoButtons[i].checked = false;
    }
  }
}

///Navigation Buttons

function updateNavigationButtons() {
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');

  if (getCurrentQuestionIdx() === 0) {
    prevBtn.disabled = true;
    prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  if (getCurrentQuestionIdx() === totalQuestions() - 1) {
    nextBtn.disabled = true;
    nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }
}

// exam timer
function updateTimerDisplay(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  var timer = document.getElementById('timer-display');

  if (remainingSeconds < 10) {
    remainingSeconds = '0' + remainingSeconds;
  }

  timer.innerText = minutes + ':' + remainingSeconds;

  if (seconds <= EXAM_CONFIG.DURATION_SECONDS * 0.1) {
    timer.classList.add('bg-red-100', 'text-red-600', 'px-2', 'rounded');
  }
}

//Mark for review

//check if current question is marked
function isMarked() {
  if (examState.questions.length == 0) {
    return false;
  }

  var currentQuestion = examState.questions[examState.currentIndex];

  if (!currentQuestion) {
    return false;
  }

  if (examState.marked.indexOf(currentQuestion.id) != -1) {
    return true;
  } else {
    return false;
  }
}

//Update mark button

function updateMarkButton() {
  var btn = document.getElementById('mark-btn');

  if (isMarked()) {
    btn.querySelector('span').textContent = 'Remove Mark';
  } else {
    btn.querySelector('span').textContent = 'Mark';
  }
}

//Render marked questions list

function renderMarkedQuestionsList() {
  var container = document.getElementById('marked-list-container');
  var template = document.getElementById('marked-item-template');

  container.innerHTML = '';

  for (var i = 0; i < examState.marked.length; i++) {
    var questionId = examState.marked[i];

    var question = null;
    var questionIdx = 0;

    for (var j = 0; j < examState.questions.length; j++) {
      if (examState.questions[j].id == questionId) {
        question = examState.questions[j];
        questionIdx = j;
        break;
      }
    }

    if (question == null) {
      continue;
    }

    var item = template.cloneNode(true);
    item.style.display = 'block';
    item.removeAttribute('id');

    var markedListQuestionNumber = item.querySelector(
      '#marked-list-question-number'
    );

    var markedListQuestionText = item.querySelector(
      '#marked-list-question-text'
    );

    markedListQuestionNumber.textContent = questionIdx + 1;
    markedListQuestionText.textContent = question.text;

    //navigate to the marked question
    item.addEventListener('click', function () {
      examState.currentIndex = questionIdx;

      renderQuestion(question);
      renderAnswers(question);
    });

    container.appendChild(item);
  }
}

//render pagination buttons
function updatePagination() {
  var container = document.getElementById('pagination-container');
  container.innerHTML = '';

  var total = totalQuestions();
  var current = getCurrentQuestionIdx();

  var maxVisible = 5;

  for (var i = 0; i < total && i < maxVisible; i++) {
    createPageButton(i, current, container);
  }

  // dots + last question
  if (total > maxVisible) {
    var dots = document.createElement('span');
    dots.textContent = '...';
    dots.className = 'px-2';
    container.appendChild(dots);

    createPageButton(total - 1, current, container);
  }
}

function createPageButton(index, current, container) {
  var btn = document.createElement('button');
  btn.textContent = index + 1;
  btn.className =
    'w-10 h-10 rounded-lg border border-gray-300 mx-1 cursor-pointer';

  if (index === current) {
    btn.className += ' bg-blue-500 text-white';
  }

  btn.addEventListener('click', function () {
    examState.currentIndex = index;
    renderCurrentQuestion();
  });

  container.appendChild(btn);
}

//Update Progress Bar
function updateProgressBar() {
  var answeredCount = 0;

  for (var key in examState.answers) {
    answeredCount++;
  }

  var percentage = (answeredCount / totalQuestions()) * 100;
  var bar = document.getElementById('progress-bar-fill');

  bar.style.width = percentage + '%';
}
