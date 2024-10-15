import { useShoppingCart } from "../contexts/ShopingcartContext";
import useCart from "../CustomeHooks/UseCart";

type CartItemProps = {
    name: string; // Updated to lowercase for consistency
    price: number; // Updated to lowercase for consistency
    id: number;
    photo: string;
}

function CartItem({ name, price, id, photo }: CartItemProps) {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem,} = useCart();
    const quantity = getItemQuantity(id);

    return (
        <section className="w-[400px] h-[200px] rounded-lg flex p-4 shadow-lg" key={id}>
            <img className="w-[120px] h-full object-cover rounded-lg" src={photo} alt={name} />

            <div className="flex flex-col justify-between ml-8">
                <div>
                    <p className="text-xl font-semibold mb-1">{name}</p>
                    <p className="text-lg mb-3">${price.toFixed(2)}</p>
                </div>

                {quantity === 0 ? (
                    <button 
                        onClick={() => increaseItemQuantity(id, price)} // Renamed function
                        className="w-[90px] h-8 rounded-2xl bg-lime-500 hover:bg-green-700 transition duration-200"
                    >
                        Add to cart
                    </button>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-2">
                            <button 
                                onClick={() => decreaseItemQuantity(id)} // Renamed function
                                className="p-2 bg-sky-500 w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg hover:bg-sky-800 transition duration-200"
                            >
                                -
                            </button>
                            <p className="font-bold mx-2">{quantity} Item{quantity > 1 ? 's' : ''} in cart</p>
                            <button 
                                onClick={() => increaseItemQuantity(id, price)} // Renamed function
                                className="p-2 bg-sky-500 w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg hover:bg-sky-800 transition duration-200"
                            >
                                +
                            </button>
                        </div>
                        <button 
                            onClick={() => removeItem(id)} // Renamed function
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

export default CartItem; // Updated export name

