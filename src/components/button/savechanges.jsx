import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { message } from "antd";
import { applycms } from "../../api";
import AuthContext from "../../context/auth";

export const SaveChanges = (props) => {
  const data = props;
  const { setState } = data;
  const { check, setCheck } = useContext(AuthContext);

  const save = async () => {
    try {
      let response = await applycms({ data });
      if (response.status === 202) {
        setCheck(!check);
        setState(false);
        message.success("Changes Saved");
      }
    } catch (err) {
      message.error(err.response.data.error);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" marginTop="20px">
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => save()}
      >
        Save Changes
      </Button>
    </Box>
  );
};
