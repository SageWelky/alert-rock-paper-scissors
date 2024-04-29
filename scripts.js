
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
  let message;
  let thrownWin;
  let thrownLose;
  let humanChoice;
  let computerChoice;
  let defeatingChoice;


  [humanChoice, defeatingChoice] = getHumanChoice();
  computerChoice = getComputerChoice();

  if (humanChoice === computerChoice) {
    message = "Nobody. Tie!";
    thrownWin = humanChoice;
    thrownLose = computerChoice;
  } else if (defeatingChoice === computerChoice){
    message = "The computer!";
    computerScore++;
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

  //Begin the rounds.
  while (round < limit) {

    //If it isn't a tiebreaker or the first round, it should say this.
    if (round > 1 && round < 5) {
      text = "Would you like to play another round?" + " (round:" + " " + round + "/5)";
    }

    //Handling for player input each round.
    while (inputValid === false) {

      let answer = prompt(text).toLowerCase();

      if(answer === "yes") {

        [humanScore, computerScore] = playRound(humanScore, computerScore);
        inputValid = true;

      } else if (answer === "no") {

        //If the player is telling us no before even playing, or after having done a match,
        //they clearly do not want to play at all, rather than just wanting to cut the match short.
        if ((again === "Would you like to play another match?") || (round === 1)) {

          console.log("I don't want to play anymore")
          return false;

        }

        //Set that the match is over, and confirm the input was valid.
        round = limit + 1;
        inputValid = true;

      } else {

        text = "Invalid input, try again. " + "Would you like to play another round?" + " (round:" + " " + round + "/5)";

      }
    }

    //Reseting the validation for the next round.
    inputValid = false;

    //Offer a tiebreaker if round 5 is a tie.
    if (round > 4 && humanScore === computerScore) {
      limit++;
      text = "Would you like to do a tiebreaker round?"  + " (round:" + " " + round + "/5)";
    }

    //If the opponent cannot make a comeback, end the game.
    if (humanScore > 2 || computerScore > 2) {
      round = limit + 1;
    }

    //Increment to proceed to the next round and clear again to prevent skipping the score.
    again = "Here we go!"
    round++;
  }

  //Assume the game is tied, and check for the other two conditions.
  let gameWinner = "Tied!";
  if (humanScore !== computerScore) {
    gameWinner = humanScore > computerScore ? "The Player!" : "The Computer!";
  }

  //Announce the winner and final score.
  alert("The winner is..." + "\n" + "\n" + gameWinner + "\n" + "\n" + "Final score:" + "\n" + "Player: " + humanScore + " Computer: " + computerScore);

  //Indicate we should ask if they want to play again.
  return true;

}

let iWantToPlay = true;
let again;

//Place the game in a loop so that it can be replayed as much as is wanted.
while (iWantToPlay === true) {

  //again will be undefined the first time, thus triggering the default assignment.
  iWantToPlay = playGame(again);
  //Acknowledge that this would be a follow-up match being offered.
  again = "Would you like to play another match?";

}

