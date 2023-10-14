import { useState } from 'react'
import { useChat } from '../context/Context'
import { Link } from 'react-router-dom'

export default function Login() {
    const bgImage = {
        backgroundImage: 'url(bg.png)',
    }

    const {LoginUser, loading, loginError } = useChat()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()

        if (email.trim() !== '' && password.trim() !== '') {
            setAlertMessage(false)
            await LoginUser({email, password})
        }else{
            setAlertMessage(true)
        }
    }

    return (
        <main style={bgImage} className="flex w-full bg-no-repeat bg-cover bg-center min-h-screen items-center justify-center">
                <form className="text-white bg-[#252931] px-24 py-10 [&>div>input]:bg-transparent [&>div>label]:text-[11px] flex flex-col gap-7 [&>div>input]:w-full [&>div>label]:font-black [&>div>label]:tracking-[1px] [&>div>input]:outline-none [&>div>input]:py-1 rounded-xl" onSubmit={handleLogin}>
                    <div className='text-center'>
                        <h3 className='text-3xl font-black mb-1'>¡Hola de nuevo!</h3>
                        <h5 className='text-md text-slate-400'>Un gusto tenerte por aquí</h5>
                    </div>

                    <div className='bg-[#15171C] rounded-xl p-3'>
                        <label htmlFor='email'>CORREO</label>
                        <input
                            className="inputField"                
                            value={email}
                            id='email'
                            type='email'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='bg-[#15171C] rounded-xl p-3'>
                        <label htmlFor='password'>CONTRASEÑA</label>
                        <input
                            className="text-white"
                            type="password"
                            value={password}
                            id='password'
                            placeholder='***********'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        {alertMessage ?
                            <p className='text-red-400 text-sm'>Rellene todos los campos</p>    
                            :
                            loginError  ?(
                                <p className='text-red-400 text-[15px] [&>span]:font-black'><span>CORREO</span> o <span>CONTRASEÑA</span> incorrecta</p>    
                            ):(
                                <p className='text-sm text-slate-400'></p>
                            )
                        }
                    </div>
                    
                        <button className="bg-blue-500 disabled:bg-blue-700 px-7 py-5 text-lg rounded-xl hover:bg-blue-400 active:bg-blue-700 duration-200 flex items-center justify-center" type="submit" disabled={loading}>
                            {loading ? <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-loader-3 animate-spin w-[30px] stroke-white stroke-2" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                                <path d="M17 12a5 5 0 1 0 -5 5"></path>
                            </svg> : <span>Iniciar Sesión</span>}
                        </button>
                    
                    <p className='text-center'>¿No tienes cuenta? <Link className="text-blue-200 hover:underline" to={"/register"}>Registrate</Link></p>
                </form>
        </main>
    )
}