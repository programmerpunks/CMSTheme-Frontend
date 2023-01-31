import 'antd/dist/antd.css'
import { message } from 'antd'
import { fetchusers, register, deleteuser} from '../api/index'

export const register_user = async ({formData, setError }) =>{
  try{
    let response = await register({formData})
    if(!response.data.success){
      setError(response.data.error)
      message.error( response.data.error)
      
    }else{
      setError('')
      message.success('User Created')
    }
  }catch(err){
    console.log(err.message)
  }
}

export const get_users = async ({setUsers}) =>{
  try{
    let response = await fetchusers()
    if(!response.data.success){
      message.error( response.data.error)
    }else{
      setUsers(response.data.users)
    }
  }catch(err){
    console.log(err.message)
  }
}

export const delete_user = async ({uid, setFetch, fetch, setOpen}) =>{
  try{
    let response = await deleteuser(uid)
    if(!response.data.success){
      message.error( response.data.error)
    }else{
      setFetch(!fetch)
      setOpen(false)
      message.success('User Deleted')
    }
  }catch(err){
    console.log(err.message)
  }
}
