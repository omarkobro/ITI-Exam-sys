var user = getUser();
console.log(user);

var navbarName = document.getElementById('navbar-username');
navbarName.innerHTML = `
<i class="fa-regular fa-circle-user"></i>&nbsp;
      ${user.firstName + ' ' + user.lastName}
`;

var startExamBtn = document.getElementById('StartExamButton');

sessionStorage.setItem('examStarted', 'false');

startExamBtn.addEventListener('click', function () {
  sessionStorage.setItem('examStarted', 'true');

  window.location.replace(ROUTES.EXAM);
});
