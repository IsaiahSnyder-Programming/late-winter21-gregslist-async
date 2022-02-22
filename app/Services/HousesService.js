import { ProxyState } from "../AppState.js";
import { House } from "../Models/House.js";
import { api } from "./AxiosService.js"


class HousesService {


    async getAllHouses() {
        const res = await api.get('houses')
        console.log('[HousesService] getAllHouses', res.data);
        ProxyState.houses = res.data.map(rd => new House(rd))
    }
}

export const housesService = new HousesService()