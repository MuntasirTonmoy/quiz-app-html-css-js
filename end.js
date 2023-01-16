const scoreElm = document.querySelector(".score");
const score = localStorage.getItem("recentScore");
const userInput = document.querySelector(".user-input");
const saveBtn = document.querySelector(".save-btn");
scoreElm.innerText = `You score ${score}`;
