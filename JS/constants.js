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

// GitHub Pages–safe base path
const REPO_NAME = 'ITI-Exam-sys';

const BASE_PATH = window.location.hostname.includes('github.io')
  ? `/${REPO_NAME}`
  : '';

const ROUTES = {
  INDEX: `${BASE_PATH}/index.html`,
  LOGIN: `${BASE_PATH}/HTML/login.html`,
  SIGNUP: `${BASE_PATH}/HTML/signUp.html`,
  INSTRUCTIONS: `${BASE_PATH}/HTML/examInstruction.html`,
  EXAM: `${BASE_PATH}/HTML/exam.html`,
  RESULT: `${BASE_PATH}/HTML/result.html`,
};
