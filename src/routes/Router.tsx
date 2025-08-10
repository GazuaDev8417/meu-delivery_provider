import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "../pages/login/Login"
import Signup from "../pages/singup/Singup"
import Orders from "../pages/orders/Orders"
import OrderHistory from "../pages/orderHistory/OrderHIstory"
//import OrderDeatails from "../pages/orderDetail/OrderDeatiails"
import ClientData from "../pages/clientData/ClientData"
import Profile from "../pages/profile/Profile"



const Router:FC = ()=>{
    return(
        <Routes>
            <Route path="/ifuture_provider" element={<Login/>} />
            <Route path="/ifuture_provider/signup" element={<Signup/>} />
            <Route path="/ifuture_provider/orders" element={<Orders/>} />
            <Route path="/ifuture_provider/orders_history" element={<OrderHistory/>} />
            {/* <Route path="/ifuture_provider/order_details" element={<OrderDeatails/>} /> */}
            <Route path="/ifuture_provider/client_data" element={<ClientData/>} />
            <Route path="/ifuture_provider/profile" element={<Profile/>} />
        </Routes>
    )
}

export default Router