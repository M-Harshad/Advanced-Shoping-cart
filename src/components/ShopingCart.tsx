import { FaRegWindowClose } from "react-icons/fa";
import { useshopingCart } from "../contexts/ShopingcartContext";
import SideItems from "./SideItems";

type ShoppingCartProps = {
  isOpen?: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const {closeCart, cartItems} = useshopingCart()

  return isOpen ? (
    <div className="grid grid-cols-[1fr_auto]">
      
      <div className="bg-white w-[500px] h-full fixed top-0 right-0 z-10 transition-transform duration-300 ease-linear">
        <p className="m-5 text-xl font-bold">cart</p>
        <button className="absolute top-4 right-5" onClick={() => closeCart()}>
          <FaRegWindowClose className="w-7 h-7"/>
        </button>
        {cartItems.map(item => (
          <SideItems id={item.id} Quantity={item.Quantity}/>
        ))}

      </div>
      <div className="bg-black opacity-80 h-full w-full fixed top-0 left-0"></div> {/* Background dim */}
    </div>
  ) : null;
}

export default ShoppingCart;

