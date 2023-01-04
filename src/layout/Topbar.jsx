import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let navigate = useNavigate()
  let dispatch = useDispatch()

  return (
    <Box display="flex" justifyContent="space-between" p={2}>

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

      <Box display="flex">

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => {
          Cookies.remove('role')
          Cookies.remove('token')
          dispatch(signOut())
          navigate('/')
          navigate('/login')
          navigate('/')
        }} >
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
