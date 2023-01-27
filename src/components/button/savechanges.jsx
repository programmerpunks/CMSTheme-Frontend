import React, { useContext } from 'react'
import { Box, Button } from '@mui/material'
import { save } from '../../helpers/cms';
import AuthContext from '../../context/auth';

export const SaveChanges = (props) => {
  const { check, setCheck } = useContext(AuthContext)
<<<<<<< HEAD
  return <Box display='flex' justifyContent='flex-end' marginTop='20px'>
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      onClick={() => save({ ...props, check, setCheck })}
    >
      Save Changes
    </Button>
  </Box>
=======

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> Teams: Update Team Member
  return (
    <Box display='flex' justifyContent='flex-end' marginTop='20px'>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={() => save({ ...props, check, setCheck })}
      >
        Save Changes
      </Button>
    </Box>
  )
>>>>>>> Teams: Add New Team Template UI
=======
  return <Box display='flex' justifyContent='flex-end' marginTop='20px'>
    <Button
      type="submit"
      color="secondary"
      variant="contained"
      onClick={() => save({ ...props, check, setCheck })}
    >
      Save Changes
    </Button>
  </Box>
>>>>>>> Teams: Code Cleanup
}
