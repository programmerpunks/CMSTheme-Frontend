import React, { useContext } from 'react'
import { Box, Button } from '@mui/material'
import { save } from '../../../helpers/cms';
import AuthContext from '../../../context/auth';

export const SaveChanges = (props) => {
  const { check, setCheck } = useContext(AuthContext)

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
}
