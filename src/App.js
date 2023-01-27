import { useState } from 'react'
import {useSelector} from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Panel from './layout/Panel'
import Topbar from './layout/Topbar'
import Sidebar from './layout/Sidebar'
import { Team } from './pages/Team/team'
import { Login } from './pages/Login/login'
import { Images } from './pages/Images/images'
import { NewUser } from './pages/Users/newUser'
import { Dashboard } from './pages/dashboard/dashboard'
import { Analytics } from './pages/Analytics/analytics'
import { Information } from './pages/Information/information'
import { ColorModeContext, useMode } from './theme'
import AuthContext from './context/auth'
import './App.css'


function App() {
  const [theme, colorMode] = useMode()
  const [template, setTemplate] = useState()
  const [check, setCheck] = useState(false)
  const [isSidebar, setIsSidebar] = useState(true)
  const {isLoggedIn, isAdminLoggedIn} = useSelector(state => state)

  return (
    <AuthContext.Provider value={{ check, setCheck, template, setTemplate}}>
    <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {isAdminLoggedIn ? (<Sidebar isSidebar={isSidebar} />)
          : isLoggedIn && (<Panel isSidebar={isSidebar} />)}

          <main className='content'>
          {(isAdminLoggedIn || isLoggedIn) && ( <Topbar setIsSidebar={setIsSidebar} />)}

            <Routes>
            {isAdminLoggedIn ?         
               (        
                <>
                <Route path='/' element={isAdminLoggedIn? <Dashboard />: <Login />} />
                <Route path='/new-user' element={<NewUser />} />
                </>)
                :(
                  <>
                <Route path='/' element={isLoggedIn? <Information/>: <Login />} />
                  <Route path='/info' element={isLoggedIn? <Information />: <Login />} />
                  <Route path='/images' element={isLoggedIn? <Images />: <Login />} />
                  <Route path='/team' element={isLoggedIn? <Team />: <Login />} />
                  <Route path='/analytics' element={isLoggedIn? <Analytics />: <Login />} /></>
              ) } 

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
