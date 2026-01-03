var reminaingSeconds = EXAM_CONFIG.DURATION_SECONDS;
var timerInterval = null;

function startExamTimer(onTick, onTimeUp){
     timerInterval = setInterval(function(){
        reminaingSeconds--

      onTick(reminaingSeconds)

      if(reminaingSeconds <= 0){
         clearInterval(timerInterval);

         timerInterval = null

         onTimeUp();
      }
     }, 1000)
}

function stopExamTimer(){ 

   clearInterval(timerInterval)
   timerInterval = null
}

function getRemainingTime(){ //not used
   return reminaingSeconds
}