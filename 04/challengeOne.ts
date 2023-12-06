import {sample, complete} from "./data";


const DATA = complete;

const DATA_LIST = DATA.split('\n');

interface Card {
    played: number[],
    winnable: number[],
    winning: number[],
    points: number
}

const cards = getCards(DATA_LIST)

// console.log(cards)
console.log(cards.reduce((acc, val) => acc + val.points, 0))

function getCards(data_list: string[]): Card[] {
    return data_list.map(row => {
        const data= row.split(':')[1]
        const card = {
            played: data.split('|')[0].split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el),
            winnable: data.split('|')[1].split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el),
            winning: [] as number[],
            points: 0
        }
        card.winning = card.played.filter(pld => card.winnable.includes(pld))
        card.points = card.winning.length !== 0 ? Math.pow(2, card.winning.length-1) : 0
        return card;
    })
}