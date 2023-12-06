import {sample, complete} from "./data";


const DATA = complete;

const DATA_LIST = DATA.split('\n');

interface Card {
    played: number[],
    winnable: number[],
    winning: number[],
    instances: number
}

const cards = getCards(DATA_LIST)
cards.forEach((card, idx) => {
    for (let i = 0; i < card.instances; i++) {
        for (let j = 1; j <= card.winning.length && idx+j < cards.length; j++) {
            cards[idx+j].instances++
        }
    }
})

// console.log(cards)
console.log(cards.reduce((acc, val) => acc + val.instances, 0))




function getCards(data_list: string[]): Card[] {
    return data_list.map(row => {
        const data= row.split(':')[1]
        const card = {
            played: data.split('|')[0].split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el),
            winnable: data.split('|')[1].split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el),
            winning: [] as number[],
            instances: 1
        }
        card.winning = card.played.filter(pld => card.winnable.includes(pld))
        return card;
    })
}