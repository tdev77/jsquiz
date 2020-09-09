

var inputBox = document.querySelector("#inputBox");
var submit = document.querySelector("#submit");
var questionBox = document.querySelector("#questionBox");
var timer = document.querySelector("#timer");
var questionTextBox = document.querySelector("#questionText");
var answerButtons = document.querySelector("#answerButtons");
var testResult = document.querySelector("#testResult");
var startQuizBtn = document.querySelector("#startQuiz");
var buttonField = document.querySelector("#buttonField");
var time = 60;

//var currentQuestion = 0;

var comicQuestions = [
    {
         question: "Who played The Incredible Hulk in the 1970's Tv Series?",
         answers: {
              A: 'Ed Norton',
              B: 'Mark Ruffalo',
              C: 'Lou Ferrigno',
              D: 'Tom Hardy'
         },
         correctAnswer: 'Lou Ferrigno'

    },
    {
         question: "In what city does Batman originate from? ",
         answers: {
              A: 'California',
              B: 'Wakanda',
              C: 'Chicago',
              D: 'Gotham City',
         },
         correctAnswer: 'Gotham City'
    },
    {

         question: "Iron Man's real name is what?",
         answers: {
              A: 'Lee Majors',
              B: 'Tony Stark',
              C: 'Arthur Fleck',
              D: 'Peter Parker',
         },
         correctAnswer: 'Tony Stark',
    },
    {
         question: "The DC Comic character Nightwing, is originally what Batman associate?",
         answers: {
              A: 'Commisioner Gordon',
              B: 'Robin',
              C: 'Alfred Pennyworth',
              D: 'The Joker',
         },
         correctAnswer: 'Robin',

    },
    {
         question: "What New York City Borough, is Peter Parker from?",
         answers: {
              A: 'Brooklyn',
              B: 'Staten Island',
              C: 'Queens',
              D: 'The Bronx'
         },
         correctAnswer: 'Queens',

    },
];

var currentIndex = 0;
var score = 0;
var timerObj;

submit.addEventListener("click",function(event){

    event.preventDefault();

    let hs_array_raw = [];
    let hs_arr_json = localStorage.getItem("hs_array");
    if (hs_arr_json) {
        // Parse JSON data into hs_array_raw
        hs_array_raw = JSON.parse(hs_arr_json);
    }
    
    let initials = document.getElementById("inputBox").value;

    hs_array_raw.push([initials,score]);

    localStorage.setItem("hs_array", JSON.stringify(hs_array_raw));

    let html = '<table id="scores_table">\n';
    let init = '';
    let score_x = '';
    for (let i=0; i < hs_array_raw.length; i++) {
        init = hs_array_raw[i][0];
        score_x = hs_array_raw[i][1];
        html += '<tr><td>' + init + '</td><td>' + score_x + '</td></tr>\n';
    }
    html += '</table>\n';

    html += '<button onclick="startQuiz();">Play Again</button>\n';

    document.getElementById("questionText").innerHTML = "High Scores";
    document.getElementById("answerButtons").innerHTML = html;
    buttonField.style.display = "none";
    answerButtons.style.display = "block";


});
startQuizBtn.addEventListener("click",function(event){
 
    event.preventDefault();
  startQuiz ();
    

    

});
function startQuiz () {

    time = 60;
    score = 0;

    timerObj = setInterval(function(){
        timer.innerHTML = time;
        if (time == 0) {
            // stop timer
            clearInterval(timerObj);
            ranOutOfTime();
        }

        time--;
    }, 1000);

    // Makes sure the question box is showing
    document.getElementById("questionBox").style.display = "block";

    currentIndex = 0;
    showQuestion(currentIndex);

}

function showQuestion(idx) {
    colorQuestionBox("white")
    console.log("currentIndex: " + currentIndex);
    console.log("idx: " + idx);
    let e = comicQuestions[idx];
    console.log(e);
    // Fills the question text
    questionTextBox.innerHTML = e.question;
    //add IDs to these buttons so you can add event Listeners to it

    let answersHTML = "";

    //console.log(e.answers.length);

    //for (let i = 0; i < e.answers.length; i++) {
    for (const key in e.answers) {
        answersHTML += "<br>"
            + "<button class='q_button' onclick='";
            if (e.correctAnswer == e.answers[key]) {
                answersHTML += "right_answer();";
            } else {
                answersHTML += "wrong_answer();";
            }
        answersHTML += "'>"
            + key + ": " + e.answers[key]
            + "</button>\n";
    }

    answerButtons.innerHTML = answersHTML;

}

function right_answer() {
    update_score(1);
    currentIndex++;
    colorQuestionBox("green")
    document.getElementById('answers').innerHTML = "correct";
    setTimeout(function () {
        document.getElementById('answers').innerHTML = ""; 
           },2000);
    if (currentIndex < comicQuestions.length) {
        setTimeout(function () {
     showQuestion(currentIndex);  

        },1000)

  
    } else {
        gotoFinish();
    }
}

function colorQuestionBox (color) {
    questionBox.style.backgroundColor = color;

}

function wrong_answer() {
    update_score(-1);
    colorQuestionBox("red");
    document.getElementById('answers').innerHTML = "Wrong"; 
    setTimeout(function () {
        document.getElementById('answers').innerHTML = ""; 
           },2000);
   
}

function update_score(change) {
    score += change;
    document.getElementById("score").innerHTML= "Score<br>" + score;
}
//create if statements to basically fire when the timer equals 0, to end the game.

function gotoFinish() {
    buttonField.style.display = "block";
    answerButtons.style.display = "none";
    clearInterval(timerObj);
    questionTextBox.innerHTML = "You finished!";
    // Get rid of buttons
    // Save info to local storage

}

function ranOutOfTime() {
    questionTextBox.innerHTML = "You ran out of time!";
    // Get rid of buttons
    // Save info to local storage

}

answerButtons.addEventListener("click",function(event){
     event.preventDefault();
     //check if innerHTML of buttons equals the currentQuestion's correct answer
     //if true, add one to currentQuestion and change the innerHTML of the questionTextBox and answerButtons to equal the correct question
     //if false, timer-10
})


//write a function for if timer=0, to clear innerHTML of questionsTextBox and replace it with You Lost!! or something like that

/*

if(time === 0) {
     clearInterval(timerInterval);
     sendMessage();
   

 };


//also create if statements so that if the clicked 

if () {



}
*/
//add event listener to the new buttons you're creating, and have a funcion that checks if the innerHTML of the button equals the correctANswer of the currentQuestion

//if correct, add +1 to currentQuewstion. if wrong -10 timer

//when done, user localstorage.getItem to retrieve the name, and show something like "name, you lost /won" 

/*


it will also start the timer, it will lock in the information in the storage and start the timer.
it will start the timer at 60 seconds, within that timeframe you're going to have an X amount of questions to asnwer on the test. the questions are gonna show up on the page in this function.



document.getElementbyId and inside it will have the name of the div from the html

and then you'll have a function that ties into the div and variable.

the function will execute the timer to start the quiz, and it will count down the div 

click start button to start the timer, from there  
*/

