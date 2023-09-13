import StartChat from "./StartChat"


export default function NoMessages () {
    return (
        <section className="text-white text-center w-full h-full gap-5 flex flex-col items-center justify-center">
            <img className="w-[30%]" src="./gatito.png" alt="no_messages_icon" />
            <h3 className="text-3xl font-black">Parece que no has abierto ningún chat</h3>
            <p className="text-md">Abre uno o ¿Te gustaría iniciar una conversación?</p>
            <StartChat/>
        </section>
    )
}