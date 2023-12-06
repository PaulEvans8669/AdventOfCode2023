import {sample, complete} from "./dataOne";

const DATA = complete;

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

interface GameHand {
    red: number,
    green: number,
    blue: number
}
class Game {
    constructor(id: number, hands: GameHand[]) {
        this.id = id;
        this.hands = hands;
    }

    id: number
    hands: GameHand[]

    isPossible(){
        return !this.hands.some(h => h.red > MAX_RED || h.green > MAX_GREEN || h.blue > MAX_BLUE)
    }

    power(){
        return Math.max(...this.hands.map(h => h.red))
            * Math.max(...this.hands.map(h => h.green))
            * Math.max(...this.hands.map(h => h.blue))
    }
}

// parse
const games = DATA.split('\n').map(row => {
    const id = +row.split(':')[0].split(' ')[1]
    const hands = row
        .split(':')[1]
        .split(';')
        .map((hand: string) =>
            ['red', 'green', 'blue'].reduce((obj, key) =>
                    ({
                        ...obj,
                        [key]: +(hand.split(',')
                            .find(el => el.includes(key))
                            ?.trim()
                            .split(' ')[0] || 0)
                    })
                , {} as GameHand)
        )
    return new Game(id, hands)
})

// calculate points
const result = games.reduce((acc, game) => acc + game.power(), 0)


console.log(result)
