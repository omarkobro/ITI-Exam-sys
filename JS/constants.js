/* ==============================
   Local Storage Keys
   ============================== */
var STORAGE_KEYS = {
  USER: 'exam_user',
  IS_REGISTERED: 'is_registered',
  IS_LOGGED_IN: 'is_logged_in',
  EXAM_STATE: 'exam_state',
  LAST_SCORE: 'last_score',
};

/* ==============================
   Exam Configuration
   ============================== */
var EXAM_CONFIG = {
  DURATION_SECONDS: 600, // 10 minutes
  QUESTIONS_COUNT: null, // null = use all questions
};

/* ==============================
   UI / Navigation
   ============================== */

var ROUTES = {
  INDEX: 'index.html',
  SIGNUP: 'signUp.html',
  LOGIN: 'login.html',
  INSTRUCTIONS: 'examInstruction.html',
  EXAM: 'exam.html',
  RESULT: 'result.html',
  TIMEOUT: 'timeOut.html',
};
