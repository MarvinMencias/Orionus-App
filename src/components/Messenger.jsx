import UserChat from "./user-chat"
import { useChat } from "../context/Context"
import NoMessages from "./no-messages"

export default function Messenger() {
    const { chatAvailable } = useChat()

    return (
        <div className="bg-[#1C1E25] min-h-full w-full overflow-clip rounded-2xl  flex flex-col">
            {chatAvailable?
                <UserChat/>
                :
                <NoMessages/>
            }
        </div>
    )
}