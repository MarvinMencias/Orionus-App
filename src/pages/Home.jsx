import { useEffect } from "react"
import { useChat } from '../Context/Context'
import ChatList from "../components/ChatList"
import Messenger from "../components/Messenger"
export default function Home() {
    const { getChats, LogOutt} = useChat()


    const onLogOut = async () => {
        await LogOut()
    }

    //Cargar los chats la primera vez que se carga
    useEffect(() => {
        getChats()
        console.log("Cargando chats")
    }, [])

    return (
        <>
            <main className="flex flex-col h-screen p-6 gap-3 bg-[#252931]">
                <header className=" text-white py-4 flex justify-between">
                    <h1 className=" text-xl font-black tracking-[2px]">Orionus</h1>
                    
                    <div className="flex gap-3 items-center">
                        <div className="text-right">
                            <p className="text-xl"> <strong>Username</strong></p>
                            <p className="text-md text-slate-400">Name</p>
                       
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
