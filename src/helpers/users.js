import { loginuser } from '../api/index'
import Cookies from 'js-cookie'

export const signin = async({logindata, setError, setUser }) => {
  let response = await loginuser({logindata})
  if(response.data.error){
    setError(response.data.error)
  }else{
    setUser(response.data.user)
    Cookies.set('token', response.data.token)
    Cookies.set('role', response.data.role)
    setError('')
  }
}

