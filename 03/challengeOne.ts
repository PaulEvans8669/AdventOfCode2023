import {sample, complete} from "./data";

interface Coordinates {
    x: number,
    y: number
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

let numberSpeckCoords = symbolsCoords
    .reduce((acc, coords) => [...acc, ...findAdjacentNumberSpecks(dataArray, coords)], [] as Coordinates[])
console.log(numberSpeckCoords);

let numberCoords = numberSpeckCoords
    .reduce((acc, coords) => [...acc, findNumberCoordinatesBySpread(dataArray, coords)], [] as NumberCoordinates[])
console.log(numberCoords);

let uniqueNumberCoords = numberCoords
    .filter((coords, i) =>
        numberCoords.findIndex(search => search.row === coords.row && search.startX === coords.startX && search.endX === coords.endX) === i
    )
console.log(uniqueNumberCoords);

let gearNumbers = uniqueNumberCoords.map(coords => getNumberValue(dataArray, coords))
console.log(gearNumbers);

let gearValueSum = gearNumbers.reduce((acc, gear) => acc + gear.value, 0)
console.log(gearValueSum)

function findSymbols(data: string[]): Coordinates[] {
    return data.reduce((acc: any, line: any, y) =>
        [...acc,
            ...[...line].reduce((lineAcc, el: any, x: number) => {
                if (!el.match(/^(?![0-9a-z\.])/gi)) {
                    return lineAcc
                }
                return [...lineAcc, {x, y}]
            }, [])
        ],
        []
    )
}

function findAdjacentNumberSpecks(data: string[], coords: Coordinates): Coordinates[] {
    let adjacentNumbers: Coordinates[] = [];

    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        const inspectY = coords.y + offsetY;
        if(!(0 <= inspectY && inspectY < data.length)){
            continue;
        }
        const row = data[inspectY];
        console.log(row)
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
    return adjacentNumbers
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