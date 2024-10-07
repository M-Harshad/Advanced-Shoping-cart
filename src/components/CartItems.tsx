
import { useshopingCart } from "../contexts/ShopingcartContext";




type CartItemsProps = {
    Name: string,
    Price: number,
    id: number,
    photo: string,
}


function CartItems({ Name, Price, id, photo }: CartItemsProps) {
  const { getItemQuantity, IncItemQuantity, decItemQuantity, RemoveItem } = useshopingCart();
  const quantity = getItemQuantity(id);


  return (
    <section className="w-[400px] h-[200px] rounded-lg flex p-4 shadow-lg" key={id}>
      <img className="w-[120px] h-full object-cover rounded-lg" src={photo} alt={Name} />

      <div className="flex flex-col justify-between ml-8">
        <div>
          <p className="text-xl font-semibold mb-1">{Name}</p>
          <p className="text-lg mb-3">${Price.toFixed(2)}</p>
        </div>

        {quantity === 0 ? (
          <button 
            onClick={() => IncItemQuantity(id)} 
            className="w-[90px] h-8 rounded-2xl bg-lime-500 hover:bg-green-700 transition duration-200"
          >
            Add to cart
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <button 
                onClick={() => decItemQuantity(id)} 
                className="p-2 bg-sky-500 w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg hover:bg-sky-800 transition duration-200"
              >
                -
              </button>
              <p className="font-bold mx-2">{quantity} Item{quantity > 1 ? 's' : ''} in cart</p>
              <button 
                onClick={() => IncItemQuantity(id)} 
                className="p-2 bg-sky-500 w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg hover:bg-sky-800 transition duration-200"
              >
                +
              </button>
            </div>
            <button 
              onClick={() => RemoveItem(id)} 
              className="p-2 bg-red-600 w-20 h-8 rounded-xl hover:bg-red-800 transition duration-200"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartItems;


