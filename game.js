const question = document.querySelector(".question");
const questionCount = document.querySelector(".question-count");
const progressBarFill = document.querySelector(".progress-bar-fill");
const scoreCount = document.querySelector(".score-count");
const choices = Array.from(document.querySelectorAll(".choice-text"));

let currentQuestion = {};
let acceptingAns = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

function decodeHTMLEntities(text) {
  const entities = [
    ["amp", "&"],
    ["rsquo", "’"],
    ["lsquo", "‘"],
    ["rdquo", "”"],
    ["ldquo", "“"],
    ["apos", "'"],
    ["#x27", "'"],
    ["#x2F", "/"],
    ["#039", "'"],
    ["#47", "/"],
    ["lt", "<"],
    ["gt", ">"],
    ["nbsp", " "],
    ["quot", '"'],
  ];

  for (const elm of entities)
    text = text.replace(new RegExp("&" + elm[0] + ";", "g"), elm[1]);

  return text;
}

/* let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
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
]; */

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then(res => res.json())
  .then(loadedQuestions => {
    questions = loadedQuestions?.results.map(question => {
      const formattedQuestion = {
        question: decodeHTMLEntities(question.question),
      };
      const answerChoices = [...question.incorrect_answers];
      formattedQuestion.ans = Math.floor(Math.random() * 4) + 1;
      //entering the answer into number array at 0-3 index
      answerChoices.splice(
        formattedQuestion.ans - 1,
        0,
        question.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        //creating choice1: question choice, choice2: question choice; thats why added +1
        formattedQuestion["choice" + (index + 1)] = decodeHTMLEntities(choice);
      });
      return formattedQuestion;
    });
    startGame();
  })
  .catch(error => console.log(error));

//constant
const correctBonus = 10;
const maxQuestion = 10;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestion) {
    // go to end page
    localStorage.setItem("recentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++; // when we start the game increament to 1
  questionCount.innerText = `Question ${questionCounter}/${maxQuestion}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["choice"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAns = true;
};

const incrementScore = num => {
  score += num;
  scoreCount.innerText = score;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAns) return;

    acceptingAns = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["choice"];
    const classToApply =
      parseInt(selectedAnswer) === currentQuestion.ans
        ? "correct"
        : "incorrect";

    if (classToApply === "correct") {
      incrementScore(correctBonus);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    progressBarFill.style.width = `${(questionCounter / maxQuestion) * 100}%`;
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 300);
  });
});
