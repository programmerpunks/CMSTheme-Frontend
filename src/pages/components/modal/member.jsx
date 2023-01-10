<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext } from 'react'
import { Box, Modal, Button } from '@mui/material'
<<<<<<< HEAD
import CloseIcon from '@mui/icons-material/Close';
import { save } from '../../../helpers/cms';
import AuthContext from '../../../context/auth';
import { TeamCard } from '../card/team';

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
=======
import React from 'react'
import { Box, Modal } from '@mui/material'
=======
import React, { useContext } from 'react'
import { Box, Modal, Button } from '@mui/material'
>>>>>>> Teams: Update Team Member
import AddIcon from '@mui/icons-material/Add'
import { Input } from '../fields/input';
=======
>>>>>>> Teams: Code Optimized by making seperate card component
import CloseIcon from '@mui/icons-material/Close';
import { save } from '../../../helpers/cms';
import AuthContext from '../../../context/auth';
import { TeamCard } from '../card/team';

export const MemberModal = (props) => {

  let { title, setTitle,
    designation, setDesignation,
    profileImage, setProfileImg,
    experience, setExperience,
<<<<<<< HEAD
    stars, setStars, editable,
<<<<<<< HEAD
    open, setOpen, colors } = props
>>>>>>> Teams: Add New Team Template UI
=======
    open, setOpen, colors, team, selected } = props
=======
    stars, setStars, open, setOpen,
    colors, team, member } = props
>>>>>>> Teams: Code Optimized by making seperate card component

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
>>>>>>> Teams: Update Team Member

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
<<<<<<< HEAD
<<<<<<< HEAD
    bgcolor: colors.primary[400],
    border: 'transparent',
=======
    bgcolor: colors.primary[700],
    border: '2px solid #000',
>>>>>>> Teams: Add New Team Template UI
=======
    bgcolor: colors.primary[400],
    border: 'transparent',
>>>>>>> Teams: Update Team Member
    boxShadow: 24,
    p: 4,
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Teams: Code Optimized by making seperate card component
  const handleClose = () => {
    setProfileImg('')
    setStars([])
    setOpen(false);
  }
<<<<<<< HEAD
=======
  const handleClose = () => setOpen(false);
>>>>>>> Teams: Add New Team Template UI
=======
>>>>>>> Teams: Code Optimized by making seperate card component

  return (
    <Modal
      open={open}
      onClose={handleClose}
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
      closeAfterTransition
>>>>>>> Teams: Update Team Member
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
<<<<<<< HEAD
        <div className='card-body text-center'>
          <div className='d-flex justify-content-center align-items-center mb-2'>
            {stars.length === 0 ? <span style={{ color: `${colors.primary[200]}`, fontSize: 12 }}>Add reviews here</span>
              : <ReviewStars stars={stars} setStars={setStars} />}
            <AddIcon className='add-button' onClick={() => addReview({ stars, setStars, editable })} />
          </div>
<<<<<<< HEAD
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
>>>>>>> Teams: Add New Team Template UI
=======


          <Input id='title' type='text' placeholder='Your full name' editable={editable}
            fieldstyle='fw-bold fs-4' value={title} setFunction={setTitle} />
=======
>>>>>>> Teams: Code Optimized by making seperate card component

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
>>>>>>> Teams: Update Team Member
        </div>
      </Box>
    </Modal >
  )
}
