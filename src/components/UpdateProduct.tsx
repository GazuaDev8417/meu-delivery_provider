import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/url'
import styled from 'styled-components'
import { Products } from '../types/types'




const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 2vh 0;
    
    .title{
        font-size: 1.5rem;
        margin: 10vh 0 5vh;
    }

    .header{
        margin-top: -8vh;
        width: 100%;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        position: relative;
    }

    .form-input{
        width: 30vw;
    }

    .photo-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border: 1px solid gray;
        border-radius: 5px;
    }

    .product-content{
        border: 1px solid;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .btn-container{
        display: flex;
        align-items: center;
        width: 30vw;
        justify-content: space-between;
        gap: 10px;
    }

    button{
        height: 40px;   
        font-size: 1rem;
        color: #fff;
    }

    p{
        margin-top: 5vh;
    }

/* MEDIA QUERY */
    @media(max-width: 930px){
        .form-input{
            width: 40vw;
        }

        button{
            width: 40vw;
        }

        .btn-container{
            width: 65vw;
        }

        .product-content{
            margin-top: -15px;
        }
    }

    @media(max-width: 690px){
        .form-input{
            width: 50vw;
        }

        button{
            width: 50vw;
        }
    }

    @media(max-width: 510px){
        .form-input{
            width: 65vw;
        }

        button{
            width: 65vw;
        }
    }
`



interface Form{
    category:string
    description:string
    name:string
    /* photoUrl:File | string, */
    price:number
}

interface ProductId{
    product:string
}



const UpdateProduct = ({ product }:ProductId)=>{
    const [item, setItem] = useState<Products>({
        category:'',
        description:'',
        id:'',
        name:'',
        photoUrl:'',
        price:0,
        provider:'',
    })
    const [form, setForm] = useState<Form>({
        category:'',
        description:'',
        name:'',
        /* photoUrl:'', */
        price:0
    })




    useEffect(()=>{
        productById()
    },[])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        
        setForm(prev => ({ ...prev, [name]: value }))
    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 46) {
          e.preventDefault() 
        }
    }


    const productById = ():void=>{
        axios.get(`${BASE_URL}/product/${product}`, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => setItem(res.data)).catch(e=>{
            console.error(e.response.data)
        })

    }


    const updateProduct = (e:FormEvent<HTMLFormElement>, id:string):void=>{
        e.preventDefault()
        
        
        const body = {
            category: form.category,
            description: form.description,
            name: form.name,
            price: form.price
        }

        axios.patch(`${BASE_URL}/product/${id}`, body, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => alert(res.data)).catch(e=>{
            console.error(e.response.data)
        })

    }


    const clear = ()=>{
        setForm({
            category:'',
            description:'',
            name:'',
            /* photoUrl:'', */
            price:0
        })
    }

    return(
        <Container>
            <form onSubmit={(e)=> updateProduct(e, product)} >
                <div className="product-content">
                    <b>Categoria:</b> {item.category} <br />
                    <b>Descrição:</b> {item.description} <br />
                    <b>Nome:</b> {item.name} <br />
                    <b>Prço:</b> R$ {item.price} <br />
                </div>
                <input
                    type="text"
                    className="form-input"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    placeholder="Categoria"
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="description"
                    value={form.description}
                    onChange={onChange} 
                    placeholder="Descrição"
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={onChange} 
                    placeholder="Nome do produto"
                    required/>
                {/* <div className="photo-container">
                    <label htmlFor="photo">Imagem do produto</label>
                    <input
                        id='photo'
                        type="file"
                        className="form-input"
                        name="photoUrl"
                        onChange={onChange} 
                        placeholder="Url da foto"
                        required/>
                </div> */}
                <input
                    type="text"
                    className="form-input"
                    onKeyPress={handleKeyPress}
                    name="price"
                    value={form.price || ''}
                    onChange={onChange} 
                    placeholder="R$ 0.00"
                    required/>
                <div className="btn-container">
                    <button type='reset' onClick={clear} >Limpar</button>
                    <button>Registrar</button>
                </div>
            </form>
        </Container>
    )
}

export default UpdateProduct