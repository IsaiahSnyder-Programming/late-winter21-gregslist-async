import { House } from "../Models/House";


export function getHouseForm(house = {}) {
    const houseData = new House(house)
    return `
    <p>hi</p>
    `
}