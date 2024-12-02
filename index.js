// Two's Complement 
const prompt = require('prompt-sync')();


console.log('Write the number to convert to Calculate Two\'s Complement binary');
const userInput = parseInt(prompt());

const arrGetBinaryPlaceValues = (positiveNumber) => {
    // Finds Binary place values
    const arrBinaryPlace = []
    for (let i = 1; i < positiveNumber; i *= 2) {
        arrBinaryPlace.push(i);
        if ((i * 2) > positiveNumber) {
            arrBinaryPlace.push(i *= 2);
        }
    }
    arrBinaryPlace.reverse();
    console.log(`This is the Binary place values for ${positiveNumber} -> ${arrBinaryPlace}`); 
    return arrBinaryPlace;
}

/**Description of negativeNumberHandler Function
     * Computes the binary place values for a given positive number.
     *
     * This function generates an array of binary place values that are less than
     * or equal to the specified positive number. It iterates through powers of two,
     * adding each to the array, and reverses the array before returning it.
     *
     * @param {number} positiveNumber - The positive number for which to find binary place values.
     * @returns {number[]} An array of binary place values in descending order.
*/
const negativeNumberHandler = (arrBinary) => {
    console.log("Handling negative number...");
    // Create a flipped version of the binary array
    const flippedBinary = arrBinary.map(bit => (bit === 1 ? 0 : 1));

    // Add 1 to the flipped binary (Two's complement logic)
    let carry = 1;
    for (let i = flippedBinary.length - 1; i >= 0; i--) {
        let sum = flippedBinary[i] + carry; // If flippedBinary[i] = 1, then sum = 2. If flippedBinary[i] = 0, then sum = 1.
        flippedBinary[i] = sum % 2; // If sum is 2, flippedBinary[i] = 0. If sum is 1, flippedBinary[i] = 1. If sum is 0, flippedBinary[i] = 0.
        carry = Math.floor(sum / 2); // If sum is 2, carry = 1. If sum is 1, carry = 0. If sum is 0, carry = 0.        

        console.log(`Efter flippedBinary[i] = ${flippedBinary[i]} efter sum = ${sum} efter carry = ${carry}`);
    }

    console.log(`Binary after adding 1 (Two's Complement): ${flippedBinary}`);
    return flippedBinary;
};



// Calculation
const calculate = (input) => {
    if (typeof input === "number") {
        //If the value is negative then it will be converted to a positive number
        let inputIsNegativeNum
        if (input < 0) {
            console.log(`Input number is a negative number`);
            inputIsNegativeNum = true;
            input = Math.abs(input);
        } else {
            inputIsNegativeNum = false;
        }

        let arrBinary = [];
        let mutateInput = input

        const arrBinaryPlaceValues = arrGetBinaryPlaceValues(input);

        arrBinaryPlaceValues.forEach(element => {
            if (element <= mutateInput) {
                arrBinary.push(1);
                mutateInput -= element;
            } else {
                arrBinary.push(0);
            }
        });

        if (inputIsNegativeNum) {
            arrBinary = negativeNumberHandler(arrBinary);
        }

        console.log(`This is the ${input} in Two's Complement binary ${arrBinary}`);
    }
    

}

calculate(userInput);