import Cookies from 'js-cookie'
import { message } from 'antd'
import { deleteimage, fetchtemplate, loginuser } from '../api/index'

export const signin = async({logindata, setError }) => {
  try{
    let response = await loginuser({logindata})
    if(response.status === 202){
      Cookies.set('token', response.data.token)
      setError('')
    }
  }catch(err){
    message.error(err.response.data.error)
  }
}

export const get_template = async({setTemplate, setFetching }) => {
  try{
  let response = await fetchtemplate()
  if(response.status === 202){
    setTemplate(response.data.template[0])
  }
  }catch(err){
    message.error(err.response.data.error)
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
    if(response.status === 202){
    setCurrent()
    setOpen(false)
    setCheck(!check)
    message.success('Deleted')
    }
  }catch(err){
    console.log('error: ', err.response.data)
    message.error(err.response.data.error)
  }
}
