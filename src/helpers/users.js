import Cookies from 'js-cookie'
import { message } from 'antd'
import { deleteimage, fetchtemplate, loginuser } from '../api/index'

export const signin = async({logindata, setError }) => {
  let response = await loginuser({logindata})
  if(!response.data.success){
    setError(response.data.error)
  }else{
    Cookies.set('token', response.data.token)
    Cookies.set('role', response.data.role)
    setError('')
  }
}

export const get_template = async({setTemplate, setFetching }) => {
  let response = await fetchtemplate()
  if(!response.data.success){
     message.error(response.data.error)
  }else{
    setTemplate(response.data.template[0])
  }
  setFetching(false)

}

export const uploadImage = ({ cloudinaryImages, setCloudinaryImages, setLoading, setImgUploaded }) => {
  
  let templateImages = []
  if (cloudinaryImages.length !== 0) {
    setLoading(true)
    Object.entries(cloudinaryImages).map(async (item) => {
      const data = new FormData()
      data.append("file", item[1])
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_FOLDER)
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
      await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data
      })
        .then(resp => resp.json())
        .then(data => {
          templateImages.push(data.url)
          setCloudinaryImages(templateImages)
        })
        .catch(err => console.log('err:', err.message))
    })
    setTimeout(() => {
      setLoading(false)
      setImgUploaded(true)
    }, 5000);
  }
}

export const delete_image = async({ image, setCurrent,  check, setCheck, setOpen }) => {
  try{
    let response = await deleteimage({image})
  if(!response.data.success){
    message.error(response.data.error)
  }else{
    setCurrent()
    setCheck(!check)
    setOpen(false)
    message.success('Deleted')
  }
  }catch(err){
    console.log(err.message)
  }
}
