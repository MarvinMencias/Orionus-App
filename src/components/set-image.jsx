import { useRef } from "react"
import { IconPhotoPlus } from "@tabler/icons-react"

export default function ChargeImage() {
    const fileRef = useRef()

    const handleClick = () => {
        fileRef.current.click()
    }

    return (
        <>
            <div className='hidden'>
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    ref={fileRef}
                />
            </div>

            <button
                className=" hover:bg-slate-600 active:bg-slate-800 text-white rounded-xl p-[7px] box-border disabled:bg-transparent mr-2"
                type='button'
                onClick={handleClick}
            >
                <IconPhotoPlus color="cyan"size={28} />
            </button>
        </>
    )
}