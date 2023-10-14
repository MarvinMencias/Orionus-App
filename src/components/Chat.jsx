import { useState } from "react"
import { useChat } from '../context/Context'


export default function ChatContact({ name, chatID, userID }) {
    const { getMessages } = useChat()
    const [firstCharge, setFirstCharge] = useState(false)
    const userChatImage = `https://mtrhnhcjizluavahjvjv.supabase.co/storage/v1/object/public/example/gatito.png`
    
    //Obtener todos los mensajes de un chat
    const onGetMessages = async (chatID) => {
        setFirstCharge(true)
        await getMessages(chatID, firstCharge, name)
    }

    return (
        <div className='flex hover:bg-slate-100/20 active:bg-slate-700 w-full items-center duration-150 gap-3 py-2 px-4 rounded-xl cursor-pointer select-none' onClick={() => onGetMessages(chatID)}>
            <img 
            src={userChatImage} alt="user_profile_image" className=" w-14 rounded-full" draggable={false}/>
            <div className="grid">
                <span className="leading-relaxed text-xl tracking-wide">{name}</span>
                <p className="text-sm text-slate-400">Haz Click para chatear</p>
            </div>
        </div>
    )

}