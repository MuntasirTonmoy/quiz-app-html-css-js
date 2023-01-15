const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice-container"));
const choiceText = Array.from(document.querySelectorAll(".choice-text"));

let currentQuestion = {};
let acceptingAns = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    ans: 1,
  },
  {
    question: "How do you write 'Hello world' in an alert box?",
    choice1: "msgBox('Hello world')",
    choice2: "alertBrowser('Hello world')",
    choice3: "text('Hello world')",
    choice4: "alert('Hello world')",
    ans: 4,
  },
  {
    question:
      "What is the correct syntax for refferingto an external script called 'aaa.js'?",
    choice1: "<script href='aaa.js'>",
    choice2: "<script name='aaa.js'>",
    choice3: "<script src='aaa.js'>",
    choice4: "<script file='aaa.js'>",
    ans: 3,
  },
];

//constant
const correctBonus = 10;
const maxQuestion = 3;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  questionCounter++; // when we start the game increament to 1
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["choice"];
    choiceText.forEach(c => {
      c.innerText = currentQuestion["choice" + number];
    });
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAns = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAns) return;

    acceptingAns = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["choice"];
    getNewQuestion();
  });
});

startGame();
