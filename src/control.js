
import Time from './time.js';
import Lottery from './lottery.js';
import Player from './player.js';
import GameInput from './input.js';
import GameView from './view.js';
const { floor, random } = Math;


class GameControl {
    constructor() {
        this.gameTime = new Time();
        this.player = new Player();
        this.lottery = new Lottery();

        this.input = new GameInput(this);
        this.view = new GameView(this);

        this.stepLength = 1; // minutes
        this.randomEventChance = 0.05;
        this.updateRate = 1000 / 4;

        this.paused = false;

        this.lastResult = false;

        this.init();
    }
    loop() {
        if(this.paused) {
            clearTimeout(this.timeout);
            return;
        }
        this.timeout = setTimeout(() => {
            this.step();
            this.loop();
        }, this.updateRate);
    }
    step() {
        this.gameTime.minutes += this.stepLength;
        if(this.lottery.time < this.gameTime.time) {
            const result = this.pepu();
            this.lastResult = { pot: this.lottery.pot, result };
            this.lottery = new Lottery(this.gameTime);
        }
        else if(random() < this.randomEventChance) {
            const event = this.getRandomEvent();
            event(this);
        }
    }
    init() {
        this.gameTime.hours = 7.5;
        this.loop();
        this.view.loop(this);
    }
    canSleep() {
        return !this.paused;
    }
    sleep() {
        if(this.gameTime.hours >= 22) {
            // Sleep entire night
            this.gameTime.day += 1;
            this.gameTime.hours = 7;
            this.gameTime.minutes = 50;
        } else {
            // Sleep until rested
            this.gameTime.hours += 7.5;
        }
    }
    canBuy() {
        return !this.paused && this.player.money >= this.lottery.ticketPrice;
    }
    buy() {
        const maxTickets = floor(this.player.money / this.lottery.ticketPrice);
        this.player.money -= maxTickets * this.lottery.ticketPrice;
        this.lottery.addTickets('player', maxTickets);
    }
    canWork() {
        return !this.paused && this.gameTime.hours >= 8 && this.gameTime.hours <= 17 && (this.gameTime.day % 7 <= 4)
    }
    work() {
        this.gameTime.hours += 1;
        this.player.money += this.player.salary;
    }
    canIdle() {
        return !this.paused && (!this.canWork() || !this.canSleep());
    }
    idle() {
        this.gameTime.hours += 0.5;
    }
    pepu() {
        this.paused = true;
        return this.lottery.getResult();
    }
    canResume() {
        return this.paused;
    }
    resume() {
        this.paused = false;
        this.loop();
    }

    getRandomEvent() {
        const events = [
            (state) => {
                // npcs don't buy tickets during nighttime
                if(state.gameTime.hours >= 8 && state.gameTime.hours <= 20) {
                    state.lottery.addTickets('npcs', floor(random() * 10))
                }
            }
        ]
        return events[floor(random() * events.length)];
    }
}

export default GameControl;