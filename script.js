const readline = require('readline');

// create the readline interface for user input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// game choices
const choices = ["rock", "paper", "scissors"];

// initialize the scores
let userScore = 0;
let computerScore = 0;

// function to get the random computer's choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// function for the user's choice
function createUserChoice(choice) {
    return function () {
        return choice;
    }
}

// function to handle user choice
function handleUserChoice(userInput) {
    const userChoice = userInput.toLowerCase();

    // check if the user's choice is valid
    if (!choices.includes(userChoice)) {
        console.log("Invalid choice. Please choose from rock, paper, or scissors.");
        promptUser();
        return;
    }

    const computerChoice = getComputerChoice();
    const userChoiceClosure = createUserChoice(userChoice);
    determineWinner(userChoiceClosure, computerChoice);
}

// function to determine the winner
function determineWinner(userChoice, computerChoice) {
    console.log(`The computer chose ${computerChoice}`);
    console.log(`You chose ${userChoice()}`);

    // check conditions
    if (userChoice() === computerChoice) {
        console.log("It's a tie!");
        promptUser();
    } else if (
        (userChoice() === "rock" && computerChoice === "scissors") ||
        (userChoice() === "paper" && computerChoice === "rock") ||
        (userChoice() === "scissors" && computerChoice === "paper")) {
        console.log("You win!");
        userScore++;
        console.log(`Your score: ${userScore}`);
        console.log(`Computer score: ${computerScore}`);
    } else {
        console.log("Computer wins!");
        computerScore++;
        console.log(`Your score: ${userScore}`);
        console.log(`Computer score: ${computerScore}`);
    }

    playAgain();
}

// function to prompt user and take input
function promptUser() {
    rl.question("Enter rock, paper, or scissors: ", handleUserChoice)
}

function playAgain() {
    console.log("Do you want to play again? (yes/no)");
    rl.question("Enter your choice: ", (answer) => {
        if (answer.toLowerCase() === "yes") {
            promptUser();
        } else {
            console.log("Thanks for playing!");
            rl.close();
        }
    });
}

// function to start the game!
function startGame() {
    console.log("Welcome to Rock, Paper, Scissors!");
    promptUser();
}

startGame();