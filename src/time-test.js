import Time from './time.js';

const firstTime = new Time();
firstTime.time = 110;
const secondTime = new Time(firstTime.valueOf());
secondTime.minutes = 0
secondTime.hours = 14
secondTime.day = 4
secondTime.week = firstTime.week + 1;
const thirdTime = new Time(secondTime.valueOf());
thirdTime.minutes = 0
thirdTime.hours = 14
thirdTime.day = 4
thirdTime.week = secondTime.week + 1;
console.log(firstTime.toString())
console.log(secondTime.toString());
console.log(thirdTime.toString());