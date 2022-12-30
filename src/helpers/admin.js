import { fetchusers, register, deleteuser} from '../api/index';
import 'antd/dist/antd.css'
import { message } from 'antd';

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

export const get_users = async ({setUsers, setLoading}) =>{
  setLoading(true)
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
  finally{
    setLoading(false)
  }
}

export const delete_user = async ({uid, setCheck, check, setOpen}) =>{
  try{
    let response = await deleteuser(uid)
    if(!response.data.success){
      message.error( response.data.error)
    }else{
      setCheck(!check)
      setOpen(false)
      message.success('User Deleted')
    }
  }catch(err){
    console.log(err.message)
  }
}
