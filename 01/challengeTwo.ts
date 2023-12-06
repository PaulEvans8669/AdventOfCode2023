import {sample, complete} from "./dataTwo";

const DATA = complete;

const DIGITS = {
    'zero'  : 0,
    'one'   : 1,
    'two'   : 2,
    'three' : 3,
    'four'  : 4,
    'five'  : 5,
    'six'   : 6,
    'seven' : 7,
    'eight' : 8,
    'nine'  : 9,
}

function replaceDigits(str: string): string {
    Object.entries(DIGITS).forEach(([digit, value]) => {
        str = str.replaceAll(digit, digit + value.toString() + digit)
    })
    return str
}

const sum =
    DATA.split('\n').map(row =>
        replaceDigits(row)
            .replaceAll(/[a-z]*/ig, '')
            .trim()
    )
        .map(n => +(n[0] +n[n.length-1]))
        .reduce((acc, n) => acc + n, 0)

console.log(sum)
