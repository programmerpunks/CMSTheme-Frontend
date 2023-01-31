import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/header'
import { Box, useTheme, Typography, Button, TextField } from '@mui/material'
import { tokens } from "../../theme"
import { SaveChanges } from '../../components/button/savechanges'
import { useFetchTemplate } from '../../customHooks/useFetchTemplate'
import { InfoFields } from '../../components/fields/infoFields'
import { SocialMediaMenu } from '../../components/dropdown/socialmedia'
import { GrFacebookOption } from 'react-icons/gr'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { FaYoutube } from 'react-icons/fa'


export const Information = () => {

  const [fetching, setFetching] = useState(false)
  const [template] = useFetchTemplate({ fetching, setFetching })
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [contact, setContact] = useState({ address: '', phone: '', email: '', whatsapp: '' })
  const [social, setSocialLink] = useState([])
  const [error, setError] = useState()
  const [changes, setChanges] = useState(false)
  const [current, setCurrent] = useState({ platform: '', link: '' })
  const platforms = ['Facebook', 'Twitter', 'Instagram', 'Youtube']
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  useEffect(() => {
    if (template.length !== 0) {
      setTitle(template.title)
      setDescription(template.description)
      setContact(template.contact)
      setSocialLink(template.social)
    }

  }, [fetching, template])


  const handleChange = (event, key) => {
    setError()
    setCurrent(current => ({ ...current, [key]: event.target.value }));
  };

  const addLink = () => {
    if (current.link) {
      let duplicate = social.filter(item => item.platform === current.platform)
      if (!duplicate.length) {
        setError()
        setSocialLink([...social, { platform: current.platform, link: current.link }])
        setCurrent({ platform: '', link: '' })
      } else {
        setError(`${current.platform},  link already added`)
      }
    } else {
      setError('The link is required')
    }

  }

  const deleteLink = (key) => {
    setSocialLink(social => social.filter(item => item.platform !== key))
  }

  const Icon = ({ children }) => {
    return (
      <div className='d-flex justify-content-center 
        align-items-center w-20 p-2 bg-secondary rounded-circle m-2'
      >
        {children}
      </div>
    )
  }
  const SocialIcons = () => {
    let socialicons = []
    social.map((item) => {
      if (item.platform === 'instagram')
        socialicons.push(<Icon key={item.platform}><AiOutlineInstagram size={20} color={colors.primary[200]} onClick={() => deleteLink(item.platform)} /></Icon>)
      else if (item.platform === 'facebook')
        socialicons.push(<Icon key={item.platform}><GrFacebookOption size={20} color={colors.primary[200]} onClick={() => deleteLink(item.platform)} /></Icon>)
      else if (item.platform === 'twitter')
        socialicons.push(<Icon key={item.platform}><AiOutlineTwitter size={20} color={colors.primary[200]} onClick={() => deleteLink(item.platform)} /></Icon>)
      else
        socialicons.push(<Icon key={item.platform}><FaYoutube size={20} color={colors.primary[200]} onClick={() => deleteLink(item.platform)} /></Icon>)
      return socialicons;
    })
    return socialicons;
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <Header className='text-center' title="Website Information" subtitle="About the website" />
      <Box width='80%'
        textAlign='left'
        backgroundColor={`${colors.primary[400]} !important`}
        className='info-card p-3 rounded pb-4'>

        <label className='fw-600 font-xsss mb-2'>Title</label>
        <input className='form-control mb-3' value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className='fw-600 font-xsss mb-2'>Descriptions</label>
        <textarea className='form-control mb-3' rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Typography variant="h4" color={colors.grey[100]} sx={{ fontWeight: 'bold', width: '100%', marginLeft: 1, marginTop: 5 }}>
          CONTACT
        </Typography>

        <Box display='flex' flexWrap='wrap'>
          <InfoFields label='Address' type='text' value={contact.address} setContact={setContact} setChanges={setChanges} />
          <InfoFields label='Phone' type='number' value={contact.phone} setContact={setContact} setChanges={setChanges} />
          <InfoFields label='Email' type='email' value={contact.email} setContact={setContact} setChanges={setChanges} />
          <InfoFields label='Whatsapp' type='text' value={contact.whatsapp} setContact={setContact} setChanges={setChanges} />
        </Box>

        <Typography variant="h4" color={colors.grey[100]} sx={{ fontWeight: 'bold', width: '100%', marginLeft: 1, marginTop: 5 }}>
          SOCIAL MEDIA
        </Typography>

        <SocialMediaMenu label='Platform' handleChange={handleChange} value={current.platform} menuitems={platforms} />

        {current.platform &&
          (<>
            <TextField
              required
              id="link-field"

              label="Link" variant="standard" placeholder='Social Media link'
              className='mt-2 w-40' value={current.link} onChange={(e) => handleChange(e, 'link')} />

            <Button variant="outlined" className='outlined-button mt-3 ms-3' onClick={() => addLink()}>Add</Button>
          </>)}
        <p className='text-danger fs-xsss ms-3'>{error}</p>
        {social &&
          <Box className='d-flex m-3'>
            <SocialIcons />
          </Box>
        }
        <SaveChanges title={title} description={description} tid={template._id} contact={contact} social={social} setState={setChanges} />
      </Box >
    </Box >
  )
}
