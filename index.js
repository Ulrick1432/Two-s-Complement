// Two's Complement 
const prompt = require('prompt-sync')();


console.log('Write the number to convert to Calculate Two\'s Complement binary');
const userInput = parseInt(prompt());

// Calculation
const calculate = (input) => {
    if (typeof input === "number") {
        //If the value is negative then it will be converted to a positive number
        let inputIsNegativeNum
        if (input < 0) {
            inputIsNegativeNum = true;
            input = Math.abs(input);
        } else {
            inputIsNegativeNum = false;
        }

        let arrBinary = [];
        let mutateInput = input


        // Finds Binary place values
        const arrBinaryPlaceValues = []
        for (let i = 1; i < input; i *= 2) {
            arrBinaryPlaceValues.push(i);
            if ((i * 2) > input) {
                arrBinaryPlaceValues.push(i *= 2);
            }
        }
        arrBinaryPlaceValues.reverse();
        console.log(`This is the Binary place values for ${input} -> ${arrBinaryPlaceValues}`); 


        // Hvis det første af de højseste tal der er mindre eller lig med input numret. og minus input med det tal.
        // Find det næste tal der er lig med eller mindre end input numret.
        // 


        arrBinaryPlaceValues.forEach(element => {
            if (element <= mutateInput) {
                arrBinary.push(1);
                mutateInput -= element;
            } else {
                arrBinary.push(0);
            }
        });

        // Hvis input nummer er minus skal binary numbers flippes efter mindste binary place number
        const obj = {};
        if (inputIsNegativeNum) {
            for (let i = arrBinaryPlaceValues.length; i > -1; i--) {
                obj[arrBinaryPlaceValues[i]] = arrBinary[i];
            }
            console.log(`obj now with values = ${JSON.stringify(obj)}`);
                
            let lowestNumberFound = false;
            arrBinary = [];
            for (let i in obj) {            
                if (lowestNumberFound) {
                    //Flip values after lowest number with the value of 1;
                    obj[i] = obj[i] === 1 ? 0 : 1;
                }

                if (!lowestNumberFound && obj[i] === 1) {
                    lowestNumberFound = true;
                    console.log(`Lowest value is ${i}`);
                }
                arrBinary.push(obj[i]);
            }
            console.log(`obj now with values = ${JSON.stringify(obj)} flipped`);
        }

        console.log(`This is the ${input} in Two's Complement binary ${arrBinary}`);
        /* Instead of the above for each loop this loop would give the same result.
            for (let i = 0; i < arrBinaryPlaceValues.length; i++) {
                if (arrBinaryPlaceValues[i] <= mutateInput) {
                    arrBinary.push(1);
                    mutateInput -= arrBinaryPlaceValues[i];
                } else {
                    arrBinary.push(0);
                }
            }
        */

    }
    

}

calculate(userInput);

/* 
binary place values
0   0   0   0   0   0   0   0
128 64  32  16  8   4   2   1
    Example:
        input = 22
        Find binary place values {
            func () {
                for (i = 1; i < Input; i * 2) {

                    return i // we now got the binary place values should in this case be 32
                }
            }
        }
        


*/