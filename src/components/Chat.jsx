export default function ChatContact({ name, onClick }) {
    return (
        <article className="flex hover:bg-slate-100/20 active:bg-slate-700 w-full items-center duration-150 gap-3 py-2 rounded-xl cursor-pointer select-none" onClick={onClick}>

            <img src="./gato.png" alt="user_profile_cat" className="w-12" />
            <div className="grid">
                <h1 className="leading-relaxed text-xl tracking-wide">{name}</h1>
                <p className="text-sm text-slate-400">Haz Click para chatear</p>
            </div>
        </article>
    )

}