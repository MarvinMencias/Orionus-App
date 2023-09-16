import { useState } from "react"


export default function ImagePreview({url}) {
    const [imagePreview, setImagePreview] = useState(false)


    return (
        <>
            <div
                onClick={()=> (setImagePreview(false))} 
                className={imagePreview ? 'fixed flex w-[screen] h-full top-0 left-0 right-0 items-center justify-center bg-black/70 z-10' : 'hidden'}>
                    <div className="w-[900px] flex items-center justify-center">
                        <img 
                        src={url}
                        className="w-[60%] rounded" 
                        />
                    </div>     
            </div>

            <img
                src={url}
                onClick={()=> (setImagePreview(true))}
                className="w-[320px] rounded hover:cursor-pointer hover:brightness-125 duration-300"
                loading="lazy"
            />
        </>
    )
}