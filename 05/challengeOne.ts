import {sample, complete} from "./data";

const DATA = complete;

class Range {
    source: number
    destination: number
    length: number
    constructor(source: number, destination: number, length: number) {
        this.source = source;
        this.destination = destination;
        this.length = length;
    }

    includesGivenSource(value: number): boolean{
        return value >= this.source && value <= this.source + this.length
    }

    getDestination(sourceValue: number): number {
        return this.destination - this.source + sourceValue
    }
}

class RangeGroup {
    ranges: Range[] = []

    addRange(range: Range): void {
        this.ranges.push(range)
    }

    getDestination(sourceValue: number): number {
        // let's suppose there is only one valid source at maximum, and that the first match is the correct one
        return this.ranges.find(range => range.includesGivenSource(sourceValue))?.getDestination(sourceValue) || sourceValue

    }
}


const DATA_PARTS = DATA.split(/\n\s*\n/)
const SEEDS = DATA_PARTS.find(part => part.includes('seeds'))!.split(':')[1].split(' ').filter(el => !!el.trim()).map(el => +el)
const SEED_SOIL = parseRange('seed-to-soil')
const SOIL_FERT = parseRange('soil-to-fertilizer')
const FERT_WATE = parseRange('fertilizer-to-water')
const WATE_LIGH = parseRange('water-to-light')
const LIGH_TEMP = parseRange('light-to-temperature')
const TEMP_HUMI = parseRange('temperature-to-humidity')
const HUMI_LOCA = parseRange('humidity-to-location')

// console.log(DATA_PARTS)
// console.log(SEEDS, SEED_SOIL, SOIL_FERT, FERT_WATE, WATE_LIGH, LIGH_TEMP, TEMP_HUMI, HUMI_LOCA)

const STEPS = [SEED_SOIL, SOIL_FERT, FERT_WATE, WATE_LIGH, LIGH_TEMP, TEMP_HUMI, HUMI_LOCA]

const locations = SEEDS.map((seed, idx) => {
    let stepDestination = seed;
    STEPS.forEach(step =>
        stepDestination = step.getDestination(stepDestination)
    )
    return stepDestination
})

console.log(locations)
console.log(Math.min(...locations))


function parseRange(name: string): RangeGroup {
    const rangeGroup = new RangeGroup();
    DATA_PARTS.find(part => part.includes(name))!
        .split(':')[1]
        .split('\n')
        .filter(el => !!el.trim())
        .forEach(strRange => {
            const [destination, source, length] = strRange.split(' ').filter(el => !!el).map(el => +el)
            rangeGroup.addRange(new Range(source, destination, length))
    })
    return rangeGroup
}


