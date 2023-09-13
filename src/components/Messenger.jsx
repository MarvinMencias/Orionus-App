import UserChat from "./UserChat"
import { useChat } from "../Context/Context"
import NoMessages from "./NoMessages"

export default function Messenger() {
    const { chatAvailable } = useChat()

    return (
        <div className="bg-[#1C1E25] h-full w-full rounded-2xl overflow-clip flex flex-col">
            {chatAvailable?
                <UserChat/>
                :
                <NoMessages/>
            }
        </div>
    )
}