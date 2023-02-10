import { useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Panel from "./layout/Panel";
import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";
import AuthContext from "./context/auth";
import { Team } from "./pages/Team/team";
import { Login } from "./pages/Login/login";
import { Images } from "./pages/Images/images";
import { NewUser } from "./pages/Users/newUser";
import { Dashboard } from "./pages/Dashboard/dashboard";
import { Analytics } from "./pages/Analytics/analytics";
import { Information } from "./pages/Information/information";
import { ColorModeContext, useMode } from "./theme";
import "./App.css";
import {
  BASEPATH,
  INFOPATH,
  TEAMPATH,
  IMAGESPATH,
  NEWUSERPATH,
  ANALYTICSPATH,
  PAGENOTFOUNDURL,
} from "./api/urls";
import { PageNotFound } from "./pages/404/404";

function App() {
  const [theme, colorMode] = useMode();
  const [template, setTemplate] = useState();
  const [check, setCheck] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const { isLoggedIn, isAdminLoggedIn } = useSelector((state) => state);

  return (
    <AuthContext.Provider value={{ check, setCheck, template, setTemplate }}>
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              {isAdminLoggedIn ? (
                <Sidebar isSidebar={isSidebar} />
              ) : (
                isLoggedIn && <Panel isSidebar={isSidebar} />
              )}

              <main className="content">
                {(isAdminLoggedIn || isLoggedIn) && (
                  <Topbar setIsSidebar={setIsSidebar} />
                )}

                <Routes>
                  {isAdminLoggedIn ? (
                    <>
                      <Route
                        path={BASEPATH}
                        element={isAdminLoggedIn ? <Dashboard /> : <Login />}
                      />
                      <Route path={NEWUSERPATH} element={<NewUser />} />
                    </>
                  ) : (
                    <>
                      <Route
                        path={BASEPATH}
                        element={isLoggedIn ? <Information /> : <Login />}
                      />
                      <Route
                        path={INFOPATH}
                        element={isLoggedIn ? <Information /> : <Login />}
                      />
                      <Route
                        path={IMAGESPATH}
                        element={isLoggedIn ? <Images /> : <Login />}
                      />
                      <Route
                        path={TEAMPATH}
                        element={isLoggedIn ? <Team /> : <Login />}
                      />
                      <Route
                        path={ANALYTICSPATH}
                        element={isLoggedIn ? <Analytics /> : <Login />}
                      />
                    </>
                  )}

                  <Route path={PAGENOTFOUNDURL} element={<PageNotFound />} />
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
