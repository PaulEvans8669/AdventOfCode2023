import {sample, complete} from "./data";

interface Coordinates {
    x: number,
    y: number
}

interface Gear {
    coordinates: Coordinates,
    numbers: GearNumber[]
}

interface NumberCoordinates {
    row: number,
    startX: number,
    endX: number
}

interface GearNumber {
    coordinates: NumberCoordinates,
    value: number
}

const DATA = complete;

// console.log('data :\n', DATA);
// find all symbols, get all adjacent numbers
// findSymbols
// findEntireNumber

const dataArray = DATA.split('\n');

let symbolsCoords = findSymbols(dataArray)
console.log(symbolsCoords);

let gears = symbolsCoords
    .reduce((acc, coords) => [...acc, findAdjacentNumbers(dataArray, coords)], [] as (Gear | undefined)[])
    .filter(gear => !!gear) as Gear []
console.log(gears);

let sum = gears.reduce((acc, gear) => acc + gear.numbers[0].value * gear.numbers[1].value, 0)
console.log(sum)



function findSymbols(data: string[]): Coordinates[] {
    return data.reduce((acc: any, line: any, y) =>
        [...acc,
            ...[...line].reduce((lineAcc, el: any, x: number) => {
                if (!el.match(/\*/gi)) {
                    return lineAcc
                }
                return [...lineAcc, {x, y}]
            }, [])
        ],
        []
    )
}

function findAdjacentNumbers(data: string[], coords: Coordinates): Gear | undefined {
    let adjacentNumbers: Coordinates[] = [];

    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        const inspectY = coords.y + offsetY;
        if(!(0 <= inspectY && inspectY < data.length)){
            continue;
        }
        const row = data[inspectY];
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            const inspectX = coords.x + offsetX;
            if(!(0 <= inspectX && inspectX < row.length)){
                continue;
            }
            if(row[inspectX].match(/[0-9]/gi)){
                adjacentNumbers.push({x: inspectX, y: inspectY})
            }
        }
    }
    let numberCoords = adjacentNumbers
        .reduce((acc, coords) => [...acc, findNumberCoordinatesBySpread(dataArray, coords)], [] as NumberCoordinates[])

    let uniqueNumberCoords = numberCoords
        .filter((coords, i) =>
            numberCoords.findIndex(search => search.row === coords.row && search.startX === coords.startX && search.endX === coords.endX) === i
        )
    let gearNumbers = uniqueNumberCoords.map(coords => getNumberValue(dataArray, coords))

    return uniqueNumberCoords.length === 2
        ? {coordinates: coords, numbers: gearNumbers}
        : undefined
}

function findNumberCoordinatesBySpread(data: string[], coords: Coordinates): NumberCoordinates {
    const row = data[coords.y];
    // spread left
    let minX = coords.x
    while(0 <= minX - 1 && row[minX - 1].match(/[0-9]/gi)){
        minX--;
    }
    // spread right
    let maxX = coords.x
    while(maxX + 1 < row.length && row[maxX + 1].match(/[0-9]/gi)){
        maxX++;
    }
    return {row: coords.y, startX: minX, endX: maxX}
}

function getNumberValue(data: string[], numberCoords: NumberCoordinates): GearNumber {
    const row = data[numberCoords.row];
    return {coordinates: numberCoords, value: +row.substring(numberCoords.startX, numberCoords.endX+1)}
}