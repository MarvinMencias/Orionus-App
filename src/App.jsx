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

  const ProtectedRouter = ({ children }) => {
    supabase.auth.onAuthStateChange((_event, session) => {
    
    if (!session) {
      return navigate("/login")
    }else{

    }})

    return children
  }

  return (
    <>
      <ChatContextProvider>
        <Routes>
          <Route path='/' element={<ProtectedRouter><Home/></ProtectedRouter>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ChatContextProvider>
    </>
  )
}
