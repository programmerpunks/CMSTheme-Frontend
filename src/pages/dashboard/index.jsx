import React from 'react'
import { tokens } from "../../theme"
import { Box, useTheme } from '@mui/material'
import Header from '../components/Header/header'

export const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' textAlign='center'>
      <Header className='text-center' title="DASHBOARD" subtitle="List of all users" />
      <Box width='80%'>

        {/* <table class="table table-bordered table-hover">
          <thead>
            <tr>                  
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col" colspan='2'>Email</th>
              <th scope="col" colspan='2'>Contact</th>
              <th scope="col" colspan='2'>Created_at</th>
              <th scope="col" colspan='2'>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className='table-row-hover'>
                <th scope="row">{user.id}</th>
                <th scope="col" colspan='2'>{user.name}</th>
                <th scope="col" colspan='2'>{user.name}</th>
                <th scope="col" colspan='2'>{user.email}</th>
                <th scope="col" colspan='2'>{user.phone}</th>
                <th scope="col" colspan='2'>{user.created_at}</th>
              </tr>
            ))}

          </tbody>
        </table> */}

        <ReactPaginate
          className='flex justify-end py-4'
          nextLabel=' >'
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel='< '
          pageClassName='page-item px-1 mx-1'
          pageLinkClassName='page-link'
          previousClassName='page-item px-2 mx-2'
          previousLinkClassName='page-link'
          nextClassName='page-item px-2 mx-2'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active bg-gray-500 px-4 mx-1 text-white rounded-sm'
        />
      </Box>
    </Box>
  )
}
