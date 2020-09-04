const { floor, round } = Math;

class Time {
    constructor(time = 0) {
        this.time = time;
        this.dayNames = 'Monday Tuesday Wednesday Thursday PePuday Saturday Sunday'.split(' ');
        this.hoursPerDay = 24;
        this.minutesPerHour = 60;
    }

    get hours() {
        return floor(this.time) % this.hoursPerDay;
    }

    set hours(newHours) {
        return this.time += newHours - this.hours;
    }

    get minutes() {
        return round((this.time % 1) * this.minutesPerHour) % this.minutesPerHour;
    }

    set minutes(newMinutes) {
        return this.time += (newMinutes - this.minutes) / this.minutesPerHour;
    }

    get day() {
        return floor(this.time / this.hoursPerDay);
    }

    set day(newDay) {
        return this.time += (newDay - this.day) * this.hoursPerDay;
    }

    get week() {
        return floor(this.day / this.dayNames.length) + 1
    }

    set week(newWeek) {
        return this.time += (newWeek - this.week) * this.hoursPerDay * this.dayNames.length
    }

    get weekday() {
        return this.dayNames[this.day % this.dayNames.length];
    }

    set weekday(newWeekday) {
        throw Error(`Cannot set weekday to ${ newWeekday }; weekday is read-only.`);
    }

    toString() {
        return `${ this.weekday }, ${ this.hours }:${ this.padLeft(this.minutes) }, week ${ this.week }`;
    }

    valueOf() {
        return this.time;
    }

    padLeft(value) {
        return ('0' + value).slice(-2);
    }
}

export default Time;