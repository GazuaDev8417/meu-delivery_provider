import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { Container } from './styled'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import Header from '../../components/Header';
import { Order, Restaurant } from '../../types/types'




type GroupedProducts = {
  state: string
  items: Order[]
}


const Orders = ()=>{
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
    const [openState, setOpenState] = useState<string | null>(null)

   

    useEffect(()=>{
        getRestaurant()
        allOrders()
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/meu-delivery-provider')
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

    const allOrders = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/restaurant/orders`, headers).then(res=>{
            setOrders(res.data)
            console.log(res.data)
        }).catch(e => alert(e.response.data))
    }

    const removeOrder = (order:Order)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        const confirmDelete = confirm(`Tem certeza que deseja excluir ${order.product} da lista de pedido?`)

        if(confirmDelete){
            axios.delete(`${BASE_URL}/order/${order.id}`, headers)
                .then(() => allOrders())
                .catch(e => e.response.data)
        }
    }

    const groupedByState = (orders:Order[]):GroupedProducts[]=>{
        const grouped = orders.reduce((acc, order)=>{
            if(!acc[order.state]){
                acc[order.state] = { state: order.state, items: []}
            }
            acc[order.state].items.push(order)
            return acc
        }, {} as Record<string, GroupedProducts>)

        return Object.values(grouped)
    }

    const groupedOrders = groupedByState(orders)


    
    return(
        <>
        <Header
            rightIcon={
                <BsFillPersonFill className="header-icon" onClick={()=> navigate('/meu-delivery-provider/profile')} />
            }
            leftIcon={
                <div/>
            }/>        
        <Container>    
            <h1>{restaurant.name}</h1>            
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div id='history' className="order-history">Lista de Pedidos</div>
            {/* Barra fixa de categorias */}
            <div className="categories-bar" title="Clique para ver os produtos">
                {groupedOrders.map(group => (
                <h3 
                    key={group.state} 
                    onClick={() => setOpenState(group.state)}
                    style={{
                        color: openState === group.state ? "red" : "black"}}>
                    {group.state === 'REQUESTED' ? 'Pendente' : 'Concluído'}
                </h3>
                ))}
            </div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="card-container">
                {groupedOrders
                    .filter(group => group.state === openState)
                    .flatMap(group => group.items)
                    .map(order =>(
                        <div key={order.id}>
                        <div className="card" key={order.id}>
                            <div className="card-content">
                                <div className="rest-name">{order.product} R$ {order.price}</div>
                                <b>Pedido feito em:</b> {order.moment} <br/>
                                <b>Quantidade:</b> {order.quantity}<br/>
                                <b>Total:</b> R$ {order.total}<br/>
                                <b>Endereço:</b> {order.address?.substring(0, order.address.lastIndexOf(','))}<br/>
                                <b>Falar com:</b> {order.address?.substring(order.address.lastIndexOf(',') + 1, order.address.length)}<br/>
                                <b>Status:</b> {order.state === 'REQUESTED' ? 'Para entrega' : 'Finalizado'}<br />
                                {
                                    order.state === 'FINISHED' ? (
                                    <><b>Método de pagamento:</b> {order.paymentmethod}</> 
                                        
                                    ) : null
                                }
                            </div>
                            <div className='btn-container'>
                                {order.state === 'FINISHED' && (
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeOrder(order)}>Remover</button>
                                )}
                            </div>
                        </div>
                    </div>                    
                ))}
                {orders.length === 0 && <div>Ainda não há registro de pedidos</div>}
            </div>
        </Container>
        </>
    )
}

export default Orders