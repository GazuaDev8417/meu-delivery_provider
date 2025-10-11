import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdFeed } from "react-icons/md"
import Header from "../../components/Header"
import { Container } from './styled'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import { Order, User } from '../../types/types'




const ClientData = ()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState<User>({
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
    const [orders, setOrders] = useState<Order[]>([])


    useEffect(()=>{
        getProfileByUser()
        orderHistory()
    }, [])

    useEffect(()=>{
        if(!token){
            navigate('/')
        }
    }, [])




    const getProfileByUser = ()=>{
        axios.get(`${BASE_URL}/profile/${userId}`, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => setUser(res.data))
        .catch(e => alert(e.response.data))
    }

    const orderHistory = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        
        axios.get(`${BASE_URL}/user/active_orders/${userId}`, headers).then(res=>{
            setOrders(res.data)
        }).catch(e => alert(e.response.data))
    }
    
    

    
    return(
        <>
        <Header
            rightIcon={
                <div />
            }
            leftIcon={
                <MdFeed className="header-icon" onClick={()=> navigate('/orders')}/>
            }/>        
        <Container>    
            <h1>Perfil do usuário</h1>            
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="user-section">
                <div>{user.username} <br />
                    {user.email} <br />
                    {/* {maskedCPF(user.cpf)} */}
                </div>
                {/* <MdEdit className="icon" onClick={()=> navigate('/meu-delivery-provider/edit-profile')} /> */}
            </div>
            <div className="address-section">
                <div>Endereço cadastrado: <br />
                    {user.street} Nº {user.number}, {user.neighbourhood}, {user.city} - {user.state}
                </div>
                {/* <MdEdit className="icon" onClick={()=> {
                    navigate('/meu-delivery-provider/address')
                }}/> */}
            </div>
            <div className="addressAndName">
                <div className="rest-name"></div>
                <div></div>
            </div>
            <div id='history' className="order-history">Pedidos ativos do cliente</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="card-container">
                {orders.length > 0 && orders.map(order=>(
                    <div className="card" key={order.id}>
                        <div className="card-content">
                            <div className="rest-name">{order.product} R$ {Number(order.price).toFixed(2)}</div>
                            <b>Pedido feito em:</b> {order.moment} <br/>
                            <b>Quantidade:</b> {order.quantity}<br/>
                            <b>Total:</b> R$ {Number(order.total).toFixed(2)}<br/>
                            <b>Status:</b> {order.state === 'FINISHED' ? 'Finalizado' : 'Para entrega'} 
                        </div>
                    </div>
                ))}
            </div>
        </Container>
        </>
    )
}

export default ClientData