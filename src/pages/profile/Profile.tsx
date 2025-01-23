import { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { MdFeed } from "react-icons/md"
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
import { Products, Restaurant } from "../../types/types"
import { Container } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import InsertProduct from "../../components/InsertProducts"




const Profile:FC = ()=>{
    const navigate = useNavigate()
    const ordersRef = useRef<{ [key:string]: HTMLElement | null }>({})
    const [products, setProducts] = useState<Products[]>([])
    const [showForm, setShowForm] = useState<boolean>(false)
    const [menu, setMenu] = useState<Restaurant>({
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



    const restaurantByToken = ()=>{
        const token = localStorage.getItem('token')

        axios.get(`${BASE_URL}/restaurant`, {
            headers: { Authorization: token }
        }).then(res =>{
            setMenu(res.data)
            axios.get(`${BASE_URL}/restaurant_menu`, {
                headers: { Authorization: token }
            }).then(res=>{
                setProducts(res.data)
            }).catch(e=>{
                alert(e.response.data)
            })
        }).catch(e => alert(e.response.data))
    }
     

    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/ifuture_provider')
        }

        restaurantByToken()
    }, [])
    

    useEffect(()=>{
        restaurantByToken()
    }, [showForm])


    const deleteProduct = (product:Products)=>{
        const decide = window.confirm(`Tem certeza que deseja excluir ${product.name} do cardápio?`)

        if(decide){
            const headers = {
                headers: { Authorization: localStorage.getItem('token') }
            }
    
            axios.delete(`${BASE_URL}/product/${product.id}`, headers).then(()=>{
                restaurantByToken()
            }).catch(e => alert(e.response.data))
        }
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
                <MdFeed className="header-icon" onClick={()=>{
                    navigate('/ifuture_provider/orders')
                }} />
            }
            rightIcon={
                <AiOutlineLogout className="header-icon" onClick={logout} />
            }/>
        <Container>
            <div className="card">
                <div className="rest-name">{menu.category}</div>
                <img 
                    src={menu.logourl}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">
                    <p>{menu.description}</p>
                </div>
                <div className="menuTitle-container">
                    <div></div>
                    <div className="products">{!showForm ? 'Cardápio Principal' : 'Adicionar produtos'}</div>
                    <div className="icon-container" onClick={() => setShowForm((prevState) => !prevState)}>
                        <span className="text">{!showForm ? 'Adicionar' : 'Voltar'}</span>
                        {!showForm ? <IoMdAddCircle className="icon" /> : <IoMdCloseCircle className="icon" /> }
                    </div>
                </div>
                <div className="products-container">
                    {!showForm ? products && products.map(product=>(
                        <div 
                            className="products-card"
                            key={product.id}
                            ref={el => ordersRef.current[product.id] = el}
                            >
                            <img
                                className="product-image" 
                                src={product.photoUrl}
                                alt="Foto do produto" />
                            <div className="product-desc">
                                <h4>{product.name}</h4><br/>
                                {product.description}<br/><br/>
                                <div>R$ {product.price.toFixed(2)}</div>
                            </div>
                            <button onClick={() => deleteProduct(product)}>Remover</button>
                        </div>
                    )) : <InsertProduct/>}
                </div>
            </div>
        </Container>
        </>
    )
}

export default Profile