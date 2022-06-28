// API website   -   https://opentdb.com/api_config.php
// Actual API   -   https://opentdb.com/api.php?amount=10

const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _correctScore = document.getElementById("correct-score");
const _totalQuestions = document.getElementById("total-question");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");
let askedCount = "";


let correctAnswer = "", correctScore = askedCount = 0, totalQuestions = 10;

// Event Listeners
function eventCheckBtn(){
    _checkBtn.addEventListener("click", checkAnswer);
    _playAgainBtn.addEventListener("click", restartQuiz)
}


// DOMContentLoaded Event Listener
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    eventCheckBtn();
    _totalQuestions.textContent = totalQuestions;
    _correctScore.textContent = correctScore;
})

// Fetch Used to get API
async function loadQuestion () {
    const apiURL = 'https://opentdb.com/api.php?amount=10';
    const results = await fetch(`${apiURL}`);
    const data = await results.json();
    _result.innerHTML = "";
    // console.log(data.results[0]);
    showQuestion(data.results[0])
}

// Function for showing questins and options
function showQuestion(data) {
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    // inserting correct answer in random position in the options list
    let optionsList = incorrectAnswer;   
    optionsList.splice(Math.floor(Math.random() * 
    (incorrectAnswer.length + 1)), 0, correctAnswer);
    
    _question.innerHTML = `${data.question} <br> <span class = "category"> 
    ${data.category} </span>` ;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join("")}
        `;

        selectOption ();
}


// Options section
function selectOption () {
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

// Checks Answer
function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer == decodeHTML(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p>Incorrect Answer!</p>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// to convert html entities into normal text of correct answer if there is any
function decodeHTML(textstring){
    let doc = new DOMParser().parseFromString(textstring, "text/html");
    return doc.documentElement.textContent;
}


// Checks how many answers you have answered correctly
function checkCount (){
    askedCount++;
    setCount();
    if(askedCount === totalQuestions){
        setTimeout(function(){
            console.log("");}, 
            200);
        _result.innerHTML += ``;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(() => {
        loadQuestion ();
    }, 200);
    }
}

// A function to stop the quiz once it reached total questions
function setCount(){
    _totalQuestions.textContent = totalQuestions;
    _correctScore.textContent = correctScore;
}


// Restarts Quiz
function restartQuiz () {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount ();
    loadQuestion ();
}



// Header Change to New Image Function
function setNewImage () {
    document.getElementById("image").src = "./Images/Header-2.png";
    // console.log("Mouseover");
    
}

// // Header Change Image Event Listeners
document.getElementById("image").addEventListener("mouseover", setNewImage);


document.getElementById("image").addEventListener("mouseleave", setOldImage);

// // Header Change Image to old image Function
function setOldImage () {
    document.getElementById("image").src = "./Images/Header-1.png";
}







 