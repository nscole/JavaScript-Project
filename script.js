// https://opentdb.com/api.php?amount=10

const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _correctScore = document.getElementById("correct-score");
const _totalQuestions = document.getElementById("total-question");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");

let correctAnswer = "", correctScore = askedCount = 0, totalQuestions = 10;

// Event Listeners
function eventCheckBtn(){
    _checkBtn.addEventListener("click", checkAnswer);
}


document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    eventCheckBtn();
    _totalQuestions.textContent = totalQuestions;
    _correctScore.textContent = correctScore;
})

async function loadQuestion () {
    const apiURL = 'https://opentdb.com/api.php?amount=10';
    const results = await fetch(`${apiURL}`);
    const data = await results.json();
    // console.log(data.results[0]);
    showQuestion(data.results[0])
}

function showQuestion(data) {
    let correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    // inserting correct answer in random position in the options list
    let optionsList = incorrectAnswer;   
    optionsList.splice(Math.floor(Math.random() * 
    (incorrectAnswer.length + 1)), 0, correctAnswer);
    
    _question.innerHTML = `${data.question} <br> <span class = "category"> 
    ${data.category} </span>` ;
    _options.innerHTML = `
        ${optionsList.map ((option, index) => `
        <li> ${index +1}. <span> ${option} </span> </li>
        `).join("")}
        `;

        selectAnswer ();
}


// Options section
function selectAnswer () {
    _options.querySelectorAll("li").forEach((option) =>
    option.addEventListener("click", () =>{
        if(_options.querySelector(".selected")){
            const activeOption = _options.querySelector(".selected");
            activeOption.classList.remove('selected');
        }
        option.classList.add("selected");
    })
    );
    console.log(correctAnswer);
};

// Answer Checking
function checkAnswer(data) {
    _checkBtn.disabled = true;
    if(_options.querySelector(".selected")){
        let selectedAnswer = _options.querySelector(".selected span").textContent;
        // console.log(selectedAnswer)
        if (selectedAnswer === correctAnswer){
            correctScore++;
            _result.innerHTML = `<p>Correct Answer</p>`;
        } else {
            _result.innerHTML = `<p>Incorrect Answer</p> <b> <p>Correct Answer: ${correctAnswer}`;
        }
    }  
}