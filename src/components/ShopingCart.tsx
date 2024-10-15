import { FaRegWindowClose } from "react-icons/fa";
import SideItems from "./SideItems";
import { useShoppingCart } from "../contexts/ShopingcartContext";
import useCart from "../CustomeHooks/UseCart";
type ShoppingCartProps = {
  isOpen?: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const {closeCart,} = useShoppingCart()
  const {totalAmount, cart} = useCart()
  const CartItems = cart.carItems

  return isOpen ? (
    <div className="grid grid-cols-[1fr_auto]">
      
      <div className="bg-white w-[500px] h-full absolute top-0 right-0 z-10">
        <p className="m-5 text-xl font-bold">cart</p>
        <button className="absolute top-4 right-5" onClick={() => closeCart()}>
          <FaRegWindowClose className="w-7 h-7"/>
        </button>
        {CartItems.map(item => (
          <SideItems id={item.id} Quantity={item.quantity}/>
          
        ))}
          <p className="font-bold text-xl absolute bottom-5 right-3">Total: ${totalAmount}</p>
      </div>
      <div className="bg-black opacity-80 h-full w-full absolute top-0 left-0"></div> {/* Background dim */}
    </div>
  ) : null;
}

export default ShoppingCart;

