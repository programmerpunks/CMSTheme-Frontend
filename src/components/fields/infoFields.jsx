import React from 'react'
import { TextField } from '@mui/material'

export const InfoFields = ({ type, value, label, setContact, setChanges }) => {

  const handleChange = (e, label) => {
    setContact(contact => ({ ...contact, [label]: e.target.value }))
    setChanges(true)
  }
  return (
    <div className='w-40 m-3'>
      <TextField
        fullWidth
        id="link-field"
        type={type}
        label={label} variant="standard" placeholder='Social Media link'
        value={value} onChange={(e) => handleChange(e, label.toLowerCase())} />
    </div>
  )
}
