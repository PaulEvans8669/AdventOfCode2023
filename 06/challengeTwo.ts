import {sample, complete} from "./data";

const DATA = complete;


const [time, distance] = DATA.split('\n').map(row => +row.split(':')[1].replaceAll(' ', ''))


console.log(time, distance)

const results = Array.from(Array(time+1)).map((_, i) => f(i, time))
const ways = results.filter(res => res > distance).length

console.log(ways)
function f(t: number, max: number) {
    return t * (max - t)
}
