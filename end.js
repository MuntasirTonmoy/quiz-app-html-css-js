const scoreElm = document.querySelector(".score");
const score = localStorage.getItem("recentScore");
const saveScoreForm = document.querySelector(".save-score-form");
const userInput = document.querySelector(".user-input");
const saveBtn = document.querySelector(".save-btn");

scoreElm.innerText = `You score ${score}`;

userInput.addEventListener("keyup", e => {
  console.log(e.target.value);
  if (e.target.value) {
    saveBtn.removeAttribute("disabled");
  } else {
    saveBtn.setAttribute("disabled", 0);
  }
});
saveScoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = event.target.userName.value;
});
