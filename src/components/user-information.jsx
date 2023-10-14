import { useRef, useState } from 'react'
import { useChat } from '../context/Context'


export default function UserInfo() {
    const { nameForUser, usernameForUser } = useChat()
    const [newImageProfile, setNewImageProfile] = useState(null)
    const [newName, setNewName] = useState()
    const [newUsername, setNewUsername] = useState()
    const [profileImage, setProfileImage] = useState()
    const [openCreateChat, setOpenCreateChat] = useState(false)
    const [imagePreview, setImagePreview] = useState(false)

    const fileRef = useRef()

    const handleClick = () => {
        fileRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setProfileImage(imageUrl)
      }
    
    const handleClean = () => {
        setProfileImage('')
        setOpenCreateChat(false)
    }

    return (
        <>
            <div
                onClick={()=> (setImagePreview(false))} 
                className={imagePreview ? 'fixed flex w-[screen] h-full top-0 left-0 right-0 items-center justify-center bg-black/70 z-50' : 'hidden'}>
                    <div className="w-[900px] flex items-center justify-center">
                        <img 
                        src={profileImage ? profileImage : './gato.png'}
                        className="w-[60%] rounded" 
                        />
                    </div>     
            </div>

            <div className='hidden'>
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    ref={fileRef}
                    onChange={handleFileChange}
                />
            </div>

            <div className="flex py-2 px-2 cursor-pointer gap-3 items-center rounded-xl hover:bg-slate-100/20 active:bg-slate-700 select-none"
                onClick={() => (setOpenCreateChat(true))}>
                <div className="text-right">
                    <p className="text-xl">
                        <strong>
                            {usernameForUser ?
                                usernameForUser :
                                '--'}
                        </strong>
                    </p>

                    <p className="text-md text-slate-400">
                        {nameForUser ?
                            nameForUser :
                            '--'}
                    </p>
                </div>

                <img
                    src={'./gato.png'}
                    alt="user_profile_cat"
                    draggable={false}
                    className="w-[70px] h-[70px] rounded-full"
                />
            </div>

            {openCreateChat && (
                <div className="fixed w-full h-full z-20 top-0 left-0 bg-black/70 flex items-center justify-center py-32">
                    <form className="flex flex-col items-center justify-between box-border p-7 w-1/3 max-w-1/3 bg-[#252931] rounded-xl max-h-full min-h-full">
                        <span className="text-2xl">Mi Perfil</span>

                        <div className='min-w-full min-h-full max-h-full max-w-full flex flex-col gap-4 items-center justify-center'>
                            <img
                                src={profileImage ? profileImage : './gato.png'}
                                alt="user_profile_cat"
                                draggable={false}
                                className="w-[140px] h-[140px] rounded-full object-cover object-center cursor-pointer hover:brightness-125 duration-150"
                                onClick={()=> (setImagePreview(true))}
                            />
                            <div className='text-blue-200 hover:underline text-[15px] cursor-pointer' onClick={handleClick}>Elegir nueva foto de perfil</div>
                        </div>

                        <div className="grid gap-4 min-w-full [&>div>input]:bg-transparent [&>div>label]:text-[13px] [&>div>input]:w-full [&>div>label]:font-black [&>div>label]:tracking-[1px] [&>div>input]:outline-none">

                            <div className='bg-[#15171C] rounded-xl p-4 w-full'>
                                <label htmlFor='name' className='font-black'>NOMBRE</label>
                                <input
                                    className='mt-2'                                    
                                    id='name'
                                    type='text'
                                    placeholder={nameForUser}
                                />
                            </div>

                            <div className='bg-[#15171C] rounded-xl p-4 w-full'>
                                <label htmlFor='user' className='font-black'>USUARIO</label>
                                <input
                                    className='mt-2' 
                                    id='user'
                                    type='text'
                                    placeholder={usernameForUser}
                                />
                            </div>
                            <p className='text-sm italic text-slate-400'><strong>NOTA:</strong> Imagenes de máximo <strong>3MB</strong>.</p>

                            <button className="bg-blue-500 px-7 py-3 rounded-xl hover:bg-blue-400 active:bg-blue-700 duration-200" type="submit">Guardar</button>

                            <button className="border-2 border-cyan-700 px-7 py-3 rounded-xl hover:bg-cyan-700 active:bg-cyan-900 duration-200" type="submit" onClick={handleClean}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}