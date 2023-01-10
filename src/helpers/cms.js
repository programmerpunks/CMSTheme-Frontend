import StarRateIcon from '@mui/icons-material/StarRate';
<<<<<<< HEAD
import 'antd/dist/antd.css'
import { message } from 'antd';
import { applycms } from '../api';

export const save = async (props) => {
  let response = await applycms({ data: props })
  if (!response.data.success) {
    message.error(response.data.error)
  } else {
    props.setCheck(!props.check)
    message.success('Changes Saved')
    props.setState(!props.state)
  }
}

export const removeStar = ({setStars, key, stars}) => {
  let filteredStars = stars.filter(item => item.id !== key)
=======

export const removeStar = ({setStars, key, stars}) => {
  console.log('remove stars')
  let filteredStars = stars.filter(item => item !== key)
>>>>>>> Teams: Add New Team Template UI
  setStars(filteredStars)
}

export const addReview = ({stars, setStars, editable}) => {
  if (stars.length < 5)
    setStars([...stars, {
<<<<<<< HEAD
=======
      component: < StarRateIcon key={stars.length}
        className='review-star fs-5'
        onClick={() => {  removeStar({ setStars, key: stars.length, stars}) }} />,
>>>>>>> Teams: Add New Team Template UI
      id: stars.length
    }])
}

<<<<<<< HEAD
export const ReviewStars = ({setStars, stars}) => {

  let reviewstars = []
  stars.map((item, index) => {
    return reviewstars.push( < StarRateIcon key={item.id}
      className='review-star fs-5'
      onClick={() => {  removeStar({ setStars, key: item.id, stars}) }} />)
  })
  return reviewstars;
}


const addNewMember = ({image, team, setTeam, title, designation, stars, setEditable, editable, setProcess, setLoading, experience, setUploaded, check, setCheck}) => {
  setEditable(!editable)
  const id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  let data = { id, title, designation, stars, image, experience } 
  setTeam([...team, data])
  setProcess(0)
  setUploaded(true)
  setLoading(false)
}

export const uploadImage = async (props) => {
  props.setLoading(true)
  props.setUploaded(false)
  if(props.profileImage){
    const data = new FormData()
    data.append("file", props.profileImage)
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_FOLDER)
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
    await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        props.image = data.url
        addNewMember(props)
      })
      .catch(err => console.log('err:', err.message))
  }

}

export const delete_member = async ({team,setTeam, setMembers, id, setOpen}) => {
  let filteredMembers = team.filter(member => member.id!==id)
  let response = await applycms({ data: { team: filteredMembers } })

  if (!response.data.success) {
    message.error(response.data.error)
  } else {
    setTeam(response.data.template.team)
    setMembers(response.data.template.team)
    setOpen(false)
    message.success('Deleted')
  }
}

export const delete_analytic = async ({ analytics, setAnalytics, id, setOpen, setCurrent }) => {

  let filteredAnalytics = analytics.filter(item => item.id!==id)

  let response = await applycms({ data: { analytics: filteredAnalytics } })
  if (!response.data.success) {
    message.error(response.data.error)
  } else {
    
    setAnalytics(response.data.template.analytics)
    setOpen(false)
    setCurrent({ analytic: '', count: '' })
    message.success('Deleted')
  }
}
=======
export const ReviewStars = ({stars}) => {
  
  let reviewstars = []
  stars.map((item) => {
    reviewstars.push(item.component)
    return reviewstars
  })
  return reviewstars;
}
>>>>>>> Teams: Add New Team Template UI
