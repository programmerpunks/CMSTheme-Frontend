import React, { useState } from 'react'
import moment from "moment"
import { TbDots } from 'react-icons/tb'
import { tokens } from "../../theme"
import { Box, useTheme } from '@mui/material'
import Header from '../../components/Header/header'
import { useFetchUsers } from '../../customHooks/useFetchUsers'
import { ConfirmationModal } from '../../components/modal/confirmation'

export const Dashboard = () => {
  const [fetch, setFetch] = useState(false)
  const [current, setCurrent] = useState()
  const users = useFetchUsers({ fetch })
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [open, setOpen] = useState(false);

  const handleOpen = (uid) => {
    setOpen(true)
    setCurrent(uid)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <Header className='text-center' title="DASHBOARD" subtitle="List of all users" />
      <Box width='80%'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col" colspan='2'>Email</th>
              <th scope="col" colspan='2'>Contact</th>
              <th scope="col" colspan='2'>Created_at</th>
              <th scope="col" colspan='2'></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className='table-row-hover'>
                {user.firstname !== 'Admin' && (
                  <>
                    <th scope="col">{index + 1}</th>
                    <th scope="col">{user.firstname}</th>
                    <th scope="col">{user.lastname}</th>
                    <th scope="col" colspan='2'>{user.email}</th>
                    <th scope="col" colspan='2'>{user.contact}</th>
                    <th scope="col" colspan='2'>{moment(user.createdAt).format('MMMM d, YYYY')}</th>
                    <th scope="col">
                      <div className="dropdown">
                        <TbDots type="button" id="tweetsOptionDropDown" data-bs-toggle="dropdown" aria-expanded="false" />
                        <ul className="dropdown-menu icon" aria-labelledby="tweetsOptionDropDown">
                          <li
                            onClick={() => handleOpen(user._id)}
                          ><span className='mx-3 fw-normal text-danger'>Delete</span></li>
                        </ul>
                      </div></th>
                  </>
                )}

              </tr>
            ))}

          </tbody>
        </table>
      </Box>
      {open &&
        <ConfirmationModal
          content='user'
          open={open}
          colors={colors}
          fetch={fetch}
          setFetch={setFetch}
          setOpen={setOpen}
          current={current}
          setCurrent={setCurrent}
        />}
    </Box >
  )
}