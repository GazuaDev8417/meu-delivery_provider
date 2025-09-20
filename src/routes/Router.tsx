import { Routes, Route } from 'react-router-dom'
import Login from "../pages/login/Login"
import Signup from "../pages/singup/Singup"
import Orders from "../pages/orders/Orders"
import ClientData from "../pages/clientData/ClientData"
import Profile from "../pages/profile/Profile"


const NotFound = () =>(
    <h1 style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'20vh'}}>
        404 - Página não encontrada
    </h1>
)



const Router = ()=>{
    return(
        <Routes>
            <Route path="/meu-delivery-provider" element={<Login/>} />
            <Route path="/meu-delivery-provider/signup" element={<Signup/>} />
            <Route path="/meu-delivery-provider/orders" element={<Orders/>} />
            <Route path="/meu-delivery-provider/client_data" element={<ClientData/>} />
            <Route path="/meu-delivery-provider/profile" element={<Profile/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}

export default Router