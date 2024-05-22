// Initialize game state
let gameStarted = false;
let playAgain = true;

// Function to simulate delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to handle player choices
async function handleChoice(message, options) {
    console.log(message);
    const userInput = await prompt(options);
    return userInput.toLowerCase();
}

// Main game loop
async function startAdventure() {
    console.log("Welcome to the simple text adventure game!");

    while (playAgain) {
        if (!gameStarted) {
            const startChoice = await handleChoice(
                "You find yourself in a dark forest. You can go 'left' or 'right'.",
                "What do you do? (left/right)"
            );

            if (startChoice === "left") {
                const animalChoice = await handleChoice(
                    "You encounter a wild animal! You can 'fight' or 'run'.",
                    "What do you do? (fight/run)"
                );

                if (animalChoice === "fight") {
                    console.log("You bravely fight the animal and win!");
                } else if (animalChoice === "run") {
                    console.log("You run away safely.");
                }
            } else if (startChoice === "right") {
                const chestChoice = await handleChoice(
                    "You find a treasure chest! You can 'open' it or 'leave' it.",
                    "What do you do? (open/leave)"
                );

                if (chestChoice === "open") {
                    console.log("You open the chest and find a treasure! You win!");
                } else if (chestChoice === "leave") {
                    console.log("You leave the chest and go back to the start.");
                }
            }

            const playAgainChoice = await handleChoice(
                "Do you want to play again? (yes/no)",
                "yes/no"
            );

            playAgain = playAgainChoice === "yes";
            gameStarted = true;
        } else {
            const restartChoice = await handleChoice(
                "Do you want to play again? (yes/no)",
                "yes/no"
            );

            playAgain = restartChoice === "yes";
        }
    }

    console.log("Thank you for playing!");
}