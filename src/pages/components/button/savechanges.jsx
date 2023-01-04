import React, { useContext } from 'react'
import { Box, Button } from '@mui/material'
import { applycms } from '../../../api'
import 'antd/dist/antd.css'
import { message } from 'antd';
import AuthContext from '../../../context/auth';

export const SaveChanges = (props) => {
  const { check, setCheck } = useContext(AuthContext)

  const save = async () => {
    console.log('props: ', props)
    let response = await applycms({ data: props })
    if (!response.data.success) {
      message.error(response.data.error)
    } else {
      setCheck(!check)
      message.success('Changes Saved')
    }
  }
  return (
    <Box display='flex' justifyContent='flex-end' marginTop='20px'>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => save()}
      >
        Save Changes
      </Button>
    </Box>
  )
}
