import { useState } from 'react';
import Cookies from 'js-cookie';
import Panel from './layout/Panel.jsx'
import {useSelector} from 'react-redux'
import Topbar from './layout/Topbar.jsx'
import AuthContext from './context/auth'
import Sidebar from './layout/Sidebar.jsx'
import { Login } from './pages/Login/index';
import { Images } from './pages/CMS/images';
import { NewUser } from './pages/users/newUser';
import { Dashboard } from './pages/dashboard/index';
import { ColorModeContext, useMode } from './theme';
import { Information } from './pages/CMS/information';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import './App.css'
import { Team } from './pages/CMS/team.jsx';


function App() {
  const [theme, colorMode] = useMode()
  const [template, setTemplate] = useState()
  const [check, setCheck] = useState(false)
  const [isSidebar, setIsSidebar] = useState(true)

  const {isLoggedIn} = useSelector(state => state)

  console.log('isLoggedIn: ', isLoggedIn)

  return (
    <AuthContext.Provider value={{ check, setCheck, template, setTemplate}}>
    <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {Cookies.get('role') === 'admin' ? (<Sidebar isSidebar={isSidebar} />)
          : isLoggedIn && (<Panel isSidebar={isSidebar} />)}

          <main className='content'>
          {(Cookies.get('role') === 'admin' || isLoggedIn) && ( <Topbar setIsSidebar={setIsSidebar} />)}

            <Routes>
            {Cookies.get('role') === 'admin' ?         
               (        
                <>
                <Route path='/' element={isLoggedIn? <Dashboard />: <Login />} />
                <Route path='/new-user' element={<NewUser />} />
                </>)
                :(
                  <>
                <Route path='/' element={isLoggedIn? <Information/>: <Login />} />
                  <Route path='/info' element={<Information />} />
                  <Route path='/images' element={<Images />} />
                  <Route path='/team' element={<Team />} />
                  <Route path='/roadmap' element={<NewUser />} /></>
              ) } 
              
              {/* <Route path='/login' element={<Login />} /> */}

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
