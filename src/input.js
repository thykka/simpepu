import InputActions from './input-actions.js';

const { stdin } = process;

class Input {
  constructor(state) {
    this.pressed = {};
    this.init(state);
  }

  init(state) {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', (key) => {
      // Ctrl-C
      if(key === '\u0003') this.quit();
      const action = InputActions[key];
      if(!action) return;
      if(action.allowed(state)) {
        action.action(state);
      }
    });
  }

  quit() {
    console.clear();
    process.exit();
  }
}

export default Input;