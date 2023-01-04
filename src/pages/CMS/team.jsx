import React, { useState } from 'react'
import './styles/styles.css'
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add'
import { removeStars, addReview, ReviewStars } from '../../helpers/cms'
import Header from '../components/Header/header'
import { Box, useTheme, Button } from '@mui/material';
import { MemberModal } from '../components/modal/member';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SaveChanges } from '../components/button/savechanges'

export const Team = () => {
  const [title, setTitle] = useState()
  const [open, setOpen] = useState(false)
  const [designation, setDesignation] = useState()
  const [profileImage, setProfileImg] = useState()
  const [editable, setEditable] = useState(false)
  const [stars, setStars] = useState([])
  const [members, setMembers] = useState([])
  const [teams, setTeams] = useState([])
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)


  const handleOpen = (index) => {
    setOpen(true)
    setTitle(teams[index].title)
    setDesignation(teams[index].designation)
    setStars(teams[index].stars)
  }

  const addMemberTemplate = () => {
    setEditable(!editable)
    setMembers([...members, {
      id: members.length,
      editable: true
    }])
  }
  console.log('teams yet: ', teams)

  const addNewMember = () => {
    setEditable(!editable)
    let data = { title, designation, stars }
    setTeams([...teams, data])
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <div className='d-flex w-100'>
        <div className='col-md-3 col-sm-0'>
        </div>
        <div className='col-md-6 col-sm-6'>
          <Header className='text-center' title="Your Team" subtitle="Team Members" />
        </div>

        <div className='col-md-3 col-sm-6'>
          <Button
            type="submit"
            color="success"
            variant="contained"
            onClick={() => addMemberTemplate()}
          >
            Add Memeber
          </Button>
        </div>
      </div>

      {members.length !== 0 &&
        <div className=' d-flex flex-wrap row w-100 p-3'>
          {members.map((item, index) => (
            <div className='col-md-4 col-sm-12 col-xs-12 mt-4'>
              <div className='team-card p-4'
                backgroundColor={`${colors.primary[400]} !important`}>
                <EditOutlinedIcon className='edit-button' onClick={() => handleOpen(index)} />
                <div className="card-image d-flex justify-content-center align-items-center ms-8">
                  <label htmlFor="file-input">
                    <AddIcon size='80' color={`${colors.grey[100]}`} className='img-upload-button' />
                  </label>
                  <input type={editable ? 'file' : ''}
                    id="file-input" className="form-control-file"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    onChange={(e) => setProfileImg(e.target.files[0])} />
                </div>
                <div className='card-body text-center'>
                  {console.log('index: ', teams[index] ? 'tt' : 'dd')}
                  <div className='d-flex justify-content-center align-items-center mb-2'>
                    {(teams[index] ? teams[index].stars.length === 0 : stars.length === 0) ? <span style={{ color: `${colors.primary[200]}`, fontSize: 12 }}>Add reviews here</span>
                      : <ReviewStars stars={teams[index] ? teams[index].stars : stars} />}
                    {editable && <AddIcon className='add-button' onClick={() => addReview({ setStars, stars, editable })} />}
                  </div>
                  <input id='title' placeholder='Your full name'
                    className='form-control team-details fw-bold fs-4'
                    value={item.title} style={{ borderWidth: editable ? 1 : 0 }} readOnly={!editable}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input id='designation' placeholder='Your designation'
                    className='form-control team-details mb-2 fs-6'
                    value={item.designation} style={{ borderWidth: editable ? 1 : 0 }} readOnly={!editable}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
                {editable && <button className='btn btn-success' onClick={() => addNewMember()}>Add</button>}

              </div>
            </div>
          ))}
        </div>}

      {
        open &&
        <MemberModal
          open={open}
          stars={stars}
          title={title}
          colors={colors}
          setOpen={setOpen}
          setStars={setStars}
          setTitle={setTitle}
          designation={designation}
          profileImage={profileImage}
          setProfileImg={setProfileImg}
          setDesignation={setDesignation}
        />
      }
    </Box >
  )
}
