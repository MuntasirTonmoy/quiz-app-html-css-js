const scoreElm = document.querySelector(".score");
const recentScore = localStorage.getItem("recentScore");
const saveScoreForm = document.querySelector(".save-score-form");
const userInput = document.querySelector(".user-input");
const saveBtn = document.querySelector(".save-btn");

scoreElm.innerText = `${recentScore || 0}`;
// if local storage has an array of highscore it will be added or an empty array
//local storage always store a value in string and return it in string
const highScore = JSON.parse(localStorage.getItem("highScores")) || [];

userInput.addEventListener("keyup", e => {
  if (e.target.value) {
    saveBtn.removeAttribute("disabled");
  } else {
    saveBtn.setAttribute("disabled", "");
  }
});

saveScoreForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = event.target.userName.value;
  const scoreObj = {
    user: userName,
    score: recentScore,
  };
  highScore.push(scoreObj);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScore));
  window.location.assign("/");
});
