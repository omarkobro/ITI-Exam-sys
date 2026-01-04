// window.onload = function () {
// };

function renderResultPage() {
  var result = getLastResult();

  var user = getUser();
  console.log(user);

  if (!result) {
    window.location.href = ROUTES.INSTRUCTIONS;
    return;
  }

  var nameElement = document.getElementById('userName');
  if (nameElement) {
    nameElement.textContent = user.firstName + ' ' + user.lastName;
  }

  var mainScore = document.getElementById('mainScore');
  if (mainScore) {
    mainScore.textContent = result.score;
  }
  var totalScore = document.getElementById('totalScore');
  if (totalScore) {
    totalScore.textContent = '/' + result.total;
  }

  var correctAnswers = document.getElementById('correctAnswers');
  if (correctAnswers) {
    correctAnswers.innerHTML =
      result.score +
      ' <span class="text-xl font-normal text-gray-500">/' +
      result.total +
      '</span>';
  }

  // Calc Percentage

  var quizTitle = document.getElementById('');

  //update badge based on percentage
  var badge = document.getElementById('performance-badge');
  var percentage = (result.score / result.total) * 100;
  if (percentage >= 90) {
    badge.innerHTML =
      '<i class="fas fa-check-circle text-lg"></i><span class="font-semibold text-sm">Excellent Performance</span>';
    badge.className =
      'inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full';
  } else if (percentage >= 70) {
    badge.innerHTML =
      '<i class="fas fa-check-circle text-lg"></i><span class="font-semibold text-sm">Good Performance</span>';
    badge.className =
      'inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full';
  } else {
    badge.innerHTML =
      '<i class="fas fa-exclamation-circle text-lg"></i><span class="font-semibold text-sm">Needs Improvement</span>';
    badge.className =
      'inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full';
  }

  //update the percentage card
  var percentageElement = document.getElementById('percentage');
  percentageElement.innerHTML =
    percentage +
    '<span class="text-xl font-normal text-gray-500 ml-2">%</span>';

  //update time taken card
  var timeTakenElement = document.getElementById('timeTaken');
  console.log(timeTakenElement);
  console.log(result);
  console.log(result.timeTaken);

  timeTakenElement.innerHTML =
    result.timeTaken +
    ' <span class="text-xl font-normal text-gray-500">min</span>';

  var doneBtn = document.getElementById('doneBtn');
  doneBtn.addEventListener('click', function () {
    window.location.href = ROUTES.INDEX; // Or wherever "home" is
  });

  //
  var examDate = document.getElementById('resultDate');
  examDate.textContent = 'Completed on ' + result.date;
}

renderResultPage();
