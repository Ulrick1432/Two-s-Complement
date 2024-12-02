const prompt = require('prompt-sync')();

console.log("Write the number to convert to Two's Complement binary:");
const userInput = parseInt(prompt());

const arrGetBinaryPlaceValues = (positiveNumber) => {
    // Finds binary place values
    const arrBinaryPlace = [];
    for (let i = 1; i <= positiveNumber; i *= 2) {
        arrBinaryPlace.push(i);
        if ((i * 2) > positiveNumber) {
            arrBinaryPlace.push(i *= 2);
        }
    }
    arrBinaryPlace.reverse();
    console.log(`Binary place values for ${positiveNumber}: ${arrBinaryPlace}`);
    return arrBinaryPlace;
};

const negativeNumberHandler = (arrBinary) => {
    console.log("Handling negative number...");
    // Create a flipped version of the binary array
    const flippedBinary = arrBinary.map(bit => (bit === 1 ? 0 : 1));
    console.log(`Flipped binary: ${flippedBinary}`);

    // Add 1 to the flipped binary (Two's complement logic)
    let carry = 1;
    for (let i = flippedBinary.length - 1; i >= 0; i--) {
        let sum = flippedBinary[i] + carry;
        flippedBinary[i] = sum % 2;
        carry = Math.floor(sum / 2);
    }

    console.log(`Binary after adding 1 (Two's Complement): ${flippedBinary}`);
    return flippedBinary;
};

const calculate = (input) => {
    if (typeof input === "number") {
        let isNegative = false;

        // Check if the number is negative
        if (input < 0) {
            console.log(`Input number is negative: ${input}`);
            isNegative = true;
            input = Math.abs(input);
        }

        let arrBinary = [];
        let mutateInput = input;

        // Get binary place values
        const arrBinaryPlaceValues = arrGetBinaryPlaceValues(input);

        // Construct binary representation
        arrBinaryPlaceValues.forEach(placeValue => {
            if (placeValue <= mutateInput) {
                arrBinary.push(1);
                mutateInput -= placeValue;
            } else {
                arrBinary.push(0);
            }
        });

        console.log(`Binary representation of ${input}: ${arrBinary}`);

        // If the number was negative, handle Two's Complement
        if (isNegative) {
            arrBinary = negativeNumberHandler(arrBinaryPlaceValues, arrBinary);
        }

        console.log(`Final binary representation: ${arrBinary.join('')}`);
    }
};

calculate(userInput);
