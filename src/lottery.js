import Time from "./time.js";
const { random } = Math;

class Lottery {
    constructor(currentTime = 0) {
        this.ticketPrice = 1;
        this.tickets = {
            player: 0,
            npcs: 0
        };
        this.time = new Time(currentTime);
        this.time.day = 4;
        this.time.hours = 14;
        this.time.minutes = 0;
    }

    get pot() {
        return Object.values(this.tickets).reduce((sum, value) => sum + value, 0);
    }

    get chance() {
        return this.tickets.player / this.pot;
    }

    addTickets(buyer, amount) {
        this.tickets[buyer] += amount;
    }

    getResult() {
        const playerChance = Math.min(this.tickets.player / this.tickets.npcs, 1);
        const playerWon = random() < playerChance;
        return playerWon;
    }
}

export default Lottery;