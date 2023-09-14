import { useState } from "react"
import { useChat } from "../Context/Context"


export default function StartChat() {
    const { createChat } = useChat()
    const [openCreateChat, setOpenCreateChat] = useState(false)
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')

    const onCreateChat = async (event) => {
        event.preventDefault()
        await createChat(username, message)
        setOpenCreateChat(false)
    }

    return (
        <>
            <button className="bg-blue-500 px-7 py-3 rounded-xl hover:bg-blue-400 active:bg-blue-700 duration-200" onClick={() => (setOpenCreateChat(true))}>Iniciar Chat</button>

            {openCreateChat && (
                <div className="fixed w-full h-full z-20 top-0 left-0 bg-black/70 flex items-center justify-center">
                    <form onSubmit={onCreateChat} className="flex flex-col gap-10 box-border p-7 w-1/2 bg-[#252931] rounded-xl">
                        <h3 className="text-2xl">Crear nuevo chat</h3>
                        <div className="grid gap-5 w-full">
                            <div className="flex gap-2 text-center">
                                <label htmlFor="username"className="">¿A quién hablamos hoy?</label>
                                <input 
                                    className="w-full box-border outline-none p-4 text-lg  rounded-xl bg-[#15171C]" 
                                    name="username" 
                                    type="text"
                                    value={username}
                                    onChange={(e) => (setUsername(e.target.value))} 
                                    placeholder="Username" 
                                />
                            </div>
                            
                            <div className="flex flex-col text-left gap-2">
                                <label htmlFor="message">¿Que quieres decirle?</label>
                                <textarea 
                                    name="message" 
                                    className="box-border outline-none p-4 text-lg rounded-xl bg-[#15171C] resize-none" 
                                    rows={7} 
                                    value={message}
                                    onChange={(e) => (setMessage(e.target.value))} 
                                    placeholder="Las rosas son lindas como tú."
                                ></textarea>
                            </div>
                            
                            <button className="bg-blue-500 px-7 py-3 rounded-xl hover:bg-blue-400 active:bg-blue-700 duration-200" type="submit">Crear Chat</button>
                            <button className="border-2 border-cyan-700 px-7 py-3 rounded-xl hover:bg-cyan-700 active:bg-cyan-900 duration-200" type="submit" onClick={() => (setOpenCreateChat(false))}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </>

    )
}