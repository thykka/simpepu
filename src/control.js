
import Time from './time.js';
import Lottery from './lottery.js';
import Player from './player.js';
import GameInput from './input.js';
const { floor } = Math;

class GameControl {
    constructor() {
        this.gameTime = new Time();
        this.player = new Player();
        this.lottery = new Lottery();
        this.init();
        this.intervalId = setInterval(() => {
            this.step();
        }, 1000);
    }
    step() {
        this.gameTime.minutes += 1 / 6;
        console.clear();
        console.log(this.gameTime.toString());
        console.log(`You have ${ this.lottery.tickets.player } tickets, ${ this.player.money }€ and`)
    }
    init() {
        this.gameTime.hours = 7.5;
    }
    sleep() {
        this.gameTime.hours += 8;
    }
    buy() {
        const maxTickets = floor(this.player.money / this.lottery.ticketPrice);
        this.player.money -= maxTickets * this.lottery.ticketPrice;
        this.lottery.addTickets('player', 1);
    }
    work() {
        this.gameTime.hours += 1;
        this.player.money += this.player.salary;
    }
    pepu() {
        const result = this.lottery.getResult();
    }
}

export default GameControl;