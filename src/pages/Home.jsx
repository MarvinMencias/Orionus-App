import { useEffect } from "react"
import { useChat } from '../Context/Context'
import ChatList from "../components/ChatList"
import Messenger from "../components/Messenger"
export default function Home() {



    const { getChats, LogOut, getUserInformation, nameForUser, usernameForUser } = useChat()


    const onLogOut = async () => {
        await LogOut()
    }

    //Cargar los chats la primera vez que se carga
    useEffect(() => {
        getChats()
        getUserInformation()
        console.log("Cargando chats")
    }, [])

    return (
        <>
            <main className="flex flex-col h-screen p-6 gap-3 bg-[#252931]">
                <header className=" text-white py-4 flex justify-between">
                    <div className="flex gap-3 items-center">
                        <h1 className=" text-xl font-black tracking-[2px]">Orionus</h1>
                        <button onClick={onLogOut} title="Cerrar Sesión">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout-2 w-8 stroke-red-400 hover:stroke-red-50" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                                <path d="M15 12h-12l3 -3"></path>
                                <path d="M6 15l-3 -3"></path>
                            </svg>
                        </button>
                    </div>


                    <div className="flex gap-3 items-center">
                        <div className="text-right">
                            <p className="text-xl"> <strong>{usernameForUser}</strong></p>
                            <p className="text-md text-slate-400">{nameForUser}</p>

                        </div>

                        <img src="./gato.png" alt="user_profile_cat" className="w-12" />
                    </div>

                </header>

                <div className="w-full flex h-full gap-5">
                    <ChatList />
                    <Messenger />
                </div>


            </main>
        </>

    )
}
