import InputActions from './input-actions.js';

const CurrencyUnit = 'pc';
const UpdateRate = 1000 / 8//2;
const { floor } = Math;

class ConsoleView {
    constructor() {
        this.lastTime = this.currentTime();
    }

    loop(state) {
        this.timeout = setTimeout(() => {
            const currentTime = this.currentTime();
            this.draw(state, currentTime - this.lastTime);
            this.lastTime = currentTime;
            this.loop(state);
        }, UpdateRate);
    }

    stop() {
        this.timeout = clearTimeout(this.timeout);
    }

    draw(state) {
        console.clear();
        console.log(`${ this.formatStatus(state) }`);
        console.log(`       Actions: 
${ this.formatActions(state) }`);
    }

    formatStatus(state) {
        return `SimPePu

          Time: ${ state.gameTime.toString() }

   Last result: ${ this.formatLastResult(state) }
     Next PePu: ${ state.lottery.time.toString() }
           Pot: ${ state.lottery.pot }
Winning chance: ${ floor(state.lottery.tickets.player / state.lottery.pot * 100) || 0 }%

    Your money: ${ state.player.money }${ CurrencyUnit }
  Your tickets: ${ state.lottery.tickets.player }
`;
    }

    formatActions(state) {
        return Object.entries(InputActions).filter(
            ([key, action]) => action.allowed(state)
        ).map(
            ([key, action]) => `                ${ key } - ${ action.title}`
        ).join('\n')
    }

    currentTime() {
        return Date.now();
    }

    formatLastResult(state) {
        if(!state.lastResult) return 'n/a';
        return (
            state.lastResult.result ? 'You' : 'Someone else'
        ) + ' won ' + state.lastResult.pot + CurrencyUnit + ' worth of booze on the last round' + (state.paused ? '!!!' : '');
    }
}

export default ConsoleView;