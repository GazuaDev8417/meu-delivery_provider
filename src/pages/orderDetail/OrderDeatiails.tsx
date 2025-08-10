import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { IoIosArrowBack } from "react-icons/io"
import { BsFillPersonFill } from 'react-icons/bs'
import { Order } from "../../types/types"
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
        description:'',
        state:''
    })
    /* const [client, setClient] = useState<User>({
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
    }) */



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
    const fullAddress = order?.address
    const address = fullAddress?.substring(0, fullAddress.lastIndexOf(','))
    const talkTo = fullAddress?.substring(fullAddress.lastIndexOf(',') + 1, fullAddress.length)

    const userById = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/user/${id}`, headers).then(res=>{
            localStorage.setItem('clientData', JSON.stringify(res.data))
            navigate('/ifuture_provider', { state: { isUserValidation: true } } )
        }).catch(e => alert(e.response.data))
    }
    

    
    return(
        <>
        <Header
            leftIcon={
                <IoIosArrowBack className="header-icon" onClick={()=> navigate(-1)}/>
            }
            rightIcon={
                <BsFillPersonFill className="header-icon" onClick={() => navigate('/ifuture_provider/profile')} />
            }/>
        <Container>
            <div className="card">
                <div className="rest-name">{order.product}</div>
                <img 
                    src={order.photoUrl}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">{order.description}</div>
                    <p className="orderData">
                        <b>Pedido feito em:</b> {order.moment}<br />
                        <b>Endereço para entrega:</b> {address} <br />
                        <b>Falar com:</b> {talkTo} <br /><br />
                        <div className="client" onClick={() => userById(order.client)} >Cliente</div>
                    </p>
            </div>
        </Container>
        </>
    )
}

export default OrderDeatails