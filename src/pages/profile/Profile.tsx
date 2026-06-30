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
import UpdateProduct from "../../components/UpdateProduct"
import { productsImages } from "../../constants"




type GroupedProducts = {
  category: string
  items: Products[]
}

type Screen = 'list' | 'insert' | 'update'


const Profile:FC = ()=>{
    const navigate = useNavigate()
    const productsRef = useRef<HTMLDivElement | null>(null)
    const [searchWord, setSearchWord] = useState<string>('')
    const [products, setProducts] = useState<Products[]>([])
    const [screen, setScreen] = useState<Screen>('list')
    const [selectedProduct, setSelectedProduct] = useState<string>('')
    const [openCategory, setOpenCategory] = useState<string | null>(null)
    const [menu, setMenu] = useState<Restaurant>({
        address:'',
        category:'',
        email:'',
        id:'',
        logourl:'',
        name:'',
        phone:'',
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
                console.error(e.response.data)
            })
        }).catch(e => console.error(e.response.data))
    }
     

    useEffect(()=>{
        restaurantByToken()
    }, [screen === 'list'])


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
            }).catch(e => console.error(e.response.data))
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
                <div className="menuTitle-container">
                    <div></div>
                    <div className="products">
                        {screen === 'list' && 'Cardápio Principal'}
                        {screen === 'insert' && 'Adicionar produtos'}
                        {screen === 'update' && 'Produto a ser editado:'}
                    </div>
                    {screen === 'list' && (
                        <IoMdAddCircle title="Adicionar produto" className="icon" onClick={() => setScreen('insert')} />
                    )} 
                    
                    {screen === 'insert' && (
                        <IoMdCloseCircle title="Voltar" className="icon" onClick={() => setScreen('list')} />
                    )}

                    {screen === 'update' && (
                        <IoMdCloseCircle title="Voltar" className="icon" onClick={() => setScreen('list')} />
                    )}
                </div>
                {screen === 'list' && (
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
                    {screen === 'list' && groupedProducts.map(group => (
                        openCategory === group.category && (
                            <div key={group.category}>
                            {group.items.filter(product => (
                               product.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()) 
                            )).map(product => (
                                <div 
                                    className="products-card"
                                    key={product.id}>
                                    <>
                                        <img
                                        className="product-image" 
                                        src={productsImages[product.photoUrl]}
                                        /* alt="Foto do produto" *//>
                                        <div className="product-desc">
                                            <h4>{product.name}</h4><br/>
                                            {product.description}<br/><br/>
                                            <div>R$ {Number(product.price).toFixed(2)}</div>
                                        </div>
                                    </>
                                    <div className="btn-button">
                                        <button onClick={()=>{
                                            setSelectedProduct(product.id)
                                            setScreen('update')
                                        }} >
                                            Editar
                                        </button>
                                        <button onClick={() => deleteProduct(product)}>
                                            Remover
                                        </button>
                                    </div>                                 
                                </div>
                            ))}
                            {group.items.filter(product =>(
                                product.name.toLocaleLowerCase().includes(searchWord.toLowerCase())
                            )).length === 0 && (
                                <p>Nenhum produto encontrado nessa categoria</p>
                            )}
                            </div>
                        )
                    ))}

                    {screen === 'insert' && (
                        <InsertProduct setScreen={setScreen} />
                    )}

                    {screen === 'update' && selectedProduct && (
                        <UpdateProduct product={selectedProduct} setScreen={setScreen} />
                    )}
                </div>
            </div>
        </Container>
        </>
    )
}

export default Profile