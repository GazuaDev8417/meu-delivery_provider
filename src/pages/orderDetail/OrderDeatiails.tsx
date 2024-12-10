import { FC, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { IoIosArrowBack } from "react-icons/io"
import { AiOutlineLogout } from 'react-icons/ai'
import { Order, User } from "../../types/types"
import { Container } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"





const OrderDeatails:FC = ()=>{
    const navigate = useNavigate()
    const [order, setOrder] = useState<Order>({
        id:'',
        product:'', 
        price:0,
        photoUrl:'',
        quantity:0,
        total:0,
        moment:'',
        restaurant:'', 
        client:'',
        address:'',
    })
    const [client, setClient] = useState<User>({
        id:'',
        username:'',
        cpf:'',
        email:'',
        street:'',
        number:'',
        neighbourhood:'',
        city:'',
        state:'',
        complement:''
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')
        const order = localStorage.getItem('order')
        
        if(!token){
            navigate('/ifuture_provider')
        }

        if(order !== null){
            setOrder(JSON.parse(order))
        }
    }, [])


    const userById = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/user/${id}`, headers).then(res=>{
            setClient(res.data)
            navigate('/ifuture_provider/client_data', { state: res.data } )
        }).catch(e => alert(e.response.data))
    }

    
    const logout = ()=>{
        const decide = window.confirm('Tem certeza que deseja deslogar?')

        if(decide){
            localStorage.clear()
            navigate('/ifuture_provider')
        }
    }
    

    
    return(
        <>
        <Header
            leftIcon={
                <IoIosArrowBack className="header-icon" onClick={()=> navigate(-1)}/>
            }
            rightIcon={
                <AiOutlineLogout className="header-icon" onClick={logout} />
            }/>
        <Container>
            <div className="card">
                <div className="rest-name">{order.product}</div>
                <img 
                    src={order.photoUrl}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">
                    <p>
                        <b>Pedido feito em:</b> {order.moment}<br />
                        <b>Endereço para entrega:</b> {order.address} <br /><br />
                        <div className="client" onClick={() => userById(order.client)} >Cliente</div>
                    </p>
                </div>
            </div>
        </Container>
        </>
    )
}

export default OrderDeatails