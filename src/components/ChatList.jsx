import { useState } from "react"
import ChatContact from '../components/Chat'
import { useChat } from '../Context/Context'
import NoChats from "./NoChats"
import StartChat from "./StartChat"

export default function () {
    const { chats, users, userID, isChatting, loading, getMessages, getChats } = useChat()
    const [firstCharge, setFirstCharge] = useState(false)

    //Obtener todos los mensajes de un chat
    const onGetMessages = async (chatID) => {
        setFirstCharge(true)
        await getMessages(chatID, firstCharge)
    }

    return (
        <div className="flex flex-col gap-5 min-h-full w-[30%] min-w-[30%]  text-white">
            <div className="bg-[#1C1E25] p-6 text-center rounded-2xl flex flex-col gap-5">
                <h1 className="text-2xl font-black">Iniciar nuevo chat</h1>
                <p className="text-sm text-slate-400">La vida es mejor con amigos <br />¡Invitalos a Orionus y empieza a chatear!</p>
                <StartChat />
            </div>

            <div className="bg-[#1C1E25] rounded-2xl overflow-x-clip overflow-y-auto p-6 flex flex-col gap-5 h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Chats</h1>
                    <button
                        onClick={getChats}
                        className="hover:bg-slate-600 p-2 rounded-full duration-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={loading ? 'w-7 stroke-yellow-100 stroke-2 animate-spin' : 'w-7 stroke-yellow-100 stroke-2'}
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">

                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
                        </svg>
                    </button>
                </div>
                {
                    loading ?
                        <div className="grid gap-7 animate-pulse">
                            <div class="flex items-center mb-4 w-full">
                                <div class="h-12 w-12 bg-gray-500 rounded-full mr-4"></div>
                                <div className="grid gap-5">
                                    <div class="h-5 w-52  bg-gray-500 rounded-xl"></div>
                                    <div class="h-4 w-1/2 bg-gray-500 rounded-xl"></div>
                                </div>
                            </div>

                            <div class="flex items-center mb-4 w-full">
                                <div class="h-12 w-12 bg-gray-500 rounded-full mr-4"></div>
                                <div className="grid gap-5">
                                    <div class="h-5 w-52  bg-gray-500 rounded-xl"></div>
                                    <div class="h-4 w-1/2 bg-gray-500 rounded-xl"></div>
                                </div>
                            </div>

                            <div class="flex items-center mb-4 w-full">
                                <div class="h-12 w-12 bg-gray-500 rounded-full mr-4"></div>
                                <div className="grid gap-5">
                                    <div class="h-5 w-52  bg-gray-500 rounded-xl"></div>
                                    <div class="h-4 w-1/2 bg-gray-500 rounded-xl"></div>
                                </div>
                            </div>
                        </div>

                        : (
                            isChatting
                                ?

                                chats.map((chat) => {

                                    const senderInfo = users.find(user => user.id === chat.sender);
                                    const receptorInfo = users.find(user => user.id === chat.receptor);
                                    return (
                                        <ChatContact key={chat.id} name={senderInfo && chat.sender !== userID ? senderInfo.username : receptorInfo && receptorInfo.username} onClick={() => onGetMessages(chat.id)} />

                                    );
                                })

                                :
                                <NoChats />
                        )

                }
            </div>
        </div>
    )
}