import { ChatContextProvider } from './Context/Context'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import { supabase } from './client'
import { useEffect } from 'react'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
          navigate("/")
    }});
  }, [navigate])

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
