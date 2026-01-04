function shuffleArray(arr) {
  var currentIdx = arr.length;
  var tempValue;
  var randomIdx;

  while (currentIdx != 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);

    currentIdx--;

    tempValue = arr[currentIdx];
    arr[currentIdx] = arr[randomIdx];
    arr[randomIdx] = tempValue;
  }

  return arr;
}

function openLogin() {
  if (!isLoggedIn()) {
    window.location.href = ROUTES.LOGIN;
  }
}
function openRegister() {
  if (!isLoggedIn()) {
    window.location.href = ROUTES.SIGNUP;
  }
}
function openExamPreview() {
  if (!isLoggedIn()) {
    window.location.href = ROUTES.LOGIN;
  } else {
    window.location.replace(ROUTES.INSTRUCTIONS);
  }
}

function openHome(path) {
  location.replace(path);
}

function manageHomepageItemVisibility() {
  if (isLoggedIn()) {
    var user = getUser();
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('RegisterButton').style.display = 'none';
    document.getElementById(
      'welcome-user'
    ).innerHTML = `Welcome back, <span class="welcomeUserName">${user.firstName}</span>`;
  } else {
    document.getElementById('StartExamButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
  }
}
