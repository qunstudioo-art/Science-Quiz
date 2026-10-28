
const questions = [
    {
        question: "Which organ pumps blood around the human body?",
        answers: ["Lungs", "Heart", "Kidneys", "Brain"],
        correct: 1
    },
    {
        question: "What is the chemical formula of water?",
        answers: ["CO2", "O2", "H2O", "NaCl"],
        correct: 2
    },
    {
        question: "Which gas do plants absorb during photosynthesis?",
        answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correct: 2
    },
    {
        question: "What is the basic unit of life?",
        answers: ["Tissue", "Organ", "Cell", "Bone"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 1
    },
    {
        question: "Which organ helps us breathe?",
        answers: ["Heart", "Lungs", "Stomach", "Kidneys"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for oxygen?",
        answers: ["Ox", "O", "O2", "Oy"],
        correct: 1
    },
    {
        question: "How many bones are normally in an adult human body?",
        answers: ["106", "206", "306", "406"],
        correct: 1
    },
    {
        question: "Which force pulls objects toward Earth?",
        answers: ["Friction", "Magnetism", "Gravity", "Electricity"],
        correct: 2
    },
    {
        question: "What is the nearest star to Earth?",
        answers: ["Sirius", "The Sun", "Polaris", "Alpha Centauri"],
        correct: 1
    },
    {
        question: "Which part of a plant absorbs water from soil?",
        answers: ["Flower", "Leaves", "Roots", "Fruit"],
        correct: 2
    },
    {
        question: "What is the boiling point of water at sea level?",
        answers: ["50°C", "75°C", "100°C", "150°C"],
        correct: 2
    },
    {
        question: "Which vitamin can the body produce with sunlight exposure?",
        answers: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
        correct: 2
    },
    {
        question: "Which gas makes up most of Earth's atmosphere?",
        answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correct: 1
    },
    {
        question: "What is the center of an atom called?",
        answers: ["Electron", "Shell", "Nucleus", "Molecule"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const timerElement = document.getElementById("timer");

let timeLeft = 30;
let timerInterval = null;
function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];
progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

progressText.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
    questionElement.textContent =
        `${currentQuestion + 1}. ${q.question}`;

    answersElement.innerHTML = "";
    resultElement.textContent = "";

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Results"
            : "Next Question";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.className = "answer-btn";

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersElement.appendChild(button);
    });

    scoreElement.textContent =
        `Score: ${score} / ${questions.length}`;
        startTimer();
}

function checkAnswer(selectedIndex) {
    if (answered) return;
    clearInterval(timerInterval);

    answered = true;

    const correctIndex = questions[currentQuestion].correct;
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(button => button.disabled = true);
    buttons[correctIndex].classList.add("correct");

    if (selectedIndex === correctIndex) {
        score++;
        resultElement.textContent = "Correct! Well done.";
    } else {
        buttons[selectedIndex].classList.add("wrong");
        resultElement.textContent =
            "Incorrect. The green option is correct.";
    }

    scoreElement.textContent =
        `Score: ${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

nextButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    if (currentQuestion === questions.length - 1) {
        questionElement.textContent = "Quiz Completed!";
        answersElement.innerHTML = "";
        resultElement.textContent =
            `You scored ${score} out of ${questions.length}.`;
        nextButton.textContent = "Restart Quiz";

        // Replace the button's click action for restarting.
        nextButton.onclick = restartQuiz;
        return;
    }

    currentQuestion++;
    showQuestion();
});

showQuestion();
function startTimer() {
    clearInterval(timerInterval);

    timeLeft = 30;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timerElement.classList.remove("warning");

    timerInterval = setInterval(() => {
        timeLeft--;

        timerElement.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 10) {
            timerElement.classList.add("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";

            if (!answered) {
                answered = true;

                const buttons =
                    answersElement.querySelectorAll("button");

                buttons.forEach(button => {
                    button.disabled = true;
                });

                buttons[questions[currentQuestion].correct]
                    .classList.add("correct");

                resultElement.textContent =
                    "Time is up! The green option is correct.";
            }
        }
    }, 1000);
}