import ChatContact from './chat'
import { useChat } from '../context/Context'
import NoChats from "./no-chats"
import StartChat from "./start-chat"
import { IconReload } from "@tabler/icons-react"

export default function () {
    const { chats, users, userID, isChatting, loading, getChats } = useChat()


    return (
        <div className="flex flex-col gap-5 min-h-full w-[30%] min-w-[30%]  text-white">
            <div className="bg-[#1C1E25] p-6 text-center rounded-2xl flex flex-col gap-5">
                <span className="text-2xl font-black">Iniciar nuevo chat</span>
                <p className="text-sm text-slate-400">La vida es mejor con amigos <br />¡Invitalos a Orionus y empieza a chatear!</p>
                <StartChat />
            </div>

            <div className="bg-[#1C1E25] rounded-2xl px-2 py-6 flex flex-col gap-5 h-full overflow-x-clip overflow-y-auto">
                <div className="flex justify-between items-center px-4">
                    <span className="text-2xl">Chats</span>
                    <button
                        onClick={getChats}
                        className="hover:bg-slate-600 p-2 rounded-full duration-100">

                        <IconReload className={loading ? 'stroke-yellow-100 animate-spin' : 'stroke-yellow-100 '} size={26} />
                    </button>
                </div>


                
                {
                    loading ?
                        <div className="grid gap-7 animate-pulse px-4">
                            <div className="flex items-center mb-4 w-full">
                                <div className="h-14 w-14 bg-gray-500 rounded-full mr-4"></div>
                                <div className="grid gap-5">
                                    <div className="h-5 w-52  bg-gray-500 rounded-xl"></div>
                                    <div className="h-4 w-1/2 bg-gray-500 rounded-xl"></div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4 w-full">
                                <div className="h-14 w-14 bg-gray-500 rounded-full mr-4"></div>
                                <div className="grid gap-5">
                                    <div className="h-5 w-52  bg-gray-500 rounded-xl"></div>
                                    <div className="h-4 w-1/2 bg-gray-500 rounded-xl"></div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4 w-full">
                                <div className="h-14 w-14 bg-gray-500 rounded-full mr-4"></div>
                                <div className="grid gap-5">
                                    <div className="h-5 w-52  bg-gray-500 rounded-xl"></div>
                                    <div className="h-4 w-1/2 bg-gray-500 rounded-xl"></div>
                                </div>
                            </div>
                        </div>

                        : (
                            isChatting
                                ?

                                chats.map((chat) => {

                                    const senderInfo = users.find(user => user.id === chat.sender)
                                    const receptorInfo = users.find(user => user.id === chat.receptor)
                                    const personID = chat.sender !== userID ? chat.sender : chat.receptor
                                    return (
                                        <ChatContact key={chat.id} name={senderInfo && chat.sender !== userID ? senderInfo.username : receptorInfo && receptorInfo.username} chatID={chat.id} userID={personID}/>

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