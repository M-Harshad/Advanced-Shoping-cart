import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import DashBord from "./pages/dashboard/DashBord";
import Products from "./pages/dashboard/Products/Products";
import CreateProduct from "./pages/dashboard/Products/CreateProduct";
import UpdateProduct from "./pages/dashboard/Products/UpdateProduct";


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
    path: "dashboard",
    element: <DashBord />,
    children: [
      {
      path: "products",
      element: <Products/>,
      },
      {
      path: "products/create",
      element: <CreateProduct />
    },
      {
      path: "products/update/:id",
      element: <UpdateProduct />
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