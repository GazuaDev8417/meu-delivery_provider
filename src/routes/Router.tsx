import { Routes, Route } from 'react-router-dom'
import Login from "../pages/login/Login"
import Signup from "../pages/singup/Singup"
import Orders from "../pages/orders/Orders"
import OrderHistory from "../pages/orderHistory/OrderHIstory"
//import OrderDeatails from "../pages/orderDetail/OrderDeatiails"
import ClientData from "../pages/clientData/ClientData"
import Profile from "../pages/profile/Profile"



const Router = ()=>{
    return(
        <Routes>
            <Route path="/meu-delivery-provider" element={<Login/>} />
            <Route path="/meu-delivery-provider/signup" element={<Signup/>} />
            <Route path="/meu-delivery-provider/orders" element={<Orders/>} />
            <Route path="/meu-delivery-provider/orders_history" element={<OrderHistory/>} />
            {/* <Route path="/meu-delivery-provider/order_details" element={<OrderDeatails/>} /> */} 
            <Route path="/meu-delivery-provider/client_data" element={<ClientData/>} />
            <Route path="/meu-delivery-provider/profile" element={<Profile/>} />
        </Routes>
    )
}

export default Router