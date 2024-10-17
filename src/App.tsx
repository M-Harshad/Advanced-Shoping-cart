import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import DashBord from "./pages/dashboard/DashBord";
import AddProduct from "./components/dashboard/AddProdects";
import ProductManagement from "./components/dashboard/ProductManagement";
import Products from "./pages/dashboard/Products";


const router = createBrowserRouter([

  {
    path: "/",
    element: <NavBar />,
    children: [{
      path: "/",
      element: <Home />,
    },

    {
      path: "/store",
      element: <Store />,
    },

    {
      path: "/about",
      element: <About />,
    },
   
  ]
  },
  {
    path: "dashbord",
    element: <DashBord />,
    children: [
      {
      path: "products",
      element: <Products/>
    },
    {
    path: "editproduct",
    element: <ProductManagement />
  },
    {
    path: "addproducts",
    element: <AddProduct />
  },
    
      
  ]
  }

]);

function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App