import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from "react-pro-sidebar"
import { Typography } from "@mui/material"

export const Item = ({ colors, title, to, icon, selected, setSelected}) => {
  console.log('colors: ', colors)
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