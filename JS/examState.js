var examState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  marked: [],
  isSubmitted: false,
  score: 0,
};

// intialize the exam

function initExamState(shuffledQuesstions) {
  examState.questions = shuffledQuesstions;
  examState.currentIndex = 0;
  examState.answers = {};
  examState.marked = [];
  examState.isSubmitted = false;
  examState.score = 0;
}

// get the currrent question index

function getCurrentQuestionIdx() {
  return examState.currentIndex;
}

// get the current question

function getCurrentQuestion() {
  return examState.questions[getCurrentQuestionIdx()];
}

// get total number of questions

function totalQuestions() {
  return examState.questions.length;
}

// get selected answer

function getSelectedAnswer(questionId) {
  return examState.answers[questionId];
}

//check if a qeustion is marked

function isQuestionMarked(questionId) {
  if (examState.marked.indexOf(questionId) != -1) {
    return examState.marked.indexOf(questionId);
  } else {
    return;
  }
}

//got to the next question
function goToNextQuestion() {
  if (examState.currentIndex < examState.questions.length - 1) {
    examState.currentIndex++;
  }
}

//go to the prev qeustion

function goToPrevQuestion() {
  if (examState.currentIndex > 0) {
    examState.currentIndex--;
  }
}

//select answes
function selectAnswer(questionId, answerIdx) {
  if (examState.isSubmitted) {
    return;
  }

  examState.answers[questionId] = answerIdx; //creates a new key and value pair
}

//mark and un mark questions
function markQuestionToggler(questionId) {
  if (examState.isSubmitted) {
    return;
  }

  //check if it already exist in the marked list
  var index = examState.marked.indexOf(questionId);

  // console.log(index); //correct

  if (index == -1) {
    examState.marked.push(questionId);
    // console.log('test from the true case in toggler');

    // console.log(examState.marked);

  } else {
    // console.log('test from the false case in toggler');

    examState.marked.splice(index, 1);
  }
}
