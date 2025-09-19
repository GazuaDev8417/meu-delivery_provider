import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { MdFeed } from "react-icons/md"
import { MdDelete } from "react-icons/md";
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
    const [hoveredItemId, setHoveredItemId] = useState<string>('')



    useEffect(()=>{
        getProfileByUser()
        orderHistory()
    }, [])

    useEffect(()=>{
        if(!token){
            navigate('/meu-delivery-provider')
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
        
        /* axios.get(`${BASE_URL}/users_orders/${user.id}`, headers).then(res=>{
            setOrders(res.data)
        }).catch(e => alert(e.response.data)) */
    }


    const logout = ()=>{
        const decide = window.confirm('Tem certeza que deseja deslogar?')

        if(decide){
            localStorage.clear()
            navigate('/meu-delivery-provider')
        }
    }


    const deleteOrder = (id:string)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.delete(`${BASE_URL}/order/${id}`, headers).then(()=>{
            orderHistory()
        }).catch(e => alert(e.response.data))
    }


    const cleanHistory = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        if(orders.length === 0){
            alert('Seu histórico está vázio!')

            return
        }

        const decide = window.confirm('Tem certeza que deseja apagar todo seu histórico?')
        if(decide){
            axios.delete(`${BASE_URL}/orders`, headers).then(()=>{
                orderHistory()
            }).catch(e => alert(e.response.data))
        }
    }
    


    
    return(
        <>
        <Header
            rightIcon={
                <AiOutlineLogout className="header-icon" onClick={logout} />
            }
            leftIcon={
                <MdFeed className="header-icon" onClick={()=> navigate('/meu-delivery-provider/orders')}/>
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
            {orders.length > 0 && <button type="button" style={{padding:10, color:'white'}} onClick={cleanHistory}>
                Limpar Histórico
            </button>}
            <div id='history' className="order-history">Histórico de pedidos</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="card-container">
                {orders && orders.map(order=>(
                    <div className="card" key={order.id}>
                        <div className="card-content">
                            <div className="rest-name">{order.product} R$ {order.price.toFixed(2)}</div>
                            <b>Pedido feito em:</b> {order.moment} <br/>
                            <b>Quantidade:</b> {order.quantity}<br/>
                            <b>Total:</b> R$ {order.total.toFixed(2)}<br/>
                            <b>Status:</b> {order.state === 'FINISHED' ? 'Finalizado' : null} 
                        </div>
                        <MdDelete className='icon' style={{
                                color: hoveredItemId === order.id ? 'red' : 'black'
                            }}
                            onMouseOver={() => setHoveredItemId(order.id)}
                            onMouseOut={() => setHoveredItemId('')}
                            onClick={() => deleteOrder(order.id)}/>
                    </div>
                ))}
            </div>
        </Container>
        </>
    )
}

export default ClientData