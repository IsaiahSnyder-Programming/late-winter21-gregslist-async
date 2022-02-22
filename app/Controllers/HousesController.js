import { ProxyState } from "../AppState.js";
import { getHouseForm } from "../Components/HouseForm.js";
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
            document.getElementById('modal-body-slot').innerHTML = getHouseForm()
            document.getElementById('create-button').classList.remove('visually-hidden')
        } catch (error) {
            Pop.toast(error.message, 'error')
            console.log(error);
        }
    }

    async handleSubmit(id) {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let rawData = {
                bedrooms: form.bedrooms.value,
                bathrooms: form.bathrooms.value,
                levels: form.levels.value,
                year: form.year.value,
                price: form.price.value,
                imgUrl: form.imgUrl.value,
                description: form.description.value,
            }
            if(!id) {
                housesService.createHouse(rawData)
            } else {
                housesService.editHouse(rawData, id)
            }
            let modal = document.getElementById('new-listing')
            form.reset()
            bootstrap.Modal.getOrCreateInstance(modal).hide()
            Pop.toast('Complete')
        } catch (error) {
            Pop.toast(error.message, 'error')
            console.log(error);
        }
    }

    async deleteHouse(houseId) {
        try {
            if(await Pop.confirm()) {
                await housesService.deleteHouse(houseId)
            }
        } catch (error) {
            console.log(error)
            Pop.error(error)
        }
    }

    async editHouse(houseId) {
        const house = ProxyState.houses.find(h => h.id == houseId)
        document.getElementById('modal-body-slot').innerHTML = getHouseForm(house)
        let modal = document.getElementById('new-listing')
        bootstrap.Modal.getOrCreateInstance(modal).toggle()
    }
}