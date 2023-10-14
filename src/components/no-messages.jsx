import StartChat from "./start-chat"


export default function NoMessages () {
    return (
        <section className="text-white text-center w-full h-screen gap-5 flex flex-col items-center justify-center">
            <img className="w-[30%]" src="./gatito.png" alt="no_messages_icon" draggable={false} />
            <span className="text-3xl font-black">Parece que no has abierto ningún chat</span>
            <p className="text-md">Abre uno o ¿Te gustaría iniciar una conversación?</p>
            <StartChat/>
        </section>
    )
}