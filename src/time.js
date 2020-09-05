const { floor } = Math;
const MinutesPerHour = 60;
const HoursPerDay = 24;
const DayNames = 'Monday Tuesday Wednesday Thursday PePuday Saturday Sunday'.split(' ');

class Time {
    constructor(time = 0) {
        this.time = time;
    }

    get hours() {
        return floor(this.time) % HoursPerDay;
    }

    set hours(newHours) {
        return this.time += newHours - this.hours;
    }

    get minutes() {
        return floor((this.time % 1) * MinutesPerHour) % MinutesPerHour;
    }

    set minutes(newMinutes) {
        return this.time += (newMinutes - this.minutes) / MinutesPerHour;
    }

    get day() {
        return floor(this.time / HoursPerDay);
    }

    set day(newDay) {
        return this.time += (newDay - this.day) * HoursPerDay;
    }

    get week() {
        return floor(this.day / DayNames.length) + 1
    }

    set week(newWeek) {
        return this.time += (newWeek - this.week) * HoursPerDay * DayNames.length
    }

    get weekday() {
        return DayNames[this.day % DayNames.length];
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