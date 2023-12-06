import {sample, complete} from "./dataOne";

const DATA = complete;

const sum =
DATA.split('\n').map(row =>
        row .replaceAll(/[a-z]*/ig, '')
            .trim()
    )
    .map(n => +(n[0] +n[n.length-1]))
    .reduce((acc, n) => acc + n, 0)

console.log(sum)
