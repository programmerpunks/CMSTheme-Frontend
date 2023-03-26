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
  const [users, loading] = useFetchUsers({ check })
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [open, setOpen] = useState(false);

  const handleOpen = (uid) => {
    setOpen(true)
    setSelectedUser(uid)
  }
  const handleClose = () => setOpen(false);

  const deleteUser = async () => {
    console.log('delete ')
    await delete_user({ uid: selectedUser, setCheck, check, setOpen })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: colors.primary[700],
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <Header className='text-center' title="DASHBOARD" subtitle="List of all users" />
      <Box width='80%'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>
        <table class="table table-bordered">
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
            {currentUsers.map((user, index) => (
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
                          <li className="delete-button"
                            onClick={() => handleOpen(user._id)}
                          ><span className='mx-3 fw-normal'>Delete</span></li>
                        </ul>
                      </div></th>
                  </>
                )}

              </tr>
            ))}

          </tbody>
        </table>
        <ReactPaginate
          className='d-flex justify-content-center py-4'
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={usersPerPage}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName='d-flex px-1 mx-1'
          breakClassName='page-item'
          pageLinkClassName='page-links bg-light p-2 px-3 rounded-circle'
          previousClassName='page-controllers p-2 px-3 mx-2 rounded-circle'
          nextClassName='page-controllers p-2 px-3 mx-2 rounded-circle'
          renderOnZeroPageCount={null}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" color="white">
            Are you sure you want to delete?
          </Typography>
          <Box display='flex' justifyContent='center' className='m-3'>
            <button className='btn btn-outline-primary mx-2'
              onClick={() => handleClose()}>
              Cancel
            </button>
            <button className='btn btn-primary mx-2'
              onClick={() => deleteUser()}>
              Delete
            </button>
          </Box>


        </Box>
      </Modal >
    </Box >
  )
}
