import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import "react-pro-sidebar/dist/css/styles.css";
import GroupsIcon from '@mui/icons-material/Groups';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
<<<<<<< HEAD
<<<<<<< HEAD
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
=======
>>>>>>> Teams: Add New Team Template UI
=======
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
>>>>>>> Analytics: Add & Delete Website Analytics
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {/* CMS */}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  CMS
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  User Dashboard
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Menu
            </Typography>
            <Item
              title="Website Info"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Analytics"
              to="/analytics"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Images"
              to="/images"
              icon={<CollectionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />



            <Item
              title="Team"
              to="/team"
              icon={<GroupsIcon />}
<<<<<<< HEAD
=======
              selected={selected}
              setSelected={setSelected}
            />
<<<<<<< HEAD

            <Item
              title="Reviews"
              to="/reviews"
              icon={<PersonOutlinedIcon />}
>>>>>>> Teams: Add New Team Template UI
              selected={selected}
              setSelected={setSelected}
            />
=======
>>>>>>> Analytics: Add & Delete Website Analytics
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
