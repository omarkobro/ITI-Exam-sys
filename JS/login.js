var user = getUser();
console.log(user);

var emailInput = document.getElementById("login-email");
var emailInputMsg = document.getElementById("login-email-msg");

var passwordInput = document.getElementById("login-password");
var passwordInputMsg = document.getElementById("login-password-msg");



function validateLoginEmail() {
    if (emailInput.value.length === 0) {
        emailInputMsg.textContent = "Enter Your registered email"
    }
    else {
        emailInputMsg.textContent = "";
        return true;
    }
}

function validateLoginPassword() {
    if (passwordInput.value.length < 8 && passwordInput.value.length >= 0) {
        passwordInputMsg.textContent ="Password is 8 or more characters"
    }
    else
    {
        passwordInputMsg.textContent = ""
        return true;
    }
}


function submitLoginForm(e) {
    e.preventDefault();
    if (validateLoginEmail() && validateLoginPassword()) {
        if (!user) {
            console.log(user);
            document.getElementById("loginFormMsg").style.display = "block"
        }
        else if(emailInput.value === user.email && passwordInput.value == user.password)
        {
            setLoggedIn();
            location.reload();
        }
        else{
            document.getElementById("loginFormMsg").style.display = "block"
        }
    }
}