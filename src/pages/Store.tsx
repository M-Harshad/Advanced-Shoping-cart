import CartItems from "../components/CartItems"
import { useShoppingCart } from "../contexts/ShopingcartContext"


function Store() {
   const {jsonData} = useShoppingCart()

  return (
    <>
    <section className='grid lg:grid-cols-2 lg:grid-rows-1 m-16 gap-10 justify-center mt-24'>
        {jsonData.map(item => (
          <CartItems name={item.name} price={item.price} id={item.id} photo={item.photo} />
        ))}
    </section>

    </>
  )
}

export default Store