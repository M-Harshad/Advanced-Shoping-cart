import { Outlet, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useShoppingCart } from "../contexts/ShopingcartContext";

function NavBar() {
    const { cartQuantity, openCart } = useShoppingCart(); // Corrected function name

    return (
        <>
            <nav className="flex items-center w-full h-16 shadow-md bg-white justify-between fixed top-0 left-0 z-10">
                <div className="flex gap-8 ml-10 font-bold">
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/store">
                        Store
                    </NavLink>
                    <NavLink to="/about">
                        About
                    </NavLink>
                </div>

                <div className="mr-10 relative">
                    <button onClick={cartQuantity > 0 ? openCart : undefined}>
                        <FaShoppingCart className="h-10 w-10" />
                        {cartQuantity > 0 && (
                            <p className="absolute flex z-10 w-5 h-5 text-red-700 font-bold top-1 left-4">
                                {cartQuantity}
                            </p>
                        )}
                    </button>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default NavBar;
