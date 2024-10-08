
import Computer from "../assets/Computer.jpg"
import Banana from "../assets/Banana.jpg"
import shoes from '../assets/shoes.webp'
import shirt from '../assets/shirt.jpg'

function Data() {
    const cart = [
        {
        name: "computer",
        price: 350,
        id: 0,
        photo: Computer
      },
        {
        name: "Banana",
        price: 100,
        id: 1,
        photo: Banana,
      },
        {
        name: "shoes",
        price: 3050,
        id: 2,
        photo: shoes,
      },
        {
        name: "shirt",
        price: 500,
        id: 3,
        photo: shirt,
      },
      ]
   return(
    cart
   )
}

export default Data