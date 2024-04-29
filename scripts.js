
function getComputerChoice() {
    switch(Math.floor(Math.random() * 3)){
  case 0:
    return "rock";
    break;
  case 1:
    return "paper";
    break;
  case 2:
    return "scissors";
    break;
  default:
    return "error";
    };
}

function getHumanChoice(text = "Rock, Paper, or Scissors?") {
  let answer = prompt(text).toLowerCase();
    switch(answer){
      case "rock":
        return ["rock", "paper"];
        break;
      case "paper":
        return ["paper", "scissors"];
        break;
      case "scissors":
        return ["scissors", "rock"];
        break;
      default:
        return getHumanChoice("Invalid input, try again. Rock, Paper, or Scissors?");
        };
}

function playRound(humanScore, computerScore) {
  console.log("round played");
  let message;
  let thrownWin;
  let thrownLose;
  let humanChoice;
  let computerChoice;
  let defeatingChoice;


  [humanChoice, defeatingChoice] = getHumanChoice();
  console.log(defeatingChoice);
  computerChoice = getComputerChoice();
  console.log(computerChoice);

  if (humanChoice === computerChoice) {
    message = "Nobody. Tie!";
    thrownWin = humanChoice;
    thrownLose = computerChoice;
  } else if (defeatingChoice === computerChoice){
    message = "The computer!";
    computerScore++;
    console.log(computerScore);
    thrownWin = computerChoice;
    thrownLose = humanChoice;
  }
  else {
    message = "The player!";
    humanScore++;
    thrownWin = humanChoice;
    thrownLose = computerChoice;
  }
  alert("The winner is:" + "\n" + message + "\n" + "Using " + thrownWin + " against " + thrownLose + "!")
  return (
    [humanScore, computerScore]
  );
}

function playGame(again = 'Would you like to play "Rock, Paper, Scissors"?') {

  let humanScore = 0;
  let computerScore = 0;
  let text = again;
  let round = 1;
  let limit = 6;
  let inputValid = false;

  while (round < limit) {
    if (round > 1 && round < 6) {
      text = "Would you like to play another round?" + " (round:" + " " + round + "/5)";
    }

    while (inputValid === false) {
      let answer = prompt(text).toLowerCase();
      console.log(answer);
      if(answer === "yes") {
        console.log("they said yes");
        [humanScore, computerScore] = playRound(humanScore, computerScore);
        inputValid = true;
      } else if (answer === "no") {
        console.log("they said no");
        console.log(round);
        if ((again === "Would you like to play another match?") || (round === 1)) {
          console.log("I don't want to play anymore")
          return false;
        }
        round = limit + 1;
        inputValid = true;
      } else {
        text = "Invalid input, try again. " + "Would you like to play another round?" + " (round:" + " " + round + "/5)";
      }
    }
    inputValid = false;
    if (round > 4 && humanScore === computerScore) {
      limit++;
      text = "Would you like to do a tiebreaker round?"  + " (round:" + " " + round + "/5)";
    }
    round++;
    if (humanScore > 2 || computerScore > 2) {
      round = limit + 1;
    }
  }
  text = "Would you like to play?";
  let gameWinner = "Tied!";
  if (humanScore !== computerScore) {
    gameWinner = humanScore > computerScore ? "The Player!" : "The Computer!";
  }
  alert("The winner is..." + "\n" + "\n" + gameWinner + "\n" + "\n" + "Final score:" + "\n" + "Player: " + humanScore + " Computer: " + computerScore);
  return true;

}

let iWantToPlay = true;
let again;
while (iWantToPlay === true) {
  iWantToPlay = playGame(again);
  again = "Would you like to play another match?"
}

