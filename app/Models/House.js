
export class House {
    constructor({id, bedrooms, bathrooms, levels, year, price, imgUrl, description}) {
        this.id = id || ''
        this.bedrooms = bedrooms || 0
        this.bathrooms = bathrooms || 0
        this.levels = levels || 0
        this.year = year || 2000
        this.price = price || 0
        this.imgUrl = imgUrl || ''
        this.description = description || ''
    }


    get Template() {
        return `
        <div class="col-md-4">
            <div class="bg-white rounded shadow">
            <img class="img-fluid rounded-top" src="${this.imgUrl}" alt="house image">
            <div class="p-3">
                <p>Bed: ${this.bedrooms} | Bath: ${this.bathrooms} | Levels: ${this.levels}</p>
                <p></p>
                <p>Year: ${this.year}</p>
                <p>${this.description}</p>
                <p>$${this.price}</p>
                <div class="text-end">
                    <button class="btn btn-outline-warning" onclick="app.housesController.editHouse('${this.id}')"> Edit </button>
                    <button class="btn btn-outline-danger" onclick="app.housesController.deleteHouse('${this.id}')"> Delete </button>
                </div>  
            </div>
            </div>
        </div>
        `
      }
}