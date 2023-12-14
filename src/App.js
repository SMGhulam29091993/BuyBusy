import React from 'react';
import NavBar from './Component/NavBar/NavBar';
import Home from "./Pages/Home/home";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Cart from "./Pages/Cart/cart";
import Login from "./Pages/login/login";
import SignUp from "./Pages/Sing-Up/sign-up";

import {createBrowserRouter, RouterProvider} from 'react-router-dom';



const App = ()=>{
  const router = createBrowserRouter([
    {path: '/', 
      element : <NavBar/>,
      children:[
        {index:true, element:<Home/>},
        {path:"/my-order", element: <MyOrder/>},
        {path : "/cart", element: <Cart/>},
        {path : "/login", element:<Login/>},
        {path:"/sign-up", element:<SignUp/>}
      ]  
  },
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
    
  )
}

export default App;