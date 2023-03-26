import { Box, useTheme } from '@mui/material'
import Form from '../../components/form/register'
import { tokens } from "../../theme";
import './users.css'

export const NewUser = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className='rounded m-5'
      backgroundColor={colors.primary[700]}
    >
      <div className='middle-sidebar-left'>
        <div className='middle-wrap'>
          <Box backgroundColor={colors.primary[400]}>
            <div className='card-body p-lg-5 p-4 w-100 border-0 '>
              <Form />
            </div>
          </Box>
        </div >
      </div >
    </Box >
  )
}
