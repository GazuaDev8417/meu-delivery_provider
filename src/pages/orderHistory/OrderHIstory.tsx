import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { IoIosArrowBack } from "react-icons/io"
import { Container } from './styled'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import Header from '../../components/Header';
import { Order, Restaurant } from '../../types/types'



const OrderHistory = ()=>{
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState<Restaurant>({
        address:'',
        category:'',
        deliveryTime:0,
        description:'',
        id:'',
        logourl:'',
        cnpj:'',
        name:'',
        shipping:0
    })
    const [orders, setOrders] = useState<Order[]>([])

    

    useEffect(()=>{
        getRestaurant()
        finishedOrders()
    }, [])

    useEffect(()=>{

        const token = localStorage.getItem('token')

        if(!token){
            navigate('/ifuture_provider')
        }
    }, [])


    const getRestaurant = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        axios.get(`${BASE_URL}/restaurant`, headers).then(res=>{
            setRestaurant(res.data)
        }).catch(e => alert(e.response.data))
    }


    const finishedOrders = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/active_restaurant_orders`, headers).then(res=>{
            setOrders(res.data)
        }).catch(e => alert(e.response.data))
    }


    const orderById = (id:string)=>{
        const headers = {
            headers : { Authorization: localStorage.getItem('token') }
        }
        
        axios.get(`${BASE_URL}/order/${id}`, headers).then(res=>{
            localStorage.setItem('order', JSON.stringify(res.data))
            navigate('/ifuture_provider/order_details')
        }).catch(e => alert(e.response.data))
    }
    


    
    return(
        <>
        <Header
            rightIcon={
                <BsFillPersonFill className="header-icon" onClick={() => navigate('/ifuture_provider/profile')} />
            }
            leftIcon={
                <IoIosArrowBack className="header-icon" onClick={()=> navigate(-1)}/>
            }/>        
        <Container>    
            <h1>{restaurant.name}</h1>            
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div id='history' className="order-history">Histórico de pedidos</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="card-container">
                {orders.length > 0 ? orders.map(order=>(
                    <div className="card" key={order.id} onClick={() => orderById(order.id )} >
                        <div className="card-content">
                            <div className="rest-name">{order.product} R$ {order.price.toFixed(2)}</div>
                            <b>Pedido feito em:</b> {order.moment} <br/>
                            <b>Quantidade:</b> {order.quantity}<br/>
                            <b>Total:</b> R$ {order.total.toFixed(2)}<br/>
                            <b>Endereço:</b> {order.address} <br />
                            <b>Status:</b> {order.state === 'REQUESTED' ? 'Para entrega' : 'Finalizado'}
                        </div>
                        {/* <MdDelete className='icon' style={{
                                color: hoveredItemId === order.id ? 'red' : 'black'
                            }}
                            onMouseOver={() => setHoveredItemId(order.id)}
                            onMouseOut={() => setHoveredItemId('')}
                            onClick={() => deleteOrder(order.id)}/> */}
                    </div>
                )) : <div>Ainda não há registro de pedidos</div> }
            </div>
        </Container>
        </>
    )
}

export default OrderHistory