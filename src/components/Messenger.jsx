import UserChat from "./UserChat"
import { useChat } from "../Context/Context"
import NoMessages from "./NoMessages"

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