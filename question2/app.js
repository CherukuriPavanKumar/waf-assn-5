const readline = require('readline');
const { add, multiply } = require('./math');

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

input.question('Enter the first number: ', (firstInput) => {
  input.question('Enter the second number: ', (secondInput) => {
    const firstNumber = Number(firstInput);
    const secondNumber = Number(secondInput);

    if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
      console.log('Please enter two valid numbers.');
    } else {
      console.log(`Sum: ${add(firstNumber, secondNumber)}`);
      console.log(`Product: ${multiply(firstNumber, secondNumber)}`);
    }

    input.close();
  });
});
