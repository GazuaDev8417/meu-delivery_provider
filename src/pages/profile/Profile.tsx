import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
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
import { productsImages } from "../../constants"




type GroupedProducts = {
  category: string
  items: Products[]
}


const Profile:FC = ()=>{
    const navigate = useNavigate()
    const productsRef = useRef<HTMLDivElement | null>(null)
    const [searchWord, setSearchWord] = useState<string>('')
    const [products, setProducts] = useState<Products[]>([])
    const [showForm, setShowForm] = useState<boolean>(false)
    const [openCategory, setOpenCategory] = useState<string | null>(null)
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



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(!token){
            navigate('/')
        }
    }, [])

    useEffect(()=>{
        if(openCategory && productsRef.current){
            productsRef.current.scrollIntoView({ behavior:'smooth' })
        }
    }, [openCategory])



    const restaurantByToken = ()=>{
        const token = localStorage.getItem('token')

        axios.get(`${BASE_URL}/restaurant`, {
            headers: { Authorization: token }
        }).then(res =>{
            setMenu(res.data)
            axios.get(`${BASE_URL}/restaurant_products`, {
                headers: { Authorization: token }
            }).then(res=>{
                setProducts(res.data)
            }).catch(e=>{
                alert(e.response.data)
            })
        }).catch(e => alert(e.response.data))
    }
     

    useEffect(()=>{
        restaurantByToken()
    }, [showForm])


    const groupedByCategory = (products:Products[]):GroupedProducts[]=>{
        const grouped = products.reduce((acc, product)=>{
            if(!acc[product.category]){
                acc[product.category] = { category: product.category, items: []}
            }
            acc[product.category].items.push(product)
            return acc
        }, {} as Record<string, GroupedProducts>)

        return Object.values(grouped)
    }


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
            navigate('/')
        }
    }

    const groupedProducts = groupedByCategory(products)

    const handleInputSearch = (e:ChangeEvent<HTMLInputElement>)=>{
        if(openCategory === null){
            alert('Selectione o tipo de produto que quer procurar')
        }
        setSearchWord(e.target.value)
    }
    


    
    return(
        <>
        <Header
            leftIcon={
                <MdFeed className="header-icon" onClick={()=>{
                    navigate('/orders')
                }} />
            }
            rightIcon={
                <AiOutlineLogout className="header-icon" onClick={logout} />
            }/>
        <Container>
            <div className="card">
                <div className="rest-name">{menu.category}</div>
                <img 
                    src={`/imgs/restaurants/${menu.logourl}`}
                    alt="Imagem do restaurante"
                    className="image"/>                
                <div className="desc">
                    <p>{menu.description}</p>
                </div>
                <div className="menuTitle-container">
                    <div></div>
                    <div className="products">{!showForm ? 'Cardápio Principal' : 'Adicionar produtos'}</div>
                    {!showForm
                    ? 
                    <IoMdAddCircle title="Adicionar produto" className="icon" onClick={() => setShowForm(true)} /> 
                    : 
                    <IoMdCloseCircle title="Voltar" className="icon" onClick={() => setShowForm(false)} /> }
                </div>
                {!showForm && (
                    <>
                        {/* Barra fixa de categorias */}
                        <div className="categories-bar" title="Clique para ver os produtos">
                            {groupedProducts.map(group => (
                            <h3 
                                key={group.category} 
                                onClick={() => setOpenCategory(group.category)}
                                style={{
                                    color: openCategory === group.category ? "red" : "black"}}>
                                {group.category}
                            </h3>
                            ))}
                        </div>
                        {/* BUSCA POR PRODUTO */}
                        <input 
                            style={{margin:10, width:'50%'}}
                            type="text" 
                            onChange={handleInputSearch}
                            placeholder="Buscar produto"/>
                    </>
                )}
                {/* Renderizar somente a categoria aberta */}
                <div className="products-container" ref={productsRef}>
                    {!showForm ? groupedProducts.map(group => (
                        openCategory === group.category && (
                            <div key={group.category}>
                            {group.items.filter(product => (
                               product.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()) 
                            )).map(product => (
                                <div 
                                    className="products-card"
                                    key={product.id}>
                                    <img
                                        className="product-image" 
                                        src={productsImages[product.photoUrl]}
                                        alt="Foto do produto"/>
                                    <div className="product-desc">
                                        <h4>{product.name}</h4><br/>
                                        {product.description}<br/><br/>
                                        <div>R$ {Number(product.price).toFixed(2)}</div>
                                    </div> 
                                    <button onClick={() => deleteProduct(product)}>
                                        Remover
                                    </button>                                 
                                </div>
                            ))}
                            {group.items.filter(product =>(
                                product.name.toLocaleLowerCase().includes(searchWord.toLowerCase())
                            )).length === 0 && (
                                <p>Nenhum produto encontrado nessa categoria</p>
                            )}
                            </div>
                        )
                    )) : <InsertProduct/>}
                </div>
            </div>
        </Container>
        </>
    )
}

export default Profile