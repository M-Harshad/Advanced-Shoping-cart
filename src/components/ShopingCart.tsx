import { FaRegWindowClose } from "react-icons/fa";
import { useshopingCart } from "../contexts/ShopingcartContext";

type ShoppingCartProps = {
  isOpen?: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const {closeCart} = useshopingCart()

  return isOpen ? (
    <div className="grid grid-cols-[1fr_auto]">
      
      <section className="bg-white w-[500px] h-full fixed top-0 right-0 z-10">
        <button className="absolute top-4 right-5" onClick={() => closeCart()}>
          <FaRegWindowClose className="w-7 h-7"/>
        </button>
      </section>
      <div className="bg-black opacity-80 h-full w-full fixed top-0 left-0"></div> {/* Background dim */}
    </div>
  ) : null;
}

export default ShoppingCart;

