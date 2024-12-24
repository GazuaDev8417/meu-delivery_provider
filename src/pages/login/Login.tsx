import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import ifutureLogo from '../../imgs/logo-future-eats-invert.png'
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { IoIosArrowBack } from "react-icons/io"
import { Link, useNavigate, useLocation, useRevalidator } from "react-router-dom"
import { Container } from "./styled"
import { Restaurant } from "../../types/types"



interface FormData{
    cnpj:string
    password:string
}


const Login:FC = ()=>{
    const navigate = useNavigate()
    const location = useLocation()
    const checkLocation = location.state ? location.state as { isUserValidation?:boolean } : null
    const [showPass, setShowPass] = useState<boolean>(false)
    const [isUserValidation, setIsUserValidation] = useState<boolean>(checkLocation !== null ? true : false)
    const token = localStorage.getItem('token')
    const clientData = localStorage.getItem('clientData')
    const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant>({
        address:'',
        category:'',
        deliveryTime:0,
        description:'',
        id:'',
        logourl:'',
        name:'',
        shipping:0,
    })
    const [form, setForm] = useState<FormData>({
        cnpj:'',
        password:'Alfaromeo*021'
    })
console.log(isUserValidation)

    const getRestaurant = ()=>{
        axios.get(`${BASE_URL}/restaurant`, {
            headers: { Authorization: token }
        }).then(res => {
            setCurrentRestaurant(res.data)
        }).catch(e => alert(e.response.data))
    }
    

    useEffect(()=>{        
        if(token && !isUserValidation){
            navigate('/ifuture_provider/orders')
        }else if(token && clientData){
            getRestaurant()
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

    
    const login = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()

        if(!isUserValidation){
            const body = {
                cnpj: form.cnpj.replace(/\D/g, ""),
                password: form.password,
                isUserValidation
            }

            axios.post(`${BASE_URL}/login_restaurant`, body).then(res=>{
                localStorage.setItem('token', res.data)
                navigate('/ifuture_provider/orders')
            }).catch(e=>{
                alert(e.response.data)
            })
        }else{
            const body = {
                cnpj: form.cnpj.replace(/\D/g, ""),
                password: form.password,
                isUserValidation
            }

            axios.post(`${BASE_URL}/login_restaurant`, body).then(res=>{
                if(currentRestaurant.id !== res.data){
                    return alert('Credenciais inválidas!')
                }else{
                    setIsUserValidation(false)
                    navigate('/ifuture_provider/client_data')
                }
            }).catch(e=>{
                alert(e.response.data)
            })
        }
    }
    
    return(
        <Container>
            {isUserValidation && (
                <div className="header">
                    <IoIosArrowBack className="header-icon" onClick={()=> navigate(-1)}/>
                </div>
            )}
            <img src={ifutureLogo} alt="imagem"/>
            <div className="title">{ isUserValidation ? 'Insira suas  credências para validação' : 'Login para provedores' }</div>
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
            {!useRevalidator && (
                <p>
                    Não possui cadastro? clique <Link to='/ifuture_react/signup'> aqui</Link>
                </p>
            )}
        </Container>
    )
}

export default Login