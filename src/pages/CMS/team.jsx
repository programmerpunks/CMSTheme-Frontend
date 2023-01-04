<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css'
import './styles/styles.css'
import { message } from 'antd'
import { tokens } from "../../theme"
import { ClipLoader } from 'react-spinners'
<<<<<<< HEAD
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
=======
import React, { useState } from 'react'
=======
import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css'
>>>>>>> Teams: New Team members added and displayed
import './styles/styles.css'
import { message } from 'antd'
import { tokens } from "../../theme"
import { ClipLoader } from 'react-spinners'
import AddIcon from '@mui/icons-material/Add'
import Header from '../components/Header/header'
=======
>>>>>>> Teams: Code Optimized by making seperate card component
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
<<<<<<< HEAD
=======
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
>>>>>>> Teams: Add New Team Template UI
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
<<<<<<< HEAD
>>>>>>> Teams: Add New Team Template UI
=======
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
>>>>>>> Teams: New Team members added and displayed
=======
>>>>>>> Teams: Add New Team Template UI
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
      {members.length !== 0 &&
=======
      {!fetching &&
>>>>>>> Teams: New Team members added and displayed
=======
      {!fetching ?
>>>>>>> Teams: Delete Members
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

<<<<<<< HEAD
      {
        open &&
>>>>>>> Teams: Add New Team Template UI
=======
      {open &&
>>>>>>> Teams: Code Optimized by making seperate card component
=======
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
>>>>>>> Teams: Add New Team Template UI
        <MemberModal
          open={open}
          stars={stars}
          title={title}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          team={team}
          colors={colors}
          member={selected}
<<<<<<< HEAD
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
=======
=======
          team={team}
>>>>>>> Teams: Update Team Member
          colors={colors}
          editable={true}
=======
>>>>>>> Teams: Code Optimized by making seperate card component
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
<<<<<<< HEAD
        />
      }
<<<<<<< HEAD
>>>>>>> Teams: Add New Team Template UI
=======
=======
        />}
>>>>>>> Teams: Code Optimized by making seperate card component

<<<<<<< HEAD
      {
        uploaded && (
          <>
            <SaveChanges team={team} />
          </>
        )
      }
>>>>>>> Teams: New Team members added and displayed
=======
      {uploaded && (
        <>
          <SaveChanges team={team} setState={setUploaded} state={uploaded} />
        </>
      )}
<<<<<<< HEAD
>>>>>>> Teams: Delete Members
=======

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
>>>>>>> Teams: Code Optimized by making seperate card component
=======
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
>>>>>>> Teams: Add New Team Template UI
    </Box >
  )
}
