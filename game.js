const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice-text"));

let currentQuestion = {};
let acceptingAns = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
  },
  {
    question: "How do you write 'Hello world' in an alert box?",
    choice1: "msgBox('Hello world')",
    choice2: "alertBrowser('Hello world')",
    choice3: "text('Hello world')",
    choice4: "alert('Hello world')",
  },
  {
    question:
      "What is the correct syntax for refferingto an external script called 'aaa.js'?",
  },
];
