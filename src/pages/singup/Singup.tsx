import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Container } from "./styled"



interface FormData{
    name:string
    address:string
    description:string
    logourl:string
    cnpj:string
    password:string
    confirmPass:string
}


const Signup:FC = ()=>{
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPass2, setShowPass2] = useState<boolean>(false)
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [form, setForm] = useState<FormData>({
        name:'',
        address:'',
        description:'',
        logourl:'',
        cnpj:'',
        password:'',
        confirmPass:''
    })


    useEffect(()=>{
        const token = localStorage.getItem('token')

        if(token){
            navigate('/ifuture_provider/orders')
        }
    }, [])


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        let newValue = value

        if(name === 'cnpj'){
            newValue = value.replace(/\D/g, ""); // Remove non-numeric characters
            newValue = newValue.replace(/^(\d{2})(\d)/, "$1.$2"); // Add the first dot
            newValue = newValue.replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2"); // Add the second dot
            newValue = newValue.replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, "$1/$2"); // Add the slash
            newValue = newValue.replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{3})(\d)/, "$1.$2")
        }

        setForm({ ...form, [name]: newValue })
    }


    const launchAlert = ()=>{
        if(!showAlert){
            alert('Se o resultado da busca pelo seu CNPJ não retornar um nome fantasia este será posto no lugar.')
            setShowAlert(true)
        }
    }

    const signup = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            name: form.name,
            address: form.address,
            description: form.description,
            logourl: form.logourl,
            cnpj: form.cnpj.replace(/\D/g, ""),
            password: form.password,
            confirmPass: form.confirmPass
        }
        axios.post(`${BASE_URL}/signup_restaurant`, body).then(res=>{
            localStorage.setItem('token',res.data)
            navigate('/ifuture_provider/orders')
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    


    const clearForm = ()=>{
        setForm({
            name:'',
            address:'',
            description:'',
            logourl:'',
            cnpj:'',
            password:'',
            confirmPass:''
        })
    }


    
    return(
        <Container>
            <img  
                src={ifutureLogo}
                alt="imagem"/>
            <div className="title">Registro</div>
            <form onSubmit={signup}>
                <input
                    type="text"
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Nome do estabelecimento" 
                    onFocus={launchAlert}
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
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    placeholder="Descrição" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="logourl"
                    value={form.logourl}
                    onChange={onChange}
                    placeholder="URL da foto" 
                    required/>
                <input
                    type="text"
                    className="form-input"
                    name="cnpj"
                    maxLength={18}
                    value={form.cnpj}
                    onChange={onChange}
                    placeholder="CNPJ" 
                    required/>
                <input
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    name="password"
                    value={form.password}
                    onChange={onChange} 
                    placeholder="Sua senha(mínimo de 6 caractéres)"
                    required/>
                {
                    !showPass ? (
                        <FaEyeSlash onClick={()=> setShowPass(true)} className='eye-icon' />
                    ) : <FaEye onClick={()=> setShowPass(false)} className='eye-icon' />
                }
                <input
                    type={showPass2 ? 'text' : 'password'}
                    className="form-input"
                    name="confirmPass"
                    value={form.confirmPass}
                    onChange={onChange} 
                    placeholder="Confirme sua senha"
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
                        onClick={()=> navigate('/ifuture_provider')}>Voltar para login</button>
                </div>
            </form>
        </Container>
    )
}

export default Signup