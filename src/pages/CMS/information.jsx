import React, { useEffect, useState } from 'react'
import Header from '../components/Header/header'
import { Box, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import { SaveChanges } from '../components/button/savechanges'
import { useFetchTemplate } from '../../customHooks/useFetchTemplate'


export const Information = () => {

  const [fetching, setFetching] = useState(false)
  const [template] = useFetchTemplate({ fetching, setFetching })
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()


  useEffect(() => {
    setTitle(template.title)
    setDescription(template.description)
  }, [fetching])

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <Header className='text-center' title="Website Information" subtitle="About the website" />
      <Box width='80%'
        textAlign='left'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>

        <label className='fw-600 font-xsss mb-2'>Title</label>
        <input className='form-control fw-600 font-xsss mb-2' value={title} onChange={(e) => setTitle(e.target.value)} />

        <Box>
          <div className='d-flex justify-content-between'>
            <label className='fw-600 font-xsss mb-2'>Descriptions</label>
            {/* <AddOutlinedIcon onClick={() => add_descriptions()} /> */}
          </div>
          <textarea className='form-control mb-3' rows="6" value={description} onChange={(e) => setDescription(e.target.value)} />
          {/* <DescriptionTabs /> */}
        </Box>
        <SaveChanges title={title} description={description} tid={template._id} />
      </Box>
    </Box >
  )
}
