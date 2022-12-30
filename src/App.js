import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from './layout/Topbar.jsx'
import Sidebar from './layout/Sidebar.jsx'
import { Dashboard } from "./pages/dashboard/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './App.css'
import Cookies from "js-cookie";
import { NewUser } from "./pages/users/newUser.jsx";
import { Login } from "./pages/Login/index";
import AuthContext from "./context/auth.js";

function App() {
  const [theme, colorMode] = useMode()
  const [user, setUser] = useState({})
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <AuthContext.Provider value={{user, setUser}}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {Cookies.get('role') !== undefined && (<Sidebar isSidebar={isSidebar} />)}

          <main className="content">
          {Cookies.get('role') !== undefined && ( <Topbar setIsSidebar={setIsSidebar} />)}

      {/* <Login/> */}
      {/* <Login/> */}
            <Routes>
            {Cookies.get('role') === undefined &&            
               (        
                <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/new-user" element={<NewUser />} />
                </>
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
