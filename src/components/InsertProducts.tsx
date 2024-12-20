import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/url'
import styled from 'styled-components'




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
        position: relative
    }

    .form-input{
        width: 30vw;
    }

    .eye-icon{
        position: absolute;
        right: 3%;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .btn-container{
        display: flex;
        align-items: center;
        width: 30vw;
        justify-content: space-between;
    }

    button{
        width: 10vw;
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

/* HEIGTH */
    @media(max-height: 2500px){
        .eye-icon{
            top: 30.5%;
        }
    }

    @media(max-height: 2300px){
        .eye-icon{
            top: 31%;
        }
    }

    @media(max-height: 2170px){
        .eye-icon{
            top: 31.5%;
        }
    }

    @media(max-height: 1900px){
        .eye-icon{
            top: 32.5%;
        }
    }

    @media(max-height: 1631px){
        .eye-icon{
            top: 34%;
        }
    }

    @media(max-height: 1346px){
        .eye-icon{
            top: 35.5%;
        }
    }

    @media(max-height: 1160px){
        .eye-icon{
            top: 37%;
        }
    }

    @media(max-height: 992px){
        .eye-icon{
            top: 39%;
        }
    }

    @media(max-height: 910px){
        .eye-icon{
            top: 42.5%;
        }
    }

    @media(max-height: 780px){
        .eye-icon{
            top: 42.5%;
        }
    }
/* ------------------------------ */
    @media(max-height: 700px){
        .eye-icon{
            top: 45.5%;
        }
    }

    @media(max-height: 605px){
        .eye-icon{
            top: 48%;
        }
    }

    @media(max-height: 560px){
        .eye-icon{
            top: 50%;
        }
    }

    @media(max-height: 500px){
        .eye-icon{
            top: 53%;
        }
    }

    @media(max-height: 440px){
        .eye-icon{
            top: 56.5%;
        }
    }

    @media(max-height: 409px){
        .eye-icon{
            top: 59%;
        }
    }

    @media(max-height: 376px){
        .eye-icon{
            top: 62%;
        }
    }

    @media(max-height: 348px){
        .eye-icon{
            top: 65%;
        }
    }
`



interface Form{
    category:string
    description:string
    name:string
    photoUrl:string
    price:number
}



const InsertProduct = ()=>{
    const [form, setForm] = useState<Form>({
        category:'',
        description:'',
        name:'',
        photoUrl:'',
        price:0
    })


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target

        setForm({...form, [name]: value})
    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 46) {
          e.preventDefault() 
        }
    }


    const registProduct = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        
        const body = {
            category: form.category,
            description: form.description,
            name: form.name,
            photoUrl: form.photoUrl,
            price: form.price
        }

        axios.post(`${BASE_URL}/products`, body, {
            headers: { Authorization: localStorage.getItem('token') }
        }).then(res => alert(res.data)).catch(e=>{
            alert(e.response.data)
        })

    }


    const clear = ()=>{
        setForm({
            category:'',
            description:'',
            name:'',
            photoUrl:'',
            price:0
        })
    }

    return(
        <Container>
            <form onSubmit={registProduct} >
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
                <input
                    type="text"
                    className="form-input"
                    name="photoUrl"
                    value={form.photoUrl}
                    onChange={onChange} 
                    placeholder="Url da foto"
                    required/>
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

export default InsertProduct