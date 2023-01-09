import React, { useContext } from 'react'
import { Box, Modal, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Input } from '../fields/input';
import CloseIcon from '@mui/icons-material/Close';
import { save } from '../../../helpers/cms';
import { addReview, ReviewStars } from '../../../helpers/cms'
import AuthContext from '../../../context/auth';

export const MemberModal = (props) => {

  let { title, setTitle,
    designation, setDesignation,
    profileImage, setProfileImg,
    experience, setExperience,
    stars, setStars, editable,
    open, setOpen, colors, team, selected } = props

  const { check, setCheck } = useContext(AuthContext)

  const update = async () => {
    let updatedTeam = team.map((member, index) => {
      if (member.id !== selected.id) {
        return member
      } else {
        return {
          ...member,
          title,
          designation,
          stars,
          experience,
          image: profileImage
        }

      }
    })
    setStars([])
    setProfileImg('')
    await save({ team: updatedTeam, check, setCheck, setState: setOpen, state: open })

  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: colors.primary[400],
    border: 'transparent',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        timeout: 700,
      }}
    >
      <Box sx={style}>
        <div className='d-flex justify-content-end mb-2'>
          <CloseIcon className='add-button' onClick={() => setOpen(!open)} />
        </div>

        <div className={`card-image ${profileImage && 'bg-transparent'} 
                      d-flex justify-content-center align-items-center ms-8`}>

          <label htmlFor="file-input">
            {profileImage ? <img src={profileImage} alt='' className='profile-image bg-transparent' />
              :
              <AddIcon size='80' color={`${colors.grey[100]}`} className='img-upload-button' />
            }
          </label>

          <input type='file'
            id="file-input" className="form-control-file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={(e) => setProfileImg(e.target.files[0])} />
        </div>
        <div className='card-body text-center'>
          <div className='d-flex justify-content-center align-items-center mb-2'>
            {stars.length === 0 ? <span style={{ color: `${colors.primary[200]}`, fontSize: 12 }}>Add reviews here</span>
              : <ReviewStars stars={stars} setStars={setStars} />}
            <AddIcon className='add-button' onClick={() => addReview({ stars, setStars, editable })} />
          </div>


          <Input id='title' type='text' placeholder='Your full name' editable={editable}
            fieldstyle='fw-bold fs-4' value={title} setFunction={setTitle} />

          <Input id='designation' type='text' placeholder='Your Designation' editable={editable}
            fieldstyle='fs-6' value={designation} setFunction={setDesignation} />

          <div className='d-flex justify-content-center'>

            <Input id='experience' type='number' placeholder='Years of experience' editable={editable}
              fieldstyle='fw-bold mb-2 fs-6 mns-7' value={experience} setFunction={setExperience} />
            <p className='mt-2 fw-bold'> years</p>

          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <Box display='flex' justifyContent='flex-end' marginTop='20px'>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => update()}
            >
              Update Changes
            </Button>
          </Box>
        </div>
      </Box>
    </Modal >
  )
}
