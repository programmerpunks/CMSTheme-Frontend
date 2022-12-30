import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from './layout/Topbar.jsx'
import Sidebar from './layout/Sidebar.jsx'
import { Dashboard } from "./pages/dashboard/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './App.css'
import Cookies from "js-cookie";
import { NewUser } from "./pages/users/newUser";
import { Login } from "./pages/Login/index";
import AuthContext from "./context/auth";
import { Information } from "./pages/CMS/information";
import { Images } from "./pages/CMS/images";
import Panel from './layout/Panel.jsx'

function App() {
  const [theme, colorMode] = useMode()
  const [user, setUser] = useState()
  const [template, setTemplate] = useState()

  const [check, setCheck] = useState(false)

  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <AuthContext.Provider value={{ user, setUser, check, setCheck, template, setTemplate}}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {Cookies.get('role') === 'admin' ? (<Sidebar isSidebar={isSidebar} />)
          : user !== undefined && (<Panel isSidebar={isSidebar} />)}

          <main className="content">
          {(Cookies.get('role') === 'admin' || user) && ( <Topbar setIsSidebar={setIsSidebar} />)}

            <Routes>
            {Cookies.get('role') === 'admin' ?         
               (        
                <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/new-user" element={<NewUser />} />
                </>)
                :(
                  <>
                <Route path="/" element={<Login />} />
                  <Route path="/info" element={<Information />} />
                  <Route path="/images" element={<Images />} />
                  <Route path="/team" element={<NewUser />} />
                  <Route path="/roadmap" element={<NewUser />} /></>
              ) } 
              
              <Route path="/login" element={<Login />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
