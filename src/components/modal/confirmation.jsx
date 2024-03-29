import React, { useContext } from "react";
import { Box, Typography, Modal } from "@mui/material";

import AuthContext from "../../context/auth";
import { deleteImage } from "../../helpers/users";
import { deleteUser } from "../../helpers/admin";
import { deleteAnalytic, deleteMember } from "../../helpers/cms";

export const ConfirmationModal = ({
  open,
  setOpen,
  current,
  setCurrent,
  fetch,
  setFetch,
  colors,
  content,
  team,
  setTeam,
  setMembers,
  analytics,
  setAnalytics,
}) => {
  let { check, setCheck } = useContext(AuthContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: colors.primary[700],
    border: "transparent",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);

  const deleteContent = async () => {
    if (content === "user") {
      await deleteUser({ uid: current, fetch, setFetch, setOpen });
    } else if (content === "team") {
      await deleteMember({
        team,
        setTeam,
        setMembers,
        id: current.id,
        setOpen,
      });
    } else if (content === "analytics") {
      await deleteAnalytic({
        analytics,
        setAnalytics,
        id: current.id,
        setOpen,
        setCurrent,
      });
    } else {
      await deleteImage({
        image: current,
        setCurrent,
        setOpen,
        check,
        setCheck,
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        timeout: 600,
      }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          color="white"
        >
          Are you sure you want to delete?
        </Typography>
        <Box display="flex" justifyContent="center" className="m-3">
          <button
            className="btn btn-outline-primary mx-2"
            onClick={() => handleClose()}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={() => deleteContent()}
          >
            Delete
          </button>
        </Box>
      </Box>
    </Modal>
  );
};
