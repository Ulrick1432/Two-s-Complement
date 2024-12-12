/**
 * An object containing methods for simulating typing text in the terminal.
 *
 * @property {Function} typeMessage - Simulates typing a message to the terminal.
 * @param {string} message - The message to be typed out.
 * @param {number} [delay=100] - The delay in milliseconds between each character.
 */

const typeText = {

  typeMessage: function (message, delay = 100) {
    return new Promise((resolve) => {
      let i = 0;
      let action = setInterval(() => {
        process.stdout.write(message[i]);
        i++;
        if (i === message.length) {
          clearInterval(action);
          console.log();
          resolve(); // Resolve the promise when done
        }
      }, delay);
    });
  },


}

module.exports = typeText;