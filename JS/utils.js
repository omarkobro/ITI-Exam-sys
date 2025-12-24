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

function openHome(path) {
    location.replace(path);
}

