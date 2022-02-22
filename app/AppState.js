import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

const testCar = new Car(
  {
    make: 'GMC',
    model: 'Sierra',
    year: 2018,
    price: 5600,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum unde velit nostrum iste at. Ratione fugiat ab adipisci reiciendis ipsum temporibus reprehenderit, impedit quisquam expedita a debitis commodi, perspiciatis minus.',
    color: '#FFFFAA',
    imgUrl: 'https://thiscatdoesnotexist.com'
  })

  const testHouse = new House(
    {
      bedrooms: 1,
      bathrooms: 5,
      levels: 3,
      year: 1999,
      price: 200000,
      imgUrl: "https://markstewart.com/wp-content/uploads/2021/04/1_SB4-Front-View.jpg",
      description: "This is a house",
    }
  )

class AppState extends EventEmitter {

  // NOTE just adds intellisense to our cars array that lets our code know its an array of cars, not other things 
  /** @type {import('./Models/Car').Car[]} */
  cars = [testCar]

  /** @type {import('./Models/House').House[] */
  houses = [testHouse]
}


export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
