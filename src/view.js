const CurrencyUnit = 'pc';
const UpdateRate = 1000 / 1//2;

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
    }

    formatStatus(state) {
        return `SimPePu

       Time: ${ state.gameTime.toString() }
      Money: ${ state.player.money }${ CurrencyUnit }
    Tickets: ${ state.lottery.tickets.player }
        Pot: ${ state.lottery.pot }
`;
    }

    currentTime() {
        return Date.now();
    }
}

export default ConsoleView;