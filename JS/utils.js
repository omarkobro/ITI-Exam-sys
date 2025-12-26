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
    }
    else
    {
        window.location.href = ROUTES.INSTRUCTIONS;
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
        document.getElementById("welcome-user").innerHTML = `Welcome back, <span class="welcomeUserName">${user.firstName}</span>`
    }
    else {
        document.getElementById("StartExamButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "none";
    }
}
