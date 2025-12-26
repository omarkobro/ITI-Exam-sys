var fname = document.getElementById("signup-fname")
var fnameMsg = document.getElementById("signup-fname-msg")

var lname = document.getElementById("signup-lname")
var lnameMsg = document.getElementById("signup-lname-msg")


var email = document.getElementById("signup-email")
var emailMsg = document.getElementById("signup-email-msg")

var passwordInput = document.getElementById("signup-password")
var passwordMsg = document.getElementById("signup-password-msg")

var rePassword = document.getElementById("signup-re-password")
var rePasswordMsg = document.getElementById("signup-re-password-msg")

function validateFname() {
    if (fname.value.length === 0) {
        fnameMsg.textContent = "First Name is required";
    }
    else if (/\d/.test(fname.value)) {
        fnameMsg.textContent = "Name must not contain numbers";
    }
    else {
        fnameMsg.textContent = "";
        return true;
    }
}

function validateLname() {
    if (lname.value.length === 0) {
        lnameMsg.textContent = "Last Name is required";
    }
    else if (/\d/.test(lname.value)) {
        lnameMsg.textContent = "Name must not contain numbers";
    }
    else {
        lnameMsg.textContent = "";
        return true;
    }
}
function validateEmail() {
    if (email.value.length === 0) {
        emailMsg.textContent = "Email Address is Required"
    }
    else {
        emailMsg.textContent = "";
        return true;
    }
}
function validatePassword() {
    if (passwordInput.value.length < 8 && passwordInput.value.length >= 0) {
        passwordMsg.textContent = "Password should be 8 or more characters"
    }
    else {
        passwordMsg.textContent = "";
        return true;
    }
}
function validateRePassword() {
    if (rePassword.value.length < 8 && rePassword.value.length >= 0) {
        rePasswordMsg.textContent = "Password should be 8 or more characters"
    }
    else if (rePassword.value !== passwordInput.value) {
        rePasswordMsg.textContent = "Passwords is not matching, try again"
        passwordMsg.textContent = "Passwords is not matching, try again"
    }
    else {
        passwordMsg.textContent = "";
        rePasswordMsg.textContent = "";
        return true;
    }
}

function submitRegisterForm(e) {
    e.preventDefault();
    var user = {
        name: fname.value.trim() + " " + lname.value.trim(),
        email: email.value,
        password: passwordInput.value
    }
    if (validateFname() && validateLname() && validateEmail() && validatePassword() && validateRePassword()) {
        alert("registered successfully");
        console.log(user);
        completeRegistration(user);
    }
}