import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css'
import './styles/styles.css'
import { message } from 'antd'
import { tokens } from "../../theme"
import { ClipLoader } from 'react-spinners'
import AddIcon from '@mui/icons-material/Add'
import Header from '../components/Header/header'
import AuthContext from '../../context/auth'
import { Input } from '../components/fields/input'
import { Box, useTheme, Button } from '@mui/material'
import { MemberModal } from '../components/modal/member'
import { SaveChanges } from '../components/button/savechanges'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useFetchTemplate } from '../../customHooks/useFetchTemplate'
import { addReview, ReviewStars, uploadImage, deleteMember } from '../../helpers/cms'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export const Team = () => {
  const [fetching, setFetching] = useState(false)
  const [template] = useFetchTemplate({ setFetching })
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState()
  const [experience, setExperience] = useState()
  const [designation, setDesignation] = useState()
  const [profileImage, setProfileImg] = useState()
  const [stars, setStars] = useState([])
  const [team, setTeam] = useState([])
  const [selected, setSelected] = useState()
  const [members, setMembers] = useState([])
  const [uploaded, setUploaded] = useState(null)
  const [process, setProcess] = useState(0)
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  let { check, setCheck } = useContext(AuthContext)

  useEffect(() => {
    if (template.length !== 0) {
      setTeam(template.team)
      setMembers(template.team)
    }
  }, [fetching])

  const handleOpen = (index) => {
    setOpen(true)
    setSelected(team[index])
    setTitle(team[index].title)
    setDesignation(team[index].designation)
    setStars(team[index].stars)
    setExperience(team[index].experience)
    setProfileImg(team[index].image)
  }

  const addMemberTemplate = () => {
    if (process === 0) {
      setProcess(1)
      setEditable(true)
      setMembers([...members, {
        id: members.length,
        editable: true
      }])
    } else {
      message.warning('Add one member at a time')
    }
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

      {!fetching ?
        <div className=' d-flex flex-wrap row w-100 p-3'>
          {members && members.map((item, index) => (
            <div className='col-md-4 col-sm-6 col-xs-6 mt-4'>
              <div className='team-card p-4'
                backgroundColor={`${colors.primary[400]} !important`}>
                {(team[index] && process !== 1) &&
                  <div className='crud-actions w-25'>
                    <EditOutlinedIcon className='edit-button align-self-end' onClick={() => handleOpen(index)} />
                    <DeleteOutlineOutlinedIcon className='edit-button icon' onClick={() => deleteMember({ team, setTeam, setMembers, id: team[index].id })} />
                  </div>}


                <div className={`card-image ${profileImage && 'bg-transparent'} 
                      d-flex justify-content-center align-items-center ms-8`}>
                  <label htmlFor="file-input">
                    {team[index] ? <img src={team[index].image} alt='' className='profile-image bg-transparent' />
                      : profileImage ?
                        <img className='profile-image bg-transparent opacity-25' alt=''
                          src={URL.createObjectURL(team[index] ? team[index].image : profileImage)} />
                        :
                        <AddIcon size='80' color={`${colors.grey[100]}`} className='img-upload-button' />
                    }
                  </label>
                  <input type={editable ? 'file' : ''}
                    id="file-input" className="form-control-file"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    onChange={(e) => setProfileImg(e.target.files[0])} />
                </div>

                <div className='card-body text-center'>

                  <div className='d-flex justify-content-center align-items-center mb-2'>
                    {(team[index] ? team[index].stars.length === 0 : stars.length === 0) ?
                      <span style={{ color: `${colors.primary[200]}`, fontSize: 12 }}>Add reviews here</span>
                      : <ReviewStars setStars={setStars} stars={team[index] ? team[index].stars : stars} />}
                    {!team[index] && <AddIcon className='add-button' onClick={() => addReview({ setStars, stars, editable })} />}
                  </div>
                  <Input id='title' type='text' placeholder='Your full name' editable={editable}
                    fieldstyle='fw-bold fs-4' value={item.title} setFunction={setTitle} />

                  <Input id='designation' type='text' placeholder='Your Designation' editable={editable}
                    fieldstyle='fs-6' value={item.designation} setFunction={setDesignation} />

                  <div className='d-flex'>
                    <Input id='experience' type='number' placeholder='Years of experience' editable={editable}
                      fieldstyle='fw-bold mb-2 mns-3 fs-6' value={item.experience} setFunction={setExperience} />
                    {team[index] && <p className='mt-2 mns-7 fw-bold'> years</p>}
                  </div>

                </div>
                {!team[index] && <button className='btn btn-success w-100'
                  style={{ backgroundColor: colors.greenAccent[600] }}
                  onClick={() => uploadImage({
                    team, setTeam, stars, title, profileImage, designation,
                    editable, setEditable, setProcess, setLoading, experience,
                    setUploaded, check, setCheck
                  })}>
                  {loading ? <ClipLoader color='white' size={20} /> : 'Add'}
                </button>}
              </div>
            </div>
          ))}
        </div>
        : <ClipLoader color='white' />}

      {
        open &&
        <MemberModal
          open={open}
          stars={stars}
          title={title}
          team={team}
          colors={colors}
          editable={true}
          setOpen={setOpen}
          setTeam={setTeam}
          setStars={setStars}
          setTitle={setTitle}
          selected={selected}
          experience={experience}
          designation={designation}
          setSelected={setSelected}
          profileImage={profileImage}
          setProfileImg={setProfileImg}
          setExperience={setExperience}
          setDesignation={setDesignation}
        />
      }

      {uploaded && (
        <>
          <SaveChanges team={team} setUploaded={setUploaded} />
        </>
      )}
    </Box >
  )
}
