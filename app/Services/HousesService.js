import { ProxyState } from "../AppState.js";
import { House } from "../Models/House.js";
import { api } from "./AxiosService.js"


class HousesService {


    async getAllHouses() {
        const res = await api.get('houses')
        console.log('[HousesService] getAllHouses', res.data);
        ProxyState.houses = res.data.map(rd => new House(rd))
    }

    async deleteHouse(houseId) {
        console.log('[HousesService] deleting house', houseId);

        const res = await api.delete(`houses/${houseId}`)
        console.log('[HousesService]: deleteHouse', res.data);

        ProxyState.houses = ProxyState.houses.filter(h => h.id != houseId)
    }
}

export const housesService = new HousesService()