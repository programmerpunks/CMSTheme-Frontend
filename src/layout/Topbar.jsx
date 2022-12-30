import { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../context/auth";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate()
  const { setUser } = useContext(AuthContext)


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton>
          <LogoutOutlinedIcon onClick={() => {
            Cookies.remove('role')
            Cookies.remove('token')
            setUser()
            navigate('/login')
          }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
