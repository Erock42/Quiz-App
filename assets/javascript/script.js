
 var startButtonEl = document.querySelector('#start');
 var questionEl = document.querySelector('#question');
 var answerEl = document.querySelector('#answers');
 var startPageEl =  document.querySelector('#startpage');
 var scorePageEl = document.querySelector('#score');
 var questionConEl = document.querySelector('#questionsContainer');
 var correctEl = document.querySelector('#prompt');
 var countdownEl = document.querySelector('#countdown');
 var scoreAreaEl = document.querySelector('#scoreArea');
 var inNameEl = document.querySelector('#inName');
 var buttonDivEl = document.querySelector('#saveButton');
 var highScoreEl = document.querySelector('#highScores')
  
 var timer = 75;
 var runningTimer;
 var score = 0;
 var questionIndex = 0
 
 var questions = [
     {       
         question: 'What is 7 x 6?',
         answers: [
             { text: '42', correct: true},
             { text: '32', correct: false},
             { text: '76', correct: false},
             { text: '54', correct: false}
         ]
     },
     {
         question: 'What is Capital of the USA?',
         answers: [
             { text: 'Philladelphia', correct: false},
             { text: 'New York', correct: false},
             { text: 'Washington DC', correct: true},
             { text: 'Istanbul', correct: false}
         ]
     },
     {
         question: 'What condiment is made from mustard seeds?',
         answers: [
             { text: 'Mustard', correct: true},
             { text: 'Ketchup', correct: false},
             { text: 'BBQ Sauce', correct: false},
             { text: 'Soy Sauce', correct: false}
         ]
     },
     {
         question: 'Is coding fun?',
         answers: [
             { text: 'Kind of...', correct: false},
             { text: 'No', correct: false},
             { text: 'Not Sure', correct: false},
             { text: 'YES!!!', correct: true},
         ]
     },
     {
         question: 'What does API stand for in coding?',
         answers: [
             { text: 'Advanced Police Investigation', correct: false},
             { text: 'Application Programming Interface', correct: true},
             { text: 'Art Professionals Inc', correct: false},
             { text: 'Alien Profile Insiders', correct: false}
         ]
     }
 ];
   
 function startQuiz() {
     startPageEl.replaceWith(questionConEl)
     startTimer();
     showQAs();
 }
  
 function showQAs (){
     questionEl.innerHTML=questions[questionIndex].question
    
     
     for (var i = 0; i< questions[questionIndex].answers.length; i++) {
        answerButton(questions[questionIndex].answers[i]); 
     }    
 
 }
   
 function answerButton (answer) {
     var buttonEl = document.createElement('button');
     buttonEl.setAttribute('answer', answer.correct);
     buttonEl.id = answer.text;
     buttonEl.innerText = answer.text;
   
     buttonEl.addEventListener("click", nextQuestion);
     
     answerEl.appendChild(buttonEl);
 }
 
 
 function nextQuestion (event) {
     console.log(nextQuestion);
     var targetEl = event.target;
     
     correctInc(targetEl.getAttribute('answer'));
 
     deleteButton();
     questionIndex++;
     if (questionIndex < questions.length) {
         showQAs();
     } else {
         gameOver();
     }
 }
 
 function deleteButton (){
     
     for (var i = 0; i< questions[questionIndex].answers.length; i++) {
         var buttonId = document.getElementById(questions[questionIndex].answers[i].text);
         buttonId.remove(); 
     }  
     
 }
  
 function correctInc (answer) {
     createText(answer);
     if (answer === "true"){
         score += 5;
     } else {
         timer -= 10;
     }
 }
 
 function createText(answer) {
     if (answer === "true") {
         correctEl.innerHTML = "Correct!"
     } else {
         correctEl.innerHTML = "Wrong!"
     }
 }
 
 function startTimer() {
     countdownEl.innerHTML = "Time Left: " + timer;
     if (timer <= 0) {
         gameOver();
     } else {
         timer -= 1;
         runningTimer = setTimeout(startTimer, 1000);
     }
 }
 
 function gameOver() {
     clearInterval(runningTimer);
     countdownEl.innerHTML = "Finished";
     displayScore();
     savedScore ();
 }
  
 function displayScore () {
     questionConEl.replaceWith(scorePageEl);
     scoreAreaEl.innerText = "Final Score:" + score; 
     initTextEl = document.createElement("input"); 
     initTextEl.setAttribute("id", "initails-input"); 
     initTextEl.setAttribute("type", "text"); 
     initTextEl.setAttribute("name", "iniatials"); 
     initTextEl.setAttribute("placeholder", "Enter Initials here"); 
       
     inNameEl.appendChild(initTextEl);
 
     saveButtonEl = document.createElement("button");
     saveButtonEl.setAttribute("id" , "save-btn");
     saveButtonEl.setAttribute("class" ,"save-btn");
     saveButtonEl.setAttribute("type" , "submit");
     saveButtonEl.textContent = "Save Score";
 
     inNameEl.appendChild(saveButtonEl);
 
     inNameEl.addEventListener("submit", viewHighScores);
 }
 
 function viewHighScores (e) { 
   e.preventDefault();
     var name = document.querySelector("#initails-input").value;
     savedInit(name);
     
     scorePageEl.replaceWith(highScoreEl)
     loadSaveScores();
   
 }
 
 var savedScore = function() {
     localStorage.setItem("score", JSON.stringify(score));
 }
 var savedInit = function(initails) {
     localStorage.setItem("initials", JSON.stringify(initails));
 }
 
 function loadSaveScores() {
     
     var savedScore = localStorage.getItem("score");
     var savedInit = localStorage.getItem("initials");
 
     savedScore  = JSON.parse(savedScore);
     savedInit = JSON.parse(savedInit);
 
     document.getElementById("highScores").innerHTML = savedInit + " - " + savedScore;
    
 }   
 
 startButtonEl.addEventListener("click", startQuiz)