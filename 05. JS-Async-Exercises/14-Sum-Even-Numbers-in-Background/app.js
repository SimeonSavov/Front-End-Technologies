// Initialize the sum of even numbers
let evenSum = 0;

// Function to calculate the sum of even numbers
function calculateEvenSum() {
    for (let i = 2; i <= 1000000000; i += 2) {
        evenSum += i;
    }
}

// Function to handle user commands
function handleCommand(command) {
    switch (command) {
        case 'show':
            console.log(`Current sum of even numbers: ${evenSum}`);
            break;
        case 'exit':
            console.log('Calculation stopped.');
            break;
        default:
            console.log('Invalid command. Use "show" or "exit".');
    }
}

// Start the calculation when the button is clicked
function startCalculation() {
    calculateEvenSum();
    console.log('Calculation started. Use "show" to display the sum or "exit" to stop.');

    // Read user input using prompt
    let userInput;
    do {
        userInput = prompt('Enter command ("show" or "exit"):').trim().toLowerCase();
        handleCommand(userInput);
    } while (userInput !== 'exit');
}