import React, { useContext } from 'react'
import { Box, Modal, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { save } from '../../helpers/cms'
import AuthContext from '../../context/auth'
import { TeamCard } from '../card/team'

export const MemberModal = (props) => {

  let { title, setTitle,
    designation, setDesignation,
    profileImage, setProfileImg,
    experience, setExperience,
    stars, setStars, open, setOpen,
    colors, team, member } = props

  const { check, setCheck } = useContext(AuthContext)

  const update = async () => {
    let updatedTeam = team.map((item) => {
      if (item.id !== member.id) {
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

  const handleClose = () => {
    setProfileImg('')
    setStars([])
    setOpen(false);
  }

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
          <CloseIcon className='add-button' onClick={() => handleClose()} />
        </div>

        <TeamCard member={member} title={title} setTitle={setTitle}
          profileImage={profileImage} setProfileImg={setProfileImg}
          designation={designation} setDesignation={setDesignation}
          experience={experience} setExperience={setExperience}
          stars={stars} setStars={setStars} editable={true}
          colors={colors} />

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