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