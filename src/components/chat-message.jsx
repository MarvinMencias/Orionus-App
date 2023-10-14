import ImagePreview from "./image-preview"

export default function ChatMessage({ text, position = "false" }) {

    const processText = (text) => {
        // Si no hay URLs de imágenes, procesamos URLs normales
        const urlRegex = /(https?:\/\/[^\s]+)/g
        return text.split(urlRegex).map((part, index) => {
            if (index % 2 === 1) {
                // Es una URL
                return (
                    <a
                        className="underline underline-offset-4 text-cyan-300 font-black"
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {part}
                    </a>
                );
            }
            return part
        });
    };

    const content = processText(text)

    return (
        <>
            <div className={position === true ? 'flex justify-end w-full [&>span]:bg-[#8c55e4] [&>span]:rounded-l-xl [&>span]:rounded-br-xl' : 'flex justify-start w-full [&>span]:bg-[#15171C] [&>span]:rounded-r-xl [&>span]:rounded-bl-xl'}>

                <span className="break-words text-slate-200 max-w-lg px-7 py-4 leading-relaxed mb-2 text-[17px]">
                    {content}
                </span>
            </div>
        </>

    );

}