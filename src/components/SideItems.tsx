import { FaRegWindowClose } from "react-icons/fa";
import Data from "../Data/Data";
import { useshopingCart } from "../contexts/ShopingcartContext";

type SideItemProps = {
  id: number;
  Quantity: number;
};

function SideItems({ id, Quantity }: SideItemProps) {
  const Cart = Data();
  const item = Cart.find(i => i.id === id);
  const { RemoveItem } = useshopingCart()

  if (!item) return null;

  // Ensure that both item.price and Quantity are numbers
  const price = parseFloat(item.price.toString());
  const quantity = parseInt(Quantity.toString(), 10);
  const totalPrice = price * quantity;

  return (
    <div className="side-item border p-4 rounded-lg bg-gray-100 flex flex-row justify-between m-5">
      <div className="flex flex-row gap-5">
        <img src={item.photo} alt={item.name} className="w-[70px] h-auto rounded-md" />
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
        <p>${totalPrice.toFixed(2)}</p> 
      <div className="relative">
        <button onClick={() => RemoveItem(item.id)} className="absolute top-5 right-5">
          <FaRegWindowClose className="w-5 h-5 "/>
          </button>
      </div>
    </div>
  );
}

function CartTotal() {
  const Cart = Data();
  
  const total = Cart.reduce((acc, item) => {
    const quantity = item.Quantity || 0;
    const price = parseFloat(item.price.toString());
    return acc + (price * quantity);
  }, 0);

  return (
    <div className="total-price">
      <h2>Total Price: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default SideItems 
