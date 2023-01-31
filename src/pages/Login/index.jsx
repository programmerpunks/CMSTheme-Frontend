import React from 'react'
import { Box, useTheme } from '@mui/material'
import { tokens } from "../../theme";
import Header from '../components/Header/header'
import { LoginForm } from '../components/form/login'

export const Login = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' className='mt-5'>
      <Header className='text-center' title="LOGIN" subtitle="" />
      <Box width='50%'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">User</button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Admin</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><LoginForm role='user' /></div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><LoginForm role='admin' /></div>
        </div>
      </Box>

    </Box>
  )
}
