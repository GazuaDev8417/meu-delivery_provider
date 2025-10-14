import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { /* Link, */ useNavigate /* useLocation */ } from "react-router-dom"
import { Container } from "./styled"
//import { Restaurant } from "../../types/types"



interface FormData{
    email:string
    password:string
}


const Login:FC = ()=>{
    const navigate = useNavigate()
    //const location = useLocation()
    //const checkLocation = location.state ? location.state as { isUserValidation?:boolean } : null
    const [showPass, setShowPass] = useState<boolean>(false)
    const token = localStorage.getItem('token')
    //const clientData = localStorage.getItem('clientData')
    const [form, setForm] = useState<FormData>({
        email:'adm@email.com',
        password:'123456'
    })
    /* const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant>({
        address:'',
        category:'',
        deliveryTime:0,
        description:'',
        id:'',
        logourl:'',
        cnpj:'',
        name:'',
        shipping:0,
    }) */
    
    
    
    /* const getRestaurant = ()=>{
        axios.get(`${BASE_URL}/restaurant`, {
            headers: { Authorization: token }
        }).then(res => {
            setCurrentRestaurant(res.data)
        }).catch(e => alert(e.response.data))
    } */
    

    useEffect(()=>{        
        if(token){
            navigate('/orders')
        }/* else if(token && clientData){
            getRestaurant()
        } */     
    }, [])
    
    
    
    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm({ ...form, [name]: value }) 
        
        /* let newValue = value
         if(name === 'cnpj'){
            newValue = value.replace(/\D/g, ""); // Remove non-numeric characters
            newValue = newValue.replace(/^(\d{2})(\d)/, "$1.$2"); // Add the first dot
            newValue = newValue.replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2"); // Add the second dot
            newValue = newValue.replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, "$1/$2"); // Add the slash
            newValue = newValue.replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{3})(\d)/, "$1.$2")
        } */

    }

    
    const login = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        
        const body = {
            email: form.email,
            password: form.password
        }

        axios.post(`${BASE_URL}/login_restaurant`, body).then(res=>{
            localStorage.setItem('token', res.data)
            navigate('/orders')
            /* if(currentRestaurant.id !== res.data){
                return alert('Credenciais inválidas!')
            }else{
                navigate('/meu-delivery-provider/client_data')
            } */
        }).catch(e=>{
            alert(e.response.data)
        })
    }
    


    
    return(
        <Container>
            <div className="title">Login</div>
            <form onSubmit={login}>               
                <div className="input-icon-container">
                    <label htmlFor="login-email" className="sr-only">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        className="form-input"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="name@email.com"
                        aria-label="Endereço de email"
                        autoFocus 
                        required/>
                    <label htmlFor="login-password" className="sr-only">Senha</label>
                    <input
                        id="login-password"
                        type={!showPass ? 'password' : 'text'}
                        name="password"
                        className="form-input"
                        value={form.password}
                        onChange={onChange} 
                        placeholder="Sua senha"
                        aria-label="Senha"
                        required/>
                    {
                        !showPass ? (
                            <FaEyeSlash onClick={()=> setShowPass(true)} className='eye-icon' />
                        ) : <FaEye onClick={()=> setShowPass(false)} className='eye-icon' />
                    }
                </div>
                <div className="btn-container">
                    <button className="login-button" onClick={() => setForm({ email:'', password:'' })}>Limpar</button>
                    <button className="login-button" type="submit">Entrar</button>
                </div>
            </form>
            {/* <p>
                Não possui cadastro? clique <Link to='/meu-delivery/signup'> aqui</Link>
            </p> */}
        </Container>
    )
}

export default Login