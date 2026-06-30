import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Container } from "./styled"



interface FormData{
    address:string
    phone:string
    category:string
    logourl:string
    name:string
    password:string
    email:string
}


const Signup:FC = ()=>{
    const navigate = useNavigate()
    const [showPass2, setShowPass2] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [form, setForm] = useState<FormData>({
        address:'',
        phone:'',
        category:'',
        logourl:'',
        name:'',
        password:'',
        email:''
    })


    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/orders')
        }
    }, [])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        let newValue = value

        if(name === 'phone'){
            newValue = value.replace(/\D/g, "")
        }

        /* if(name === 'cnpj'){
            newValue = value.replace(/\D/g, ""); // Remove non-numeric characters
            newValue = newValue.replace(/^(\d{2})(\d)/, "$1.$2"); // Add the first dot
            newValue = newValue.replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2"); // Add the second dot
            newValue = newValue.replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, "$1/$2"); // Add the slash
            newValue = newValue.replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{3})(\d)/, "$1.$2")
        } */

        setForm({ ...form, [name]: newValue })
    }


    /* const launchAlert = ()=>{
        if(!showAlert){
            alert('Se o resultado da busca pelo seu CNPJ não retornar um nome fantasia este será posto no lugar.')
            setShowAlert(true)
        }
    } */

    const signup = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            address: form.address,
            phone: form.phone,
            category: form.category,
            logourl: form.logourl,
            name: form.name,
            password: form.password,
            email: form.email
        }
        axios.post(`${BASE_URL}/signup_restaurant`, body).then(res=>{
            localStorage.setItem('token',res.data)
            navigate('/orders')
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    


    const clearForm = ()=>{
        setForm({
            address:'',
            phone:'',
            category:'',
            logourl:'',
            name:'',
            password:'',
            email:''
        })
    }


    
    return(
        <Container>
            <div className="title">Registro</div>
            <form onSubmit={signup}>
                <input
                    type="text"
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Nome do estabelecimento" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="Endereço" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="phone"
                    value={form.phone}
                    inputMode="numeric"
                    maxLength={11}
                    onChange={onChange}
                    placeholder="Telefone"
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="E-mail"
                    required/>
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
                    name="logourl"
                    value={form.logourl}
                    onChange={onChange}
                    placeholder="URL da foto"/>
                <input
                    type={showPass2 ? 'text' : 'password'}
                    className="form-input"
                    name="password"
                    value={form.password}
                    onChange={onChange} 
                    placeholder="Sua senha(mínimo de 6 caractéres)"
                    required/>
                {
                    !showPass2 ? (
                        <FaEyeSlash onClick={()=> setShowPass2(true)} className='eye-icon2' />
                    ) : <FaEye onClick={()=> setShowPass2(false)} className='eye-icon2' />
                }
                <div className="btn-container">
                    <div className="submit-btn">
                        <button type="button" onClick={clearForm}>Limpar</button>
                        <button type="submit">Registrar</button>
                    </div>
                    <button type="button"
                        onClick={()=> navigate('/')}>Voltar para login</button>
                </div>
            </form>
        </Container>
    )
}

export default Signup