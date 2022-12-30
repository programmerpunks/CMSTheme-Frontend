import React, { useContext } from 'react'
import { Box, Typography, Modal } from '@mui/material'
import { delete_image } from '../../../helpers/users';
import { delete_user } from '../../../helpers/admin';
import AuthContext from '../../../context/auth';

export const ConfirmationModal = (props) => {
  let {
    open,
    setOpen,
    current,
    setCurrent,
    fetch,
    setFetch,
    colors } = props

  let { check, setCheck } = useContext(AuthContext)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: colors.primary[700],
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);

  const deleteContent = async () => {
    console.log('current img: ', current)
    if (props.content === 'user') {
      await delete_user({ uid: current, fetch, setFetch, setOpen })
    } else {
      await delete_image({ image: current, setCurrent, setOpen, check, setCheck })
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2" color="white">
          Are you sure you want to delete?
        </Typography>
        <Box display='flex' justifyContent='center' className='m-3'>
          <button className='btn btn-outline-primary mx-2'
            onClick={() => handleClose()}>
            Cancel
          </button>
          <button className='btn btn-primary mx-2'
            onClick={() => deleteContent()}>
            Delete
          </button>
        </Box>
      </Box>
    </Modal >
  )
}
