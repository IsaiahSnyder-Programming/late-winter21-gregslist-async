import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js";
import { Pop } from "../Utils/Pop.js";


function _draw() {
    let template = ''
    ProxyState.houses.forEach(h => template += h.Template)
    document.getElementById('listings').innerHTML = template
}

export class HousesController {
    constructor() {
        ProxyState.on('houses', _draw)
        console.log('[HousesController] loaded');
    }

    async viewHouses() {
        try {
            await housesService.getAllHouses()
        } catch (error) {
            Pop.toast(error.message, 'error')
        }
    }
}