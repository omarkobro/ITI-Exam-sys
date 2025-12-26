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
function openExamInstructions() {
    if (!isLoggedIn()) {
        window.location.href = ROUTES.SIGNUP;
    }
}

function openHome(path) {
    location.replace(path);
}

function manageHomepageItemVisibility() {
    if (isLoggedIn()) {
        var user = getUser();
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("RegisterButton").style.display = "none";
        document.getElementById("welcome-user").textContent = `Welcome back, ${user.firstName}`
    }
    else {
        document.getElementById("StartExamButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "none";
    }
}
