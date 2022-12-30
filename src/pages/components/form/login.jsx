import React, { useState, useContext } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css'
import { message } from 'antd';
import Cookies from 'js-cookie';
import AuthContext from '../../../context/auth';
import { loginuser } from '../../../api';

export const LoginForm = ({ role }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState('')
  const { setUser } = useContext(AuthContext)
  let navigate = useNavigate()

  const login = async () => {
    if (role === 'admin') {
      console.log('dd: ', role, process.env.REACT_APP_ADMIN_EMAIL)

      if (process.env.REACT_APP_ADMIN_EMAIL === email && process.env.REACT_APP_ADMIN_PASSWORD === password) {
        Cookies.set('role', 'admin')
        navigate('/')
      } else {
        message.error('Invalid Credentials')
      }
    } else {
      let response = await loginuser({ email, password })
      if (response.data.error) {
        setError(response.data.error)
      } else {
        setError('')
        setUser(response.data.user)
        Cookies.set('token', response.data.token)
        Cookies.set('role', response.data.role)
        navigate('/')
      }
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='p-3'
    >
      <div className='form-group m-3'>
        <label className='mont-font fw-600 font-xsss mb-2'>
          Email
        </label>
        <input type='text' className='form-control'
          placeholder='abc@example.com'
          value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className='form-group m-3'>
        <label className='mont-font fw-600 font-xsss mb-2'>
          Password
        </label>
        <input type='password' className='form-control'
          placeholder='Password'
          value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => login()}>
          Signin
        </Button>
      </Box>
    </form>
  )
}
