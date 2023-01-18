import React, { useState, useEffect } from 'react'
import { tokens } from "../../theme"
import './styles/styles.css'
import Header from '../components/Header/header'
import { SaveChanges } from '../components/button/savechanges'
import { Box, TextField, Button, useTheme } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { ConfirmationModal } from '../components/modal/confirmation'
import { useFetchTemplate } from '../../customHooks/useFetchTemplate'

export const Analytics = () => {
  const [fetching, setFetching] = useState(false)
  const [template] = useFetchTemplate({ setFetching })
  const theme = useTheme()
  const [error, setError] = useState()
  const [open, setOpen] = useState(false)
  const colors = tokens(theme.palette.mode)
  const [added, setAdded] = useState(false)
  const [current, setCurrent] = useState({ analytic: '', count: '' })
  const [analytics, settAnalytics] = useState([{ analytic: '', count: '' }])

  useEffect(() => {
    if (template.length !== 0) {
      settAnalytics(template.analytics)
    }
  }, [fetching])

  const handleChange = (event, key) => {
    setError()
    setCurrent(current => ({ ...current, [key]: event.target.value }));
  }

  const addAnalytics = () => {
    if (current.count) {
      let duplicate = analytics.filter(item => item.analytic === current.analytic)
      if (!duplicate.length) {
        setError()
        const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        settAnalytics([...analytics, { id, analytic: current.analytic, count: current.count }])
        setCurrent({ analytic: '', count: '' })
        setAdded(true)
      } else {
        setError(`${current.platform},  link already added`)
      }
    } else {
      setError('The link is required')
    }
  }

  const handleOpen = (item) => {
    setOpen(true)
    setCurrent(item)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center'>
      <Header className='text-center' title="Analytics" subtitle="Website analytics count" />
      <Box width='80%'
        textAlign='left'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>
        <TextField
          required
          id="link-field"
          label="Analytic" variant="standard" placeholder='Analytic'
          className='m-2 w-50' value={current.analytic} onChange={(e) => handleChange(e, 'analytic')}
          InputLabelProps={{
            shrink: true,
          }} />

        {current.analytic &&
          <>
            <TextField
              required
              id="link-field"
              type="number"
              label="Count" variant="standard" placeholder='Count'
              className='m-2 w-40' value={current.count} onChange={(e) => handleChange(e, 'count')}
            />
            <Button variant="contained" className='outlined-button mt-3 ms-3' onClick={() => addAnalytics()}>Add</Button>
          </>
        }
        <p className='text-danger fs-xsss ms-3'>{error}</p>

        <Box display='flex' alignItems='center'>

          {analytics.map((item, index) => (
            <div className='d-flex flex-column justify-content-center align-items-center m-2'>
              <div
                style={{ backgroundColor: colors.primary[300] }}
                className='d-flex analytics rounded-circle text-center align-items-center justify-content-center'>
                <p className='fw-bold fs-3 mt-4'>{item.count}</p>
                <div className="overlay2">
                  <DeleteOutlineIcon
                    className='delete-button'
                    onClick={() => handleOpen(item)} />
                </div>
              </div>

              <p className='fw-bold mt-2 text-secondary text-uppercase'>{item.analytic}</p>
            </div>
          ))}
        </Box>

        {added && <SaveChanges analytics={analytics} state={added} setState={setAdded} />}
      </Box>

      {open &&
        <ConfirmationModal
          content='analytics'
          open={open}
          colors={colors}
          setOpen={setOpen}
          current={current}
          analytics={analytics}
          setCurrent={setCurrent}
          setAnalytics={settAnalytics}
        />}
    </Box>
  )
}

