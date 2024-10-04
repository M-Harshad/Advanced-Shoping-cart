import reactLogo from "../assets/react.svg"
import { useshopingCart } from "../contexts/ShopingcartContext";

type CartItemsProps = {
    Name: string,
    Price: number,
    id: number,
}

function CartItems({Name, Price, id}: CartItemsProps) {
    const {getItemQuantity, IncItemQuantity, decItemQuantity, RemoveItem} = useshopingCart()
    const quantity = getItemQuantity(id)
  return (
    <>
    <section className="w-[800px] h-[250px] rounded-lg flex p-5 justify-evenly bg-slate-400" key={id}>
       <div className="w-[400px] h-full bg-orange-500"></div>
       <div className="flex flex-col ml-10 justify-evenly">
        <div>
          <p className="text-3xl mb-1">{Name}</p>
          <p className="mb-3">{Price}</p>
          <img src={reactLogo} />
        </div>
          {quantity === 0 ? (
            <button  onClick={() => IncItemQuantity(id)} className="w-[100px] h-8 rounded-2xl bg-lime-500 hover:bg-green-700 cursor-pointer">Add to cart</button>
          ) : (
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                    <button onClick={() => decItemQuantity(id)} className="p-3 bg-sky-500 w-8 h-8 rounded-md flex items-center justify-center font-bold text-3xl mr-2 hover:bg-sky-800">-</button>
                      <p> <span className="font-bold">{quantity}</span> Item in cart</p>
                    <button onClick={() => IncItemQuantity(id)} className="p-2 bg-sky-500 w-8 h-8 rounded-md flex items-center justify-center font-bold text-3xl ml-2 hover:bg-sky-800">+</button>
                </div>
                    <button onClick={() => RemoveItem(id)} className="p-2  bg-red-600 w-20 h-8 rounded-xl hover:bg-red-800 mt-3">remove</button>
            </div>
          )}
       </div>
    </section>
    </>
  )
}

export default CartItems