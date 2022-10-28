const startButt = document.getElementById("start-btn");
const nextButt = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const highScoreButton = document.getElementById("High-Scores");
const saveScoreButton = document.getElementById("save-score");
const nameInput = document.getElementById("name-input");

let shuffledQuestions, currentQuestionIndex;
let timeLeft = 60;
let timerReference;

var highscoreArray = localStorage.getItem("highscore");

if (!highscoreArray) {
  localStorage.setItem("highscore", JSON.stringify([]));
}

startButt.addEventListener("click", startGame);
nextButt.addEventListener("click", () => {
  currentQuestionIndex++;
  NextQuestion();
});

function startGame() {
  startButt.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  startTimer();
  NextQuestion();
}

function countdown() {
  timeLeft--;
  timerElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerReference);
    // stop the timer, go to next question
    currentQuestionIndex++;
    // NextQuestion();
  }
}

function startTimer() {
  timerElement.textContent = timeLeft;
  clearInterval(timerReference);
  //store the id of the timer as a var
  timerReference = setInterval(countdown, 1000);
}

function NextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  question.answers.forEach((answer) => {
    questionElement.innerText = question.question;
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButt.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButt.classList.remove("hide");
  } else {
    startButt.innerText = "Restart";
    startButt.classList.remove("hide");
    endGame();
  }

  if (timeLeft > 5) {
    decrementTimeOnWrongAnswer(e.target);
  } else {
    timeLeft = 1;
  }
}

function decrementTimeOnWrongAnswer(target) {
  if (!target.dataset.correct) {
    timeLeft -= 5;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function endGame() {
  saveScoreButton.classList.remove("hide");
  nameInput.classList.remove("hide");
}

const questions = [
  {
    question: "Who is a current professor at UCI Coding Bootcamp?",
    answers: [
      { text: "Chad Tao", correct: true },
      { text: "Albert Einstein", correct: false },
      { text: "John McEnroe", correct: false },
      { text: "Serena Williams", correct: false },
    ],
  },
  {
    question: "What is the best programming language?",
    answers: [
      { text: "CSS", correct: false },
      { text: "Javascript", correct: false },
      { text: "HTML", correct: false },
      { text: "All of the Above", correct: true },
    ],
  },
  {
    question: "Which of the following is a fruit?",
    answers: [
      { text: "Tomato", correct: false },
      { text: "Orange", correct: true },
      { text: "Potato", correct: false },
      { text: "Chicken", correct: false },
    ],
  },
  {
    question: "Who is the greatest basketball player of all time?",
    answers: [
      { text: "Michael Jordan", correct: false },
      { text: "Kobe Bryant", correct: true },
      { text: "Lebron James", correct: false },
      { text: "Kareem-Abdul Jabbar", correct: false },
    ],
  },
];

saveScoreButton.addEventListener("click", function () {
  const currentPlayerScore = {
    name: nameInput.value,
    score: timeLeft,
  };

  var scores = JSON.parse(localStorage.getItem("highscore"));

  scores.push(currentPlayerScore);

  localStorage.setItem("highscore", JSON.stringify(scores));

  saveScoreButton.classList.add("hide");
  highScoreButton.classList.remove("hide");
  nameInput.classList.add("hide");
});
