import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";



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

]);

function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App