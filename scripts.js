

let scoreboardPlayer = document.querySelector("#player-score");
let scoreboardComputer = document.querySelector("#computer-score");
let rpsChoiceContainer = document.querySelector("#rps-choice-container");
let roundScore = [];



rpsChoiceContainer.addEventListener("click", (event) => {
  let pressedButton = event.target;
  event.preventDefault;
  roundScore = [];

  switch(pressedButton.id) {
    case 'rock-button':
      roundScore = playRound(["rock", "paper"]);
      break;
    case 'paper-button':
      roundScore = playRound(["paper", "scissors"]);
      break;
    case 'scissors-button':
      roundScore = playRound(["scissors", "rock"]);
      break;
  }
  setTimeout(() => {
    scoreboardPlayer.textContent = `Player: ${roundScore[0]}`;
    scoreboardComputer.textContent = `CPU: ${roundScore[1]}`;;
  }, "150");

  round++;

  setTimeout(() => {
    checkGame();;
  }, "1000");

  console.log("rps button registered");
});



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



function playRound(humanChoiceButton) {
  let message;
  let thrownWin;
  let thrownLose;
  let computerChoice;
  let defeatingChoice;
  let humanChoice;


  [humanChoice, defeatingChoice] = humanChoiceButton;
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
  setTimeout(() => {
    alert("The winner is:" + "\n" + message + "\n" + "Using " + thrownWin + " against " + thrownLose + "!");
  }, "200");

  return (
    [humanScore, computerScore]
  );
}







function playGame(again = 'Would you like to play "Rock, Paper, Scissors"?') {

  gameReset = false;
  let text = again;
  let inputValid = false;
  console.log("round: ", round);

  //Begin the rounds.
  //If the opponent cannot make a comeback, end the game.
  if (Math.abs(humanScore - computerScore) > (limit - round) && (round !== limit) && !tieFlag) {
    console.log("comeback blocked", humanScore, computerScore, "|", limit - round);
    alert(`There are only ${limit - round} rounds remaining, with a point lead of ${Math.abs(humanScore - computerScore)}`);
    round = limit + 1;
  }

  if (round < limit) {

    //If it isn't a tiebreaker or the first round, it should say this.
    if (round > 1 && round < 6) {
      text = "Would you like to play another round?" + " (round:" + " " + round + "/5)";
    }

    //Handling for player input each round.
    while (inputValid === false) {

      let answer = prompt(text).toLowerCase();

      if(answer === "yes") {

        tieFlag = false;
        //FILL IN CSS TARGETING FOR BUTTONS HERE
        alert("Rock, Paper, or Scissors?");
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

        tieFlag = true;
        playGame();

        inputValid = true;
        gameReset = true;



      } else {

        //Confirm which question they should be seeing on invalid input.
        if (again === "Would you like to play another match?") {

          text = "Invalid input, try again. Would you like to play another match?";

        } else if (text === 'Would you like to play "Rock, Paper, Scissors"?') {

          text = 'Invalid input, try again. Would you like to play "Rock, Paper, Scissors"?';

        } else {

          text = "Invalid input, try again. " + "Would you like to play another round?" + " (round:" + " " + round + "/5)";

        }

      }
    }

    //Reseting the validation for the next round.
    inputValid = false;





    //Increment to proceed to the next round and clear again to prevent skipping the score.
    again = "Here we go!"

    //round increment moved to rps event listener.
  } else {
    console.log(humanScore, computerScore);
    //Offer a tiebreaker if round 5 is a tie.
    if (humanScore === computerScore && !tieFlag) {
      console.log("tie detected");
      limit++;
      tieFlag = true;
      text = "Would you like to do a tiebreaker round?"  + " (round:" + " " + round + "/5)";
      return checkGame(text);
    }

    //Assume the game is tied, and check for the other two conditions.
    let gameWinner = "Tied!";
    if (humanScore !== computerScore) {
      gameWinner = humanScore > computerScore ? "The Player!" : "The Computer!";
    }

    //Announce the winner and final score.
    alert("The winner is..." + "\n" + "\n" + gameWinner + "\n" + "\n" + "Final score:" + "\n" + "Player: " + humanScore + " Computer: " + computerScore);

    //Indicate we should ask if they want to play again.
    gameReset = true;
    return true;
  }
  return true;
}

let humanScore = 0;
let computerScore = 0;
let limit = 6;
let iWantToPlay = true;
let again;
let gameReset = false;
let round = 1;
let tieFlag = false;

//Place the game in a loop so that it can be replayed as much as is wanted.
function checkGame(again) {
  console.log(again);
  //again will be undefined the first time, thus triggering the default assignment.
  playGame(again);

  if (gameReset) {
    //Acknowledge that this would be a follow-up match being offered.
    again = "Would you like to play another match?";
    round = 1;
    limit = 6;
    tieFlag = false;
    roundScore = [0, 0];
    humanScore = 0;
    computerScore = 0;
    scoreboardPlayer.textContent = `Player: ${roundScore[0]}`;
    scoreboardComputer.textContent = `CPU: ${roundScore[1]}`;

    return checkGame(again);
  }
}
checkGame();
