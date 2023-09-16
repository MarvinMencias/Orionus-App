import { useRef, useState } from "react"
import { useChat } from "../Context/Context"


export default function ChargeImage() {
    const fileRef = useRef()
    const { waitSend } = useChat()

    const handleClick = () => {
        fileRef.current.click()
    }


    return (
        <>
            <div className='hidden'>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                />
            </div>

            <button
                disabled={waitSend ? true : false}
                className=" hover:bg-slate-600 active:bg-slate-800 text-white rounded-xl p-[7px] box-border disabled:bg-transparent mr-2"
                type='button'
                onClick={handleClick}
            >
                {waitSend ?
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-loader-3 animate-spin w-[30px] stroke-white stroke-2"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
                        <path d="M17 12a5 5 0 1 0 -5 5"></path>
                    </svg>
                    :
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-photo stroke-white w-[30px]" viewBox="0 0 24 24"
                        strokeWidth="1.3"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">

                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M15 8h.01"></path>
                        <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path>
                        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path>
                        <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path>
                    </svg>
                }
            </button>
        </>
    )
}