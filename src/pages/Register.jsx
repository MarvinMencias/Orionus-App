import { useState } from 'react'
import { useChat } from '../Context/Context'
import { Link } from 'react-router-dom'

export default function Register() {

    const {registerChat, loading } = useChat()
    
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emptyValues, setEmptyValues] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()
        if (name.trim() !== '' && username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
            setEmptyValues(false)
            if (username.length < 8 && password.length >= 8) {
                await registerChat({name, username, email, password})
            }else{
                console.log(passwordError)
                if (username.length > 8) {
                    setUsernameError(true)
                }else{
                    setUsernameError(false)
                }

                if (password.length < 8){
                     setPasswordError(true)
                }else{
                    setPasswordError(false)
                    
                }  
            }
            
        }else{
            setEmptyValues(true)
        }  
    }

    return (
        <main className="flex w-full bg-[url('./bg.png')] bg-no-repeat bg-cover bg-center min-h-screen items-center justify-center">
                <form className="text-white bg-[#252931] px-24 py-10 [&>div>input]:bg-transparent [&>div>label]:text-[11px] flex flex-col gap-7 [&>div>input]:w-full [&>div>label]:font-black [&>div>label]:tracking-[1px] [&>div>input]:outline-none [&>div>input]:py-1 rounded-xl" onSubmit={handleLogin}>
                    <div className='text-center'>
                        <h3 className='text-3xl font-black mb-1'>¡Bienvenido a Orionus!</h3>
                        <h5 className='text-md text-slate-400'>Un lugar para charlar un rato</h5>
                    </div>

                    <div className='bg-[#15171C] rounded-xl p-3'>
                        
                        <label htmlFor='name'>NOMBRE</label>
                        <input
                            className="inputField"
                            type="text"                          
                            value={name}
                            placeholder='Nombre'
                            id='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={usernameError ? 'bg-[#15171C] rounded-xl p-3 border-2 border-red-400 text-red-400 box-border' : 'bg-[#15171C] rounded-xl p-3'}>
                        <label htmlFor='username'>
                            {usernameError ?
                                <span>MAXIMO 8 CARACTERES</span> 
                                :
                                <span>USUARIO</span> 
                            }
                            </label>
                        <input
                            className="inputField"
                            type="text"                           
                            value={username}
                            id='username'
                            placeholder='Usuario'
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>


                    <div className='bg-[#15171C] rounded-xl p-3'>
                        <label htmlFor='email'>CORREO</label>
                        <input
                            className="inputField"
                            type="email"                      
                            value={email}
                            id='email'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={passwordError ? 'bg-[#15171C] rounded-xl p-3 border-2 border-red-400 text-red-400 box-border' : 'bg-[#15171C] rounded-xl p-3'}>
                        <label htmlFor='password'>
                            {passwordError ?
                                <span>MINIMO 8 CARACTERES</span> 
                                :
                                <span>CONTRASEÑA</span> 
                            }
                            </label>
                        <input
                            className="inputField"
                            type="password"
                            value={password}
                            id='password'
                            placeholder='***********'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        {emptyValues ?
                            <p className='text-red-400 text-sm'>Rellene todos los campos</p>    
                            :      
                            <p className='text-sm text-slate-400'></p>
                        }
                    </div>

                    
                    <button className="bg-blue-500 disabled:bg-blue-700 px-7 py-5 text-lg rounded-xl hover:bg-blue-400 active:bg-blue-700 duration-200 flex items-center justify-center" type="submit" disabled={loading}>
                            {loading ? <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-loader-3 animate-spin w-[30px] stroke-white stroke-2" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                                <path d="M17 12a5 5 0 1 0 -5 5"></path>
                            </svg> : <span>Registrarse</span>}
                        </button>
                    
                    <p className='text-center'>¿Ya tienes cuenta? <Link className="text-blue-200 hover:underline" to={"/login"}>Iniciar sesión</Link></p>
                </form>
        </main>
    )
}