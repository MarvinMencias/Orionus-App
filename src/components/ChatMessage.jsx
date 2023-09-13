

export default function ChatMessage({text, position = "false"}) {
    return (
        <article className={position === true ? 'flex justify-end w-full [&>span]:bg-[#8c55e4] [&>span]:rounded-l-xl [&>span]:rounded-br-xl'  : 'flex justify-start w-full [&>span]:bg-[#15171C] [&>span]:rounded-r-xl [&>span]:rounded-bl-xl'}>

            <span className="text-slate-200 max-w-[60%] box-border px-7 py-4 leading-relaxed mb-2 text-[17px]">
                {text}
            </span>

        </article>
        
    );

}