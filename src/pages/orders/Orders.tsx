import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdDeleteForever } from "react-icons/md";
import { Container, Modal, Overlay } from './styled'
import { BASE_URL } from '../../constants/url'
import axios from 'axios'
import Header from '../../components/Header';
import { Order, Restaurant } from '../../types/types'



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
    const [open, setOpen] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<string>('')

   

    useEffect(()=>{
        getRestaurant()
        requestedOrders()
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(!token){
            navigate('/ifuture_provider')
        }
    }, [])


    const handleChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        setPaymentMethod(e.target.value)
    }


    const getRestaurant = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        axios.get(`${BASE_URL}/restaurant`, headers).then(res=>{
            setRestaurant(res.data)
        }).catch(e => alert(e.response.data))
    }


    const requestedOrders = ()=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }

        axios.get(`${BASE_URL}/restaurant_orders`, headers).then(res=>{
            setOrders(res.data)
        }).catch(e => alert(e.response.data))
    }

    const markOrder = (id:string)=>{
        const body = {
            paymentmethod: paymentMethod
        }

        axios.patch(`${BASE_URL}/finished_order/${id}`, body)
            .then(()=>{
                requestedOrders()
                setOpen(false)
            })
            .catch(e => e.response.data)
    }

    const changeOrder = (id:string)=>{

        axios.patch(`${BASE_URL}/change_order/${id}`)
            .then(()=>{
                requestedOrders()
                setOpen(false)
            })
            .catch(e => e.response.data)
    }

    const removeOrder = (order:Order)=>{
        const headers = {
            headers: { Authorization: localStorage.getItem('token') }
        }
        const confirmDelete = confirm(`Tem certeza que deseja excluir ${order.product} da lista de pedido?`)

        if(confirmDelete){
            axios.delete(`${BASE_URL}/order/${order.id}`, headers)
                .then(() => requestedOrders())
                .catch(e => e.response.data)
        }
    }


    
    return(
        <>
        <Header
            rightIcon={
                <BsFillPersonFill className="header-icon" onClick={()=> navigate('/ifuture_provider/profile')} />
            }
            leftIcon={
                <div/>
            }/>        
        <Container>    
            <h1>{restaurant.name}</h1>            
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div id='history' className="order-history">Pedidos para entrega</div>
            <hr style={{width:'100%', marginBottom:'15px', background:'lightgray'}} />
            <div className="card-container">
                {orders.length > 0 ? orders.map(order=>(
                    <>
                        <Overlay active={open} onClick={() => setOpen(false)} />
                        <Modal active={open}>
                            <h3>Método de pagamento: {paymentMethod || 'Nenhum'}</h3>
                            <select value={paymentMethod} onChange={handleChange}>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="pix">Pix</option>
                                <option value="credito">Crédito</option>
                                <option value="debito">Débito</option>
                            </select>
                            <button 
                                className='end-payment' 
                                onClick={() => markOrder(order.id)}>
                                Enviar
                            </button>
                        </Modal>
                        <div className="card" key={order.id}>
                            <div style={{display:'flex'}}>
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
                                <MdDeleteForever className='icon' onClick={() => removeOrder(order)}/>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', gap:'5px', marginTop:'10px'}}>
                                <button className='sentMarked' onClick={()=>{
                                    if(order.state === 'REQUESTED'){
                                            setOpen(true)
                                        }else{
                                            changeOrder(order.id)
                                        }
                                    }}>
                                    {order.state === 'REQUESTED' ? 'Marcar como enviado' : 'Desmarcar'}
                                </button>
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeOrder(order)}>Remover</button>
                            </div>
                        </div>
                    </>
                )) : <div>Ainda não há registro de pedidos</div> }
            </div>
        </Container>
        </>
    )
}

export default Orders