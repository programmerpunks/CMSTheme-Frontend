import React, { useState } from 'react'
import Header from '../components/Header/header'
import { Box, useTheme, Modal, Typography } from '@mui/material'
import { useFetchUsers } from '../../customHooks/useFetchUsers'
import { TbDots } from 'react-icons/tb'
import { tokens } from "../../theme";
import moment from "moment";
import { delete_user } from '../../helpers/admin'

export const Dashboard = () => {
  const [check, setCheck] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <Header className='text-center' title="DASHBOARD" subtitle="List of all users" />
      <Box width='80%'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>
      </Box>
    </Box >
  )
}
