import { useState } from 'react'
import { useChat } from '../Context/Context'

export default function Register() {

    const {registerChat, loading } = useChat()
    
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        await registerChat({name, username, email, password})
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
                            required={true}
                            placeholder='Nombre'
                            id='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='bg-[#15171C] rounded-xl p-3'>
                        <label htmlFor='username'>NOMBRE DE USUARIO</label>
                        <input
                            className="inputField"
                            type="text"                           
                            value={username}
                            maxLength={"8"}
                            id='username'
                            required={true}
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
                            required={true}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='bg-[#15171C] rounded-xl p-3'>
                        <label htmlFor='password'>CONTRASEÑA</label>
                        <input
                            className="inputField"
                            type="password"
                            value={password}
                            id='password'
                            required={true}
                            placeholder='***********'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                        <button className="bg-blue-500 px-7 py-5 text-lg rounded-xl hover:bg-blue-400 active:bg-blue-700 duration-200" type="submit" disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Registrarse</span>}
                        </button>
                    
                    <p className='text-center'>¿Ya tienes cuenta? <a className="text-blue-200 hover:underline" href="">Inicia Sesión</a></p>
                </form>
        </main>
    )
}