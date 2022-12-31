<<<<<<< HEAD
import React, { useState } from 'react'
=======
>>>>>>> Team: Redux persist store for loggedin user
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css'
import { message } from 'antd';
import Cookies from 'js-cookie';
import { loginuser } from '../../../api';
import { useDispatch } from 'react-redux'
import { signIn } from '../../../redux/slices/userSlice';


export const LoginForm = ({ role }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  let navigate = useNavigate()
  let dispatch = useDispatch()

  const login = async () => {
    if (role === 'admin') {
      if (process.env.REACT_APP_ADMIN_EMAIL === email && process.env.REACT_APP_ADMIN_PASSWORD === password) {
        Cookies.set('role', 'admin')
        navigate('/')
      } else {
        message.error('Invalid Credentials')
      }
    } else {
      let response = await loginuser({ email, password })
      if (!response.data.success) {
        setError(response.data.errors[0])
      }
      else if (response.data.success) {
        dispatch(signIn({ user: response.data.user }))
        setError('')
        Cookies.set('token', response.data.token)
        Cookies.set('role', 'user')
        navigate('/')
      }
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='p-3'
    >
      <Box className='m-3'>
        <TextField
          required
          fullWidth
          size='large'
          label="Email"
          type="email"
          value={email}
          popupIndicator={false}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box className='m-3'>
        <TextField
          required
          fullWidth
          size='large'
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <p className='text-danger ms-4'>{error}</p>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => login()}>
          Signin
        </Button>
      </Box>
    </form>
  )
}
