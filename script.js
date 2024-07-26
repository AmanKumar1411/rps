function generateComputerChoice() {
  const randomChoice = Math.random() * 3;
  if (randomChoice < 1) {
    return "✊🏻"; // Rock
  } else if (randomChoice < 2) {
    return "🖐🏻"; // Paper
  } else {
    return "✌🏻"; // Scissors
  }
}

let scoreStr = localStorage.getItem("score");
let score;
if (scoreStr !== null) {
  score = JSON.parse(scoreStr);
} else {
  score = {
    win: 0,
    loss: 0,
    draw: 0,
  };
}

score.displayScore = function () {
  return `Win: ${score.win}  Loss: ${score.loss}  Draw: ${score.draw}`;
};

function generateResult(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    score.draw += 1;
    return "It's a tie!";
  }

  if (userChoice === "✊🏻") {
    if (computerChoice === "🖐🏻") {
      score.loss += 1;
      return "Computer Wins!";
    } else {
      score.win += 1;
      return "User Wins!";
    }
  } else if (userChoice === "🖐🏻") {
    if (computerChoice === "✌🏻") {
      score.loss += 1;
      return "Computer Wins!";
    } else {
      score.win += 1;
      return "User Wins!";
    }
  } else if (userChoice === "✌🏻") {
    if (computerChoice === "✊🏻") {
      score.loss += 1;
      return "Computer Wins!";
    } else {
      score.win += 1;
      return "User Wins!";
    }
  }
}

function showResult(userChoice, computerChoice, result) {
  document.querySelector("#user-move").innerText = `You chose: ${userChoice}`;
  document.querySelector(
    "#computer-move"
  ).innerText = `Computer chose: ${computerChoice}`;
  document.querySelector("#result").innerText = result;
  document.querySelector("#score").innerText = score.displayScore();
}

document.querySelectorAll(".selection").forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.selection;
    const computerChoice = generateComputerChoice();
    const resultMessage = generateResult(userChoice, computerChoice);
    localStorage.setItem("score", JSON.stringify(score));
    showResult(userChoice, computerChoice, resultMessage);
  });
});

let reset = document.querySelector(".resetbtn");
reset.addEventListener("click", () => {
  score = {
    win: 0,
    loss: 0,
    draw: 0,
  };
  score.displayScore = function () {
    return `Win: ${score.win}  Loss: ${score.loss}  Draw: ${score.draw}`;
  };
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector("#user-move").innerText = "";
  document.querySelector("#computer-move").innerText = "";
  document.querySelector("#result").innerText = "";
  document.querySelector("#score").innerText = score.displayScore();
});
