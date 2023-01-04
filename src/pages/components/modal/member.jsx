import React from 'react'
import { Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close';
import { removeStars, addReview, ReviewStars } from '../../../helpers/cms'

export const MemberModal = (props) => {
  let { title, setTitle,
    designation, setDesignation,
    profileImage, setProfileImg,
    stars, setStars, editable,
    open, setOpen, colors } = props

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='d-flex justify-content-end mb-2'>
          <CloseIcon className='add-button' onClick={() => setOpen(!open)} />
        </div>

        <div className="card-image d-flex justify-content-center align-items-center ms-8">
          <label htmlFor="file-input">
            <AddIcon size='80' color={`${colors.grey[100]}`} className='img-upload-button' />
          </label>
          <input type='file'
            id="file-input" className="form-control-file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={(e) => setProfileImg(e.target.files[0])} />
        </div>
        <div className='card-body text-center'>
          <div className='d-flex justify-content-center align-items-center mb-2'>
            {stars.length === 0 ? <span style={{ color: `${colors.primary[200]}`, fontSize: 12 }}>Add reviews here</span>
              : <ReviewStars stars={stars} />}
            <AddIcon className='add-button' onClick={() => addReview({ stars, setStars, editable })} />
          </div>
          <input id='title' placeholder='Your full name'
            className='form-control team-details fw-bold fs-4'
            value={title} style={{ borderWidth: 1 }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input id='designation' placeholder='Your designation'
            className='form-control team-details mb-2 fs-6'
            value={designation} style={{ borderWidth: 1 }}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
      </Box>
    </Modal >
  )
}
