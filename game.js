const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice-text"));

let currentQuestion = {};
let acceptingAns = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
