/* ==============================
   USER STORAGE
   ============================== */

function saveUser(user) {
  localStorage.setItem(
    STORAGE_KEYS.USER,
    JSON.stringify(user)
  );
}

function getUser() {
  var user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}


/* ==============================
   AUTH FLAGS
   ============================== */

function setRegistered() {
  localStorage.setItem(STORAGE_KEYS.IS_REGISTERED, "true");
}

function isRegistered() {
  return localStorage.getItem(STORAGE_KEYS.IS_REGISTERED) === "true";
}

function setLoggedIn() {
  localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "true");
}

function isLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === "true";
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
  location.reload();
}

function completeRegistration(user) {
  saveUser(user);
  setRegistered();
  localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "false");
  location.reload();
}




/* ==============================
   EXAM STATE STORAGE
   ============================== */

function saveExamState(examState) {
  localStorage.setItem(
    STORAGE_KEYS.EXAM_STATE,
    JSON.stringify(examState)
  );
}

function getExamState() {
  var state = localStorage.getItem(STORAGE_KEYS.EXAM_STATE);
  return state ? JSON.parse(state) : null;
}

function clearExamState() {
  localStorage.removeItem(STORAGE_KEYS.EXAM_STATE);
}


/* ==============================
   EXAM RESULT STORAGE
   ============================== */

function saveLastResult(result) {
  localStorage.setItem(
    STORAGE_KEYS.LAST_SCORE,
    JSON.stringify(result)
  );
}

function getLastResult() {
  var result = localStorage.getItem(STORAGE_KEYS.LAST_SCORE);
  return result ? JSON.parse(result) : null;
}
