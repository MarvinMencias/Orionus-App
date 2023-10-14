import { ChatContextProvider } from './context/Context'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import { supabase } from './client'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

export default function App() {

  return (
    <>
      <ChatContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ChatContextProvider>
    </>
  )
}
