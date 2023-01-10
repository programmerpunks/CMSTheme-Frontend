import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css'
import './styles/styles.css'
import { message } from 'antd'
import { tokens } from "../../theme"
import { ClipLoader } from 'react-spinners'
import AuthContext from '../../context/auth'
import { uploadImage } from '../../helpers/cms'
import Header from '../components/Header/header'
import { TeamCard } from '../components/card/team'
import { Box, useTheme, Button } from '@mui/material'
import { MemberModal } from '../components/modal/member'
import { SaveChanges } from '../components/button/savechanges'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { ConfirmationModal } from '../components/modal/confirmation'
import { useFetchTemplate } from '../../customHooks/useFetchTemplate'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export const Team = () => {
  const [fetching, setFetching] = useState(false)
  const [template] = useFetchTemplate({ setFetching })
  const [open, setOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
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
                    <DeleteOutlineOutlinedIcon className='edit-button icon' onClick={() => {
                      setDeleteModal(!deleteModal)
                      setSelected(team[index])
                    }} />
                  </div>}

                <TeamCard member={team[index]} title={item.title} setTitle={setTitle}
                  profileImage={profileImage} setProfileImg={setProfileImg}
                  designation={item.designation} setDesignation={setDesignation}
                  experience={item.experience} setExperience={setExperience}
                  stars={stars} setStars={setStars} editable={editable}
                  colors={colors} />
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

      {open &&
        members.length !== 0 &&
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
        </div>
      }

      {
        open &&
        <MemberModal
          open={open}
          stars={stars}
          title={title}
          team={team}
          colors={colors}
          member={selected}
          setOpen={setOpen}
          setTeam={setTeam}
          setStars={setStars}
          setTitle={setTitle}
          experience={experience}
          designation={designation}
          setMember={setSelected}
          profileImage={profileImage}
          setProfileImg={setProfileImg}
          setExperience={setExperience}
          setDesignation={setDesignation}
        />}

      {uploaded && (
        <>
          <SaveChanges team={team} setState={setUploaded} state={uploaded} />
        </>
      )}

      {deleteModal &&
        <ConfirmationModal
          content='team'
          team={team}
          colors={colors}
          setTeam={setTeam}
          open={deleteModal}
          current={selected}
          setMembers={setMembers}
          setOpen={setDeleteModal}
          setCurrent={setSelected}
        />}
    </Box >
  )
}
