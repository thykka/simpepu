
import Time from './time.js';
import Lottery from './lottery.js';
import Player from './player.js';
import GameInput from './input.js';
import GameView from './view.js';
const { floor } = Math;

const UpdateRate = 1000 / 4;


class GameControl {
    constructor() {
        this.gameTime = new Time();
        this.player = new Player();
        this.lottery = new Lottery();

        this.input = new GameInput(this);
        this.view = new GameView(this);
        this.init();
    }
    loop() {
        this.timeout = setTimeout(() => {
            this.step();
            this.loop();
        }, UpdateRate);
    }
    step() {
        this.gameTime.minutes += 1 / 6;
    }
    init() {
        this.gameTime.hours = 7.5;
        this.loop();
        this.view.loop(this);
    }
    canSleep() {
        return this.gameTime.hours < 8 || this.gameTime.hours > 18;
    }
    sleep() {
        this.gameTime.hours += 8;
    }
    canBuy() {
        return this.player.money >= this.lottery.ticketPrice;
    }
    buy() {
        const maxTickets = floor(this.player.money / this.lottery.ticketPrice);
        this.player.money -= maxTickets * this.lottery.ticketPrice;
        this.lottery.addTickets('player', 1);
    }
    canWork() {
        return this.gameTime.hours >= 8 && this.gameTime.hours <= 18
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