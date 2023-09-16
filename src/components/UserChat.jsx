import ChatMessage from '../components/ChatMessage'
import { useState, useRef, useEffect } from 'react'
import { useChat } from "../Context/Context"
import ChargeImage from './SetImage'


export default function UserChat() {
    const { sendMessages, userID, messages, loadingMessages, chatActual, waitSend, getMessages, newChatName } = useChat()

    const [message, setMessage] = useState('')

    //Envia mensajes.
    const onSendMessage = async (event) => {
        event.preventDefault()
        await sendMessages({ message, chatActual })
        setMessage('')

    }

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
        const container = document.querySelector(".messages")
        container.scrollTop = container.scrollHeight
    }, [getMessages])

    return (
        <>
            <h2 className="bg-black text-white text-lg text-left p-5 sticky top-0">Chat con: <span className='text-blue-300'>{newChatName}</span></h2>
            <div className="messages h-screen rounded-2xl overflow-y-auto px-3 py-3  bg-[#1C1E25]">
                <div className='w-full flex items-center justify-center'>
                    <div className='flex items-center gap-3 p-4 mb-8 bg-black/40 text-white rounded-2xl'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="w-10 stroke-white" 
                            viewBox="0 0 24 24" 
                            strokeWidth="1" 
                            stroke="currentColor" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                            <path d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path>
                            <path d="M10 11v-2a2 2 0 1 1 4 0v2"></path>
                        </svg>
                        <div>
                            <p className='font-medium leading-relaxed'>Tus mensajes estan cifrados</p>
                            <p className='text-slate-400 text-sm'>Nadie puede acceder a tus mensajes</p>
                        </div>
                        
                    </div>
                   

                </div>

                {
                    loadingMessages
                        ?

                        <div className="animate-pulse flex space-x-4">
                            <div className="w-full space-y-6 py-1">
                                <div className="h-16 bg-slate-700/75 rounded"></div>
                                <div className="space-y-3 w-full">
                                    <div className="h-10 bg-slate-700/75  rounded w-full"></div>
                                    <div className="h-5 bg-slate-700/75  rounded"></div>
                                </div>
                            </div>
                        </div>

                        :
                        messages.map((message) => (

                            message.id_sender === userID ? (
                                <ChatMessage key={message.id} text={message.message} position={true} />


                            ) : (
                                <ChatMessage key={message.id} text={message.message} position={false} />
                            )

                        ))

                }
            </div>
            <form
                onSubmit={onSendMessage}
                className="flex items-center py-3 box-border gap-2 px-3 bg-[#1C1E25]"
            >
                <div className="flex items-center box-border p-[7px] w-full min-h-full rounded-xl bg-[#15171C]">
                    <input
                        type="text"
                        className="w-full h-full bg-transparent border-none outline-none box-border px-4 py-1 text-[17px] text-white placeholder:text-white/75 whitespace-normal"
                        placeholder="Escribir mensaje"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                        ref={inputRef}
                    />


                    {waitSend ?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-loader-3 animate-spin w-[47px] p-1  stroke-white stroke-2"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                            <path d="M17 12a5 5 0 1 0 -5 5"></path>
                        </svg>
                        :
                        <>
                            <ChargeImage />

                            <button
                                className=" bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-600 text-white rounded-xl p-[7px] box-border disabled:bg-transparent" type='submit'
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-send stroke-1 w-[30px] stroke-black"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M10 14l11 -11"></path>
                                    <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                                </svg>
                            </button>
                        </>
                    }
                </div>

            </form>
        </>
    )
}