import {sample, complete} from "./data";

const DATA = complete;

interface SeedRange {
    beginning: number,
    length: number
}
class SeedGroup {
    ranges: SeedRange[] = []

    addRange(seedRange: SeedRange, clean=true){
        this.ranges.push(seedRange);
    }

    hasSeed(seedValue: number): boolean {
        return this.ranges.some(range => range.beginning <= seedValue && seedValue < range.beginning + range.length )
    }

}

class Range {
    source: number
    destination: number
    length: number
    constructor(source: number, destination: number, length: number) {
        this.source = source;
        this.destination = destination;
        this.length = length;
    }

    includesGivenDestination(value: number): boolean{
        return value >= this.destination && value < this.destination + this.length
    }
    getSource(destinationValue: number): number {
        return destinationValue - (this.destination - this.source)
    }
}

class RangeGroup {
    ranges: Range[] = []

    addRange(range: Range): void {
        this.ranges.push(range)
    }

    getSource(destValue: number): number {
        // let's suppose there is only one valid source at maximum, and that the first match is the correct one
        return this.ranges.find(range => range.includesGivenDestination(destValue))?.getSource(destValue) || destValue

    }
}


const DATA_PARTS = DATA.split(/\n\s*\n/)
const SEEDS = parseSeeds()
const SEED_SOIL = parseRange('seed-to-soil')
const SOIL_FERT = parseRange('soil-to-fertilizer')
const FERT_WATE = parseRange('fertilizer-to-water')
const WATE_LIGH = parseRange('water-to-light')
const LIGH_TEMP = parseRange('light-to-temperature')
const TEMP_HUMI = parseRange('temperature-to-humidity')
const HUMI_LOCA = parseRange('humidity-to-location')


const STEPS_REVERSED = [SEED_SOIL, SOIL_FERT, FERT_WATE, WATE_LIGH, LIGH_TEMP, TEMP_HUMI, HUMI_LOCA].reverse()

let found = false;
let i = 0
while (!found) {
    let stepSource = i;
    STEPS_REVERSED.forEach(step =>
        stepSource = step.getSource(stepSource)
    )
    if(i % 1000000 === 0) console.log('testing... ', i)

    if(SEEDS.hasSeed(stepSource)){
        console.log('found seed', stepSource, 'location', i)
        found = true;
    }

    i++
}



// useless parsing section
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

function parseSeeds(): SeedGroup {
    const seedGroup: SeedGroup = new SeedGroup();
    const values = DATA_PARTS.find(part => part.includes('seeds'))!.split(':')[1].split(' ').filter(el => !!el.trim()).map(el => +el);
    for (let i = 0; i <= values.length / 2; i+=2) {
        seedGroup.addRange({beginning: values[i], length: values[i+1]})
    }
    return seedGroup
}
