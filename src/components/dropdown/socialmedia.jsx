import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SocialMediaMenu = ({ value, handleChange, label, menuitems }) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 150, marginLeft: 2 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={(e) => handleChange(e, label.toLowerCase())}
        label="Platform"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {menuitems.map((item) => (
          <MenuItem value={item.toLowerCase()}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
