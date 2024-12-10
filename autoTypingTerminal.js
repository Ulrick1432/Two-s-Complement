const prompt = require('prompt-sync')();

const message = 'My name is Ulrick :D';



/**
 * An object containing methods for simulating typing text in the terminal.
 *
 * @property {Function} typeMessage - Simulates typing a message to the terminal.
 * @param {string} message - The message to be typed out.
 * @param {number} [delay=100] - The delay in milliseconds between each character.
 */

const typeText = {

  typeMessage: function (message, delay = 100) {
    let i = 0;

    let action = setInterval(() => {
      process.stdout.write(message[i]);
      i++;
      if (i === message.length) {
        clearInterval(action);
        console.log();
      }

    }, delay);
  },


}

typeText.typeMessage(message, 50);

module.export = typeText;