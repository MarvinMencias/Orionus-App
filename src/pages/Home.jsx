import { useEffect } from "react"
import { useChat } from '../context/Context'
import ChatList from "../components/chat-list"
import Messenger from "../components/messenger"
import UserInfo from "../components/user-information"
export default function Home() {

    const { getChats, LogOut, getUserInformation} = useChat()


    const onLogOut = async () => {
        await LogOut()
    }

    //Cargar los chats la primera vez que se carga
    useEffect(() => {
        getChats()
        getUserInformation()
    }, [])

    return (
        <>
            <div className="flex flex-col min-h-screen max-h-screen p-6 gap-1 bg-[#252931] select-text">
                <header className=" text-white py-2 flex justify-between">
                    <div className="flex gap-3 items-center">
                        <h1 className=" text-2xl font-black tracking-[2px]">Orionus</h1>
                        <button onClick={onLogOut} title="Cerrar Sesión">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout-2 w-8 stroke-red-400 hover:stroke-red-50" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                                <path d="M15 12h-12l3 -3"></path>
                                <path d="M6 15l-3 -3"></path>
                            </svg>
                        </button>
                    </div>
                    <UserInfo/>
                </header>

                <div className="flex min-h-full gap-5">
                    <ChatList />
                    <Messenger />
                </div>
            </div>
        </>

    )
}
