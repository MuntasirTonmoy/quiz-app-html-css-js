const scoreTable = document.querySelector(".score-table");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
