const scoreList = document.querySelector(".score-list");
const noScore = document.querySelector(".no-score-msg");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

if (highScores.length > 0) {
  noScore.style.display = "none";
  scoreList.innerHTML = highScores
    .map(score => {
      return `<li class='score-li'>${score.user} - ${score.score}</li>`;
    })
    .join("");
} else {
  noScore.style.display = "block";
}
