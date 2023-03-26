import React, { useState } from 'react'
import { Box } from '@mui/material'
import ReactPaginate from 'react-paginate'
import Header from '../components/Header/header'
import { mockDataTeam as users } from '../../dummyData/mockData'

export const Dashboard = () => {
  const usersPerPage = 5
  const [userOffset, setItemOffset] = useState(0)
  const endOffset = userOffset + usersPerPage
  const currentUsers = users.slice(userOffset, endOffset)
  const pageCount = Math.ceil(users.length / usersPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * usersPerPage) % users.length
    setItemOffset(newOffset)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' textAlign='center'>
      <Header className='text-center' title="DASHBOARD" subtitle="List of all users" />
      <Box width='80%'>

        <table class="table table-bordered table-hover">
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
            {currentUsers.map((user, index) => (
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
        // className='d-flex justify-content-center py-4'
        // nextLabel=' >'
        // onPageChange={handlePageClick}
        // pageCount={pageCount}
        // previousLabel='< '
        // pageClassName='d-flex px-1 mx-1'
        // pageLinkClassName='page-link'
        // previousClassName='page-controllers px-2 mx-2'
        // previousLinkClassName='page-link'
        // nextClassName='page-item px-2 mx-2'
        // nextLinkClassName='page-link'
        // breakLabel='...'
        // breakClassName='page-item'
        // breakLinkClassName='page-link'
        // containerClassName='pagination'
        // activeClassName='active bg-gray-500 px-4 mx-1 text-white rounded-sm'
        />
      </Box>
    </Box>
  )
}
