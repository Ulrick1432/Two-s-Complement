// Two's Complement 
const prompt = require('prompt-sync')();

console.log('----------------------Write the number to convert it to Two\'s Complement binary----------------------');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const arrGetBinaryPlaceValues = async (positiveNumber) => {
    // Finds Binary place values
    const arrBinaryPlace = []
    let binaryPlaceValueIndex = 1;

    do {
        console.log(`Adding ${binaryPlaceValueIndex}`);
        arrBinaryPlace.push(binaryPlaceValueIndex);
        if ((binaryPlaceValueIndex * 2 ) > positiveNumber) {
            console.log(`Adding ${binaryPlaceValueIndex * 2}`);
            arrBinaryPlace.push(binaryPlaceValueIndex *= 2);   
        }
        binaryPlaceValueIndex *= 2;
    } while (binaryPlaceValueIndex <= positiveNumber);

    arrBinaryPlace.reverse();
    console.log(`This is the Binary place values for ${positiveNumber} -> ${arrBinaryPlace}`); 
    await delay(3000);
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
const negativeNumberHandler = async (arrBinary) => {
    console.log("Handling negative number...");
    await delay(3000);
    console.log(`Because your input number is a negative number we need to flip the binary values ${arrBinary}`);
    await delay(3000);
    // Create a flipped version of the binary array
    const flippedBinary = arrBinary.map(bit => (bit === 1 ? 0 : 1));
    console.log(`It now looks like this → ${flippedBinary}`);
    await delay(3000);

    // Add 1 to the flipped binary (Two's complement logic)
    console.log(`We now need to add 1 to the flipped binary → ${flippedBinary} by looping throught it`);
    await delay(3000);
    let carry = 1;
    for (let i = flippedBinary.length - 1; i >= 0; i--) {
        let sum = flippedBinary[i] + carry; // If flippedBinary[i] = 1, then sum = 2. If flippedBinary[i] = 0, then sum = 1.
        flippedBinary[i] = sum % 2; // If sum is 2, flippedBinary[i] = 0. If sum is 1, flippedBinary[i] = 1. If sum is 0, flippedBinary[i] = 0.
        carry = Math.floor(sum / 2); // If sum is 2, carry = 1. If sum is 1, carry = 0. If sum is 0, carry = 0.        

        console.log(`Step: Bit position ${i}, Flipped bit: ${flippedBinary[i]}, Carry: ${carry}`);
        await delay(3000);
    }

    console.log(`Binary after adding 1 (Two's Complement): ${flippedBinary}`);
    await delay(3000);
    return flippedBinary;
};


// Calculation
const calculate = async () => {
    let userInput = parseInt(prompt());
    if (!isNaN(userInput)) {
        //If the value is negative it will be converted to a positive number
        let inputIsNegativeNum
        if (userInput < 0) {
            inputIsNegativeNum = true;
            userInput = Math.abs(userInput);
        } else {
            inputIsNegativeNum = false;
        }

        let arrBinary = [];
        let mutateInput = userInput;

        if (inputIsNegativeNum) {
            console.log(`First we need to find the Binary place values for ${userInput} → we will handle it as a positive number`);
            await delay(3000);
        } else {
            console.log(`First we need to find the Binary place values for ${userInput}`);
            await delay(3000);
        }

        const arrBinaryPlaceValues = await arrGetBinaryPlaceValues(userInput);
        console.log(`For each binary place values we can now calculate the binary numbers`);
        await delay(3000);
        console.log(`Again this is the Binary place values → ${arrBinaryPlaceValues}`);
        await delay(3000);

        arrBinaryPlaceValues.forEach(element => {
            if (element <= mutateInput) {
                console.log(`${element} is equal or less than ${mutateInput} so the binary for this place at ${element} will be 1`);
                arrBinary.push(1);
                mutateInput -= element;
            } else {
                arrBinary.push(0);
                console.log(`${element} is higher than ${mutateInput} so the binary for this place at ${element} will be 0`);
            }
        });

        if (inputIsNegativeNum) {
            console.log(
                `We now have the binary of ${userInput} if it was a positive number, but because the input number is negative,
                 we need to handle differently`
            )
            await delay(3000);
            arrBinary = await negativeNumberHandler(arrBinary);
        }

        console.log(`This is the ${userInput} in Two's Complement binary ${arrBinary}`);
    } else {
        console.log('Input needs to be a number - try again :D');
        return calculate();
    }
    

}

calculate();