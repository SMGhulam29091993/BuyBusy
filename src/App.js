import React from 'react';
import NavBar from './Component/NavBar/NavBar';
import Home from "./Pages/Home/home";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Cart from "./Pages/Cart/cart";
import Login from "./Pages/login/login";
import SignUp from "./Pages/Sing-Up/sign-up";

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserProvider from './context';
import ProtectedRoute from './ProtectedRoute';



const App = ()=>{
  const router = createBrowserRouter([
    {path: '/', 
      element : <NavBar/>,
      children:[
        {index:true, element:<Home/>},
        {path:"/my-order", element: <ProtectedRoute><MyOrder/></ProtectedRoute>},
        {path : "/cart", element: <ProtectedRoute><Cart/></ProtectedRoute>},
        {path : "/login", element:<Login/>},
        {path:"/sign-up", element:<SignUp/>}
      ]  
  },
  ]);
  return (

    <>
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
      
    </>
    
  )
}

export default App;