// ❌ removed react line

const startScreen = document.getElementById("start-screen")
const quizscreen = document.getElementById("quiz-screen")
const resultscreen = document.getElementById("result-screen")
const startbtn = document.getElementById("start-btn")
const questiontext = document.getElementById("question-text")
const answercontainer = document.getElementById("answer-container")
const currentquestionspan = document.getElementById("current-question")
const totalquestionspan = document.getElementById("total-questions")
const scorespan = document.getElementById("score")
const finalscorespan = document.getElementById("final-score")
const maxscorespan = document.getElementById("max-score")
const resultmessage = document.getElementById("result-message")
const restartbutton = document.getElementById("restart-btn")
const progress = document.getElementById("progress")

const quizquestions = [
    {
        question: "what is the best piece of advice for the people here",
        answers: [
            { text: "happy", correct: false },
            { text: "obsession", correct: true },
            { text: "friends", correct: false },
            { text: "love", correct: false }
        ],
    },
    {
        question: "what is the capital of france",
        answers: [
            { text: "delhi", correct: false },
            { text: "berlin", correct: false },
            { text: "paris", correct: true },
            { text: "newyork", correct: false },
        ],
    },
    {
        question: "what is the best place in the world in beauty",
        answers: [
            { text: "america", correct: false },
            { text: "delhi", correct: false },
            { text: "bali", correct: true },
            { text: "dubai", correct: false },
        ],
    },
    {
        question: "am i even capable of doing",
        answers: [
            { text: "everyone can do", correct: false },
            { text: "everyone can do if they actually try", correct: true },
            { text: "no one can do that", correct: false },
            { text: "we can do well no worries", correct: false },
        ],
    },
    {
        question: "is god helps actually you",
        answers: [
            { text: "one day when he sees your hard work", correct: true },
            { text: "no not really god never exists", correct: false },
            { text: "he exists but he dont care about us", correct: false },
            { text: "he does everything fair", correct: false },
        ],
    },
]

let currentquestionindex = 0
let score = 0
let answerdisabed = false

totalquestionspan.textContent = quizquestions.length
maxscorespan.textContent = quizquestions.length

// START
function start() {
    currentquestionindex = 0
    score = 0
    scorespan.textContent = 0

    startScreen.classList.remove("active")
    quizscreen.classList.add("active")

    showquestion()
}

// SHOW QUESTION
function showquestion() {
    answerdisabed = false

    const currentquestion = quizquestions[currentquestionindex]
    currentquestionspan.textContent = currentquestionindex + 1

    const progresspercent = (currentquestionindex / quizquestions.length) * 100
    progress.style.width = progresspercent + "%"

    questiontext.textContent = currentquestion.question
    answercontainer.innerHTML = ""

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        button.dataset.correct = answer.correct

        button.addEventListener("click", Selectanswer)
        answercontainer.appendChild(button)
    })
}

// SELECT ANSWER
function Selectanswer(event) {
    if (answerdisabed) return
    answerdisabed = true

    const selectedbutton = event.target
    const iscorrect = selectedbutton.dataset.correct === "true"

    Array.from(answercontainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
    })

    if (iscorrect) {
        score++
        scorespan.textContent = score
    }

    setTimeout(() => {
        currentquestionindex++

        if (currentquestionindex < quizquestions.length) {
            showquestion()
        } else {
            showresult()
        }
    }, 1000)
}

// RESULT
function showresult() {
    quizscreen.classList.remove("active")
    resultscreen.classList.add("active")

    finalscorespan.textContent = score

    const percentage = (score / quizquestions.length) * 100

    if (percentage === 100) {
        resultmessage.textContent = "you are brilliant 🔥"
    } else if (percentage >= 80) {
        resultmessage.textContent = "very good 👍"
    } else if (percentage >= 60) {
        resultmessage.textContent = "keep improving 💪"
    } else if (percentage >= 40) {
        resultmessage.textContent = "you can do better"
    } else {
        resultmessage.textContent = "try again 🚀"
    }
}

// RESTART
function restart() {
    resultscreen.classList.remove("active")
    startScreen.classList.add("active")
}

// EVENTS
startbtn.addEventListener("click", start)
restartbutton.addEventListener("click", restart)