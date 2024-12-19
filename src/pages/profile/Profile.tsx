import { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { MdFeed } from "react-icons/md"
import { AiOutlineLogout } from 'react-icons/ai'
import { Products, Restaurant } from "../../types/types"
import { Container } from './styled'
import axios from "axios"
import { BASE_URL } from "../../constants/url"




const Profile:FC = ()=>{
    const navigate = useNavigate()
    const ordersRef = useRef<{ [key:string]: HTMLElement | null }>({})
    const [products, setProducts] = useState<Products[]>([])
    const [menu, setMenu] = useState<Restaurant>({
        address:'',
        category:'',
        deliveryTime:0,
        description:'',
        id:'',
        logourl:'',
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
                    <h3 style={{textAlign:'center', marginTop:'20px', marginBottom:'10px'}}>
                        {menu.name} perto de você
                    </h3>
                    <p>{menu.address}</p>
                </div>
                <div className="products">Cardápio Principal</div>
                <div className="products-container">
                    {products && products.map(product=>(
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
                            <div></div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
        </>
    )
}

export default Profile