import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"
import { Container } from "./styled"
//import Modal from "../../components/Modal"


interface FormData{
    cnpj:string
    password:string
}


const Login:FC = ()=>{
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState<boolean>(false)
    //const [showModal, setShowModal] = useState<boolean>(false)
    const [form, setForm] = useState<FormData>({
        cnpj:' ',
        password:''
    })



    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if(token){
            navigate('/ifuture_provider/orders')
        }
    }, [])

    /* useEffect(()=>{
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if(isMobileDevice){
            setShowModal(true)
        }
    }, []) */


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
    
    const login = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        const body = {
            cnpj: form.cnpj.replace(/\D/g, ""),
            password: form.password
        }

        axios.post(`${BASE_URL}/login_restaurant`, body).then(res=>{
            localStorage.setItem('token', res.data)
            navigate('/ifuture_provider/orders')
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    
    return(
        <Container>
            <img  
                src={ifutureLogo}
                alt="imagem"/>
            <div className="title">Login para provedores</div>
            {/* { showModal && <Modal setShowModal={setShowModal}/> } */}
            <form onSubmit={login}>
                <input
                    type="text"
                    className="form-input"
                    name="cnpj"
                    maxLength={18}
                    value={form.cnpj}
                    onChange={onChange}
                    placeholder="00.000.000/0000-00" // Updated placeholder
                    required/>
                <input
                    type={!showPass ? 'password' : 'text'}
                    className="form-input"
                    name="password"
                    value={form.password}
                    onChange={onChange} 
                    placeholder="Sua senha"
                    required/>
                {
                    !showPass ? (
                        <FaEyeSlash onClick={()=> setShowPass(true)} className='eye-icon' />
                    ) : <FaEye onClick={()=> setShowPass(false)} className='eye-icon' />
                }
                <button>Entrar</button>
            </form>
            <p>
                Não possui cadastro? clique <Link to='/ifuture_react/signup'> aqui</Link>
            </p>
        </Container>
    )
}

export default Login