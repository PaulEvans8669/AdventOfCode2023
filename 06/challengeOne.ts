import {sample, complete} from "./data";

const DATA = complete;

interface Race {
    time: number,
    distance: number
}

const [time, dist] = DATA.split('\n').map(row => row.split(':')[1].split(' ').filter(el => !!el.trim()).map(el => +el))

const races: Race[] = []
console.log(time)
console.log(dist)

time.forEach((t, i) => races.push({time: t, distance: dist[i]}))

const count = races.map(race => {
    console.log(race)
    const results = Array.from(Array(race.time+1)).map((_, i) => f(i, race.time))
   return results.filter(res => res > race.distance)
})
    .reduce((acc, v) => acc === 0 ? v.length : acc * v.length, 0)

console.log(count)

function f(t: number, max: number) {
    return t * (max - t)
}
