import React, { useState } from 'react'
import { Box } from '@mui/material'
import ReactPaginate from 'react-paginate'
import Header from '../components/Header/header'
import { Box, useTheme } from '@mui/material'
import { useFetchUsers } from '../../customHooks/useFetchUsers'
import { TbDots } from 'react-icons/tb'
import { tokens } from "../../theme";
import moment from "moment";
import { delete_user } from '../../helpers/admin'
import { ConfirmationModal } from '../components/modal/confirmation'

export const Dashboard = () => {
  const [fetch, setFetch] = useState(false)
  const [current, setCurrent] = useState()
  const [users] = useFetchUsers({ fetch })
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
      </Box >

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

