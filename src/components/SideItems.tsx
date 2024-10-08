import { FaRegWindowClose } from "react-icons/fa";
import Data from "../Data/Data";
import { useShoppingCart } from "../contexts/ShopingcartContext";


type SideItemProps = {
  id: number;
  Quantity: number;
};



function SideItems({ id, Quantity }: SideItemProps) {
  const Cart = Data();
  const item = Cart.find(i => i.id === id);
  const { removeItem, } = useShoppingCart();



  if (!item) return null;

  // Ensure that both item.price and Quantity are numbers
  const price = parseFloat(item.price.toString());
  const quantity = parseInt(Quantity.toString(), 10);
  const totalPrice = price * quantity;

  return (

    <div key={item.id} className="side-item border p-4 rounded-lg bg-gray-100 flex flex-row justify-between m-5">
      <div className="flex flex-row gap-5">
        <img src={item.photo} alt={item.name} className="w-[70px] h-auto rounded-md" />
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
        <p>${totalPrice.toFixed(2)}</p> 
      <div className="relative">
        <button onClick={() => removeItem(item.id)} className="absolute top-5 right-5">
          <FaRegWindowClose className="w-5 h-5 "/>
          </button>
      </div>
    </div>
  );
}

export default SideItems


