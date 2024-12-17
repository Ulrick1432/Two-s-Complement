// Two's Complement 
const prompt = require('prompt-sync')();
const typeText = require('./autoTypingTerminal');
//const arrGetBinaryValues = require('./test');

console.log('----------------------Write an integer to convert it to Two\'s Complement binary----------------------');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Asynchronously calculates the binary place values for a given positive number.
 * 
 * This function determines the necessary binary place values required to represent
 * the given positive number in binary form. It uses an animated typing effect to
 * display the process of calculating these values.
 * 
 * @param {number} positiveNumber - The positive number for which binary place values are calculated.
 * @returns {Promise<number[]>} A promise that resolves to an array of binary place values.
 */
const arrGetBinaryPlaceValues = async (positiveNumber) => {
    // Finds Binary place values
    const arrBinaryPlace = []
    let binaryPlaceValueIndex = 1;

    await typeText.typeMessage(`We will always need at least one binary. Because of this we will...`);
    await typeText.typeMessage(`add the first binary place value which will always be ${binaryPlaceValueIndex}`);
    await typeText.typeMessage(`We will then do the following:`);

    do {
        arrBinaryPlace.push(binaryPlaceValueIndex);
        if ((binaryPlaceValueIndex * 2 ) > positiveNumber) {
            await typeText.typeMessage(`because binaryPlaceValueIndex * 2 (${binaryPlaceValueIndex * 2}) is higher than ur input (${positiveNumber})...`);
            await typeText.typeMessage(`we will add the last binary place value ${binaryPlaceValueIndex * 2}`);
            arrBinaryPlace.push(binaryPlaceValueIndex *= 2);   
            arrBinaryPlace.reverse();
            await typeText.typeMessage(`We now have all the index place values needed for for ur input (${positiveNumber}) and now look like this...`);
            await typeText.typeMessage(`${arrBinaryPlace} we now also know have many bit is at least needed → ${arrBinaryPlace.length}`);
        }
        if ((binaryPlaceValueIndex * 2 ) <= positiveNumber) {
            await typeText.typeMessage(`check if the binary place value (${binaryPlaceValueIndex}) is less than or equal to ur input (${positiveNumber})...`);
            await typeText.typeMessage(`Which it is. We then add binaryPlaceValueIndex * 2 (${binaryPlaceValueIndex * 2}) as our next binary place value`);
        }
        binaryPlaceValueIndex *= 2;
    } while (binaryPlaceValueIndex <= positiveNumber);

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
const negativeNumberHandler = async (arrBinary, userInput) => {
    await typeText.typeMessage(`We now have the binary of ${userInput} if it was a positive integer...`);
    await typeText.typeMessage(`but because the input number is negative, we need to handle differently`)
    await delay(3000);
    await typeText.typeMessage(`We need to flip the binary values, which in this case is ${arrBinary}`);
    await delay(3000);
    // Create a flipped version of the binary array
    const flippedBinary = arrBinary.map(bit => (bit === 1 ? 0 : 1));
    await typeText.typeMessage(`The binary values is now ${flippedBinary}. If the bit was 1 before it's now 0 and conversely`);
    await delay(3000);

    // Add 1 to the flipped binary (Two's complement logic)
    await typeText.typeMessage(`We now need to add 1 to the flipped binary → ${flippedBinary} by looping throught it from the right to left / smallest binary place value.`);
    await delay(3000);
    let carry = 1;
    for (let i = flippedBinary.length - 1; i >= 0; i--) {

        await typeText.typeMessage(`------- Loop index = ${i} -------`);
        let sum = flippedBinary[i] + carry;
        await typeText.typeMessage(
            `At position ${i}: \n` +
            `- The current binary bit is ${flippedBinary[i]}.\n` +
            `- The carry is ${carry}.\n` +
            `- Adding these together gives sum = ${flippedBinary[i]} + ${carry} = ${sum}.`
        );
        flippedBinary[i] = sum % 2;
        await typeText.typeMessage(
            `The new binary bit at position ${i} is determined as follows:\n` +
            `- If the sum is even (0 or 2), the bit becomes 0.\n` +
            `- If the sum is odd (1), the bit becomes 1.\n` +
            `So, the updated binary bit is ${flippedBinary[i]}.`
        );
        carry = Math.floor(sum / 2);
        await typeText.typeMessage(
            `The carry is determined as follows:\n` +
            `- If the sum is 2 or more, we "carry over" a 1 to the next higher bit.\n` +
            `- If the sum is less than 2, there is no carry (carry = 0).\n` +
            `Thus, the carry is now ${carry}.`
        );

        //console.log(`Step: Bit position ${i}, Flipped bit: ${flippedBinary[i]}, Carry: ${carry}`);
        await delay(3000);
    }

    console.log(`Binary after adding 1 (Two's Complement): ${flippedBinary}`);
    await delay(3000);
    return flippedBinary;
};

/**
 * Converts a given integer to its binary representation using Two's Complement.
 * 
 * This function iterates over an array of binary place values, determining
 * whether each place value should be represented as a 1 or 0 in the binary
 * representation of the provided integer. It uses an asynchronous typing
 * effect to display messages explaining each step of the conversion process.
 * 
 * @param {number} userInput - The integer to be converted to binary.
 * @param {number[]} arrBinaryPlaceValues - An array of binary place values
 *     used to determine the binary representation.
 * @returns {Promise<number[]>} A promise that resolves to an array representing
 *     the binary form of the input integer.
 */
const arrGetBinaryValues = async (userInput, arrBinaryPlaceValues) => {
    await typeText.typeMessage(`For each of the binary place values (from highest to lowest) we do the following:`);
    await typeText.typeMessage(`check if the binary place value is equal or less than ur input (${userInput})...`);
    await typeText.typeMessage(`If this is true we will place the binary number 1 under binary place value and 0 if the not true.`);

    let mutateInput = userInput;
    let arrBinary = [];
    for await (const element of arrBinaryPlaceValues) {
        console.log(`Processing element: ${element}, Current mutateInput: ${mutateInput}`);
        if (element <= mutateInput) {
        await typeText.typeMessage(`binary will be 1 at ${element} because ${mutateInput} is less or equal`);
        arrBinary.push(1);
        await typeText.typeMessage(`Extracts ${element} from ${mutateInput}... ur input is now (${mutateInput - element})`);
        mutateInput -= element;
        } else {
        arrBinary.push(0);
        await typeText.typeMessage(`binary will be 0 at ${element} because ${mutateInput} is higher`);
        }
    }
    console.log(`Final binary array: ${arrBinary}`);
    return arrBinary;

}

/**
 * Asynchronously calculates the Two's Complement binary representation of a user-provided integer.
 * Prompts the user for input, validates it, and processes it to determine its binary form.
 * Handles both positive and negative integers, converting negative numbers to positive for initial processing.
 * Utilizes helper functions to determine binary place values and convert to binary.
 * Outputs the results through a simulated typing effect and logs the final binary representation.
 * If the input is invalid, prompts the user to try again.
 */
const calculate = async () => {
    let userInput = parseInt(prompt());
    // Checks if the input is a number
    if (!isNaN(userInput)) {
        //If the value is negative it will be converted to a positive number
        let inputIsNegativeNum
        if (userInput < 0) {
            await typeText.typeMessage(`1. First we need to find the Binary place values for ${userInput} → we will handle it as a positive number`);
            inputIsNegativeNum = true;
            userInput = Math.abs(userInput);
        } else {
            inputIsNegativeNum = false;
            await typeText.typeMessage(`1. First we need to find the Binary place values for ${userInput}`);
        }

        const arrBinaryPlaceValues = await arrGetBinaryPlaceValues(userInput);
        await typeText.typeMessage(`2. Now when we have the binary place values we can calculate the binary numbers`);
        await typeText.typeMessage(`Again this is the binary place values → ${arrBinaryPlaceValues}`);
        await delay(3000);

        let arrBinary = await arrGetBinaryValues(userInput, arrBinaryPlaceValues);

        inputIsNegativeNum ? arrBinary = await negativeNumberHandler(arrBinary, userInput) : null;

        await typeText.typeMessage(`Result of binary place values: ${arrBinaryPlaceValues}`);
        await typeText.typeMessage(`Result of ${userInput} in Two's Complement binary: ${arrBinary}`);
        await typeText.typeMessage(`${arrBinaryPlaceValues}`);
        await typeText.typeMessage(`${arrBinary}`);

        console.log(`This is the ${userInput} in Two's Complement binary ${arrBinary}`);
    } else {
        console.log('Input needs to be an integer - try again :D');
        return calculate();
    }
    

}

calculate();