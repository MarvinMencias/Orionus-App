import { createContext, useContext } from "react"
import { supabase } from '../client'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const chatContext = createContext()
export const useChat = () => {
    const context = useContext(chatContext)

    return context
}

export function ChatContextProvider({ children }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState([])
    const [userID, setUserID] = useState('')
    const [users, setUsers] = useState([])
    const [isChatting, setisChatting] = useState(false)
    const [messages, SetMessages] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [chatActual, setChatActual] = useState()
    const [waitSend, setWaitSend] = useState(false)
    const [chatAvailable, setChatAvailable] = useState(false)
    const [loadingCreateChat, setLoadingCreateChat] = useState(true)
    const [loginError, setLoginError] = useState(false)
    const [nameForUser, setNameForUser] = useState('')
    const [usernameForUser, setUsernameForUser] = useState('')


    const getUserInformation = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: UserData, error: UserError } = await supabase
            .from('users')
            .select('name, username')
            .eq('id', user.id )

        const newName = UserData[0].name
        const newUsername = UserData[0].username    

        if(UserData){
            setNameForUser(newName)
            setUsernameForUser(newUsername)
        }else{

        }
    }

    const registerChat = async ({ name, username, email, password }) => {
        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }

        const { data: UsersData, error: UsersError } = await supabase
            .from('users')
            .insert([
                { name: name, username: username },
            ])

        if (UsersError) {
            console.log(error)
        } else {
            console.log(UsersData)
        }

        setLoading(false)
        navigate("login")

    }

    const LoginUser = async ({email, password}) => {
        setLoading(true)
        const { data:LoginData, error: LoginError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        
        
        if (LoginError) {
            console.log(LoginError)
            setLoginError(true)
            console.log(loginError)
        }else{
            console.log(LoginData)
            navigate("/")
        }
        setLoading(false)
    }

    const LogOut = async () => {
        const { error } = await supabase.auth.signOut()
    }

    const sendMessages = async ({message, chatActual}) => {
        console.log(message, chatActual)
        const { data: { user } } = await supabase.auth.getUser()
        if(waitSend === false){
            const { data, error } = await supabase
                .from('messages')
                .insert([
                    { id_sender: user.id, message: message, chat_id: chatActual },
                ])

            if (error) {
                console.log(error)
            } else {
                console.log(data)
            }
        }
    }

    const createChat = async (username, message) => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: receptorID, error: rcpIDError } = await supabase
            .from('users')
            .select("id")
            .eq("username", username)


        if (rcpIDError) {
            console.log(rcpIDError)
        } else {
            console.log(receptorID[0].id)
        }

        setLoadingCreateChat(true)
        const { data: existingChat, error: existingChatError } = await supabase
        .from('chats')
        .select('id, sender, receptor')
        .eq('sender', user.id)
        .eq('receptor', receptorID[0].id);

        if (existingChat.length === 0) {
            const { data: Chats, error: ChatsError } = await supabase
                .from('chats')
                .insert([
                    { sender: user.id, receptor: receptorID[0].id },
                ])
            
            const { data: newChatID, error: newChatIDError } = await supabase
                .from('chats')
                .select('id')
                .eq('sender', user.id)
                .eq('receptor', receptorID[0].id);
            
                console.log(newChatID[0].id)
                const chatActual = newChatID[0].id
                console.log(message)

                sendMessages({message, chatActual})
        } else {
            console.log("Chat ya existente")
        }
        setLoadingCreateChat(false)
    }

    const getChats = async () => {
        //Devuelve todos los chats en donde el usuario actual esta involucrado.
        const { data: { user } } = await supabase.auth.getUser()
        //Obtiene el id del usuario actual (Para usarlo de manera global en el codigo)
        setUserID(user.id)

        if (user) {
            setLoading(true)
            const { data: chatsST } = await supabase
                .from('chats')
                .select('id, sender, receptor')
                .or(`sender.eq.${user.id},receptor.eq.${user.id}`)
                .order('created_at', { ascending: false })

            setChats(chatsST)

            const sendersID = chatsST.map(chat => chat.sender)
            const receptorID = chatsST.map(chat => chat.receptor)

            //Devuelve los IDS y usernames de la tabla users, en donde sus id esten en los arreglos.
            const { data: usersData, error: usersError } = await supabase
                .from('users')
                .select('id, username')
                .in('id', [...sendersID, ...receptorID]);


            //Si se cumple la consulta, se guardaran todos los ids y usernames recogidos.
            if (usersData) {
                setUsers(usersData);
                
            }

            //Evalua si el usuario esta involucrado en un chat
            const isIncludedInSenders = sendersID.includes(user.id);
            const isUserReceptor = receptorID.includes(user.id);
            

            if (isIncludedInSenders || isIncludedInSenders !== isUserReceptor) {
                setisChatting(true)
                console.log('Entras en conversacion con alguien')
            }
            setLoading(false)

        }else{
            console.log("No hay ninguna sesion")
        }

    }

    const getMessages = async (chatActual, firstCharge = true) => {
        setChatAvailable(true)
        //Obtiene todos los mensajes de un chat en especifico, en donde el usuario esta involucrado

        if (firstCharge) {
            setLoadingMessages(true)
        }
        setWaitSend(true)

        if (chatActual === false) {
            console.log("No hay chat seleccionado")
        }
        const { data: sender, error: senderError } = await supabase
            .from('messages')
            .select('id, id_sender, message')
            .eq('chat_id', chatActual)
            .order('created_at', { ascending: true })

        SetMessages(sender)
        setChatActual(chatActual)
        setWaitSend(false)
        setLoadingMessages(false)
    }

    const channelB = supabase
        .channel('table-db-changes')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `chat_id=eq.${chatActual}`
            },
            (payload) => getMessages(chatActual, false)
        )
        .subscribe()



    return (
        <chatContext.Provider value={{
            registerChat,
            LoginUser,
            LogOut,
            loading,
            sendMessages,
            getChats,
            chats,
            users,
            userID,
            isChatting,
            getMessages,
            messages,
            loadingMessages,
            chatActual,
            waitSend,
            chatAvailable,
            createChat,
            loadingCreateChat,
            loginError,
            getUserInformation,
            nameForUser,
            usernameForUser
        }}>

            {children}
        </chatContext.Provider>
    )
}