import ChatMessage from './chat-message'
import { useState, useRef, useEffect } from 'react'
import { useChat } from "../context/Context"
import ChargeImage from './set-image'
import { IconLockHeart, IconLoader3, IconSend } from "@tabler/icons-react"


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
                       <IconLockHeart color='cyan' size={40} stroke={1.5}/>
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
                        <IconLoader3 className="animate-spin stroke-white p-1" size={42} />
                        :
                        <>
                            <ChargeImage />

                            <button
                                className=" bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-600 text-white rounded-xl p-[7px] box-border disabled:bg-transparent" type='submit'
                            >
                                <IconSend className="stroke-black stroke-1" size={28}/>
                            </button>
                        </>
                    }
                </div>

            </form>
        </>
    )
}