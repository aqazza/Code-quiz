const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement= document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let randomQuestions, currentQuestionIndex

startButton.addEventListener('click', beginGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    NextQuestion()
})

function beginGame() {
// console.log('Starting')
startButton.classList.add('hide')
randomQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
NextQuestion()
}

function NextQuestion() {
    resetState()
showQuestion(randomQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    questions.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
    }
function chooseAnswer(e) {
    const chosenButton = e.target
    const correct = chosenButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

const questions = [
    {
     questions: "What is the greatest soccer team of all time?"  ,
     answers: [
        { text: "FC Barcelona", correct: false },
        { text: "Real Madrid", correct: true },
        { text: "Arsenal FC", correct: false },
        { text: "Bayern Munich", correct: false },
     ]   
    }
]