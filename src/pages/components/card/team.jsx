import React from 'react'
import { Input } from '../fields/input'
import { addReview, ReviewStars } from '../../../helpers/cms'
import AddIcon from '@mui/icons-material/Add'

export const TeamCard = (props) => {

  let {
    profileImage, setProfileImg,
    member, stars, setStars, editable,
    title, setTitle, designation, setDesignation,
    experience, setExperience, colors } = props

<<<<<<< HEAD
=======
  console.log('tt: ', editable)
  console.log('tt: ', editable)
  console.log('tt: ', editable)


>>>>>>> Teams: Code Optimized by making seperate card component
  return <>
    <div className={`card-image ${profileImage && 'bg-transparent'} 
                      d-flex justify-content-center align-items-center ms-8`}>
      <label htmlFor="file-input">
        {member ? <img src={member.image} className='profile-image bg-transparent' alt='' />
          : profileImage ?
            <img className='profile-image bg-transparent opacity-25' alt=''
              src={URL.createObjectURL(member ? member.image : profileImage)} />
            :
            <AddIcon size='80' color={`${colors.grey[100]}`} className='img-upload-button' />
        }
      </label>

      <input type={editable ? 'file' : ''}
        id="file-input" className="form-control-file"
        accept="image/png, image/jpg, image/gif, image/jpeg"
        onChange={(e) => setProfileImg(e.target.files[0])} />
    </div>


    <div className='card-body text-center'>

      <div className='d-flex justify-content-center align-items-center mb-2'>
        {(member ? member.stars.length === 0 : stars.length === 0) ?
          <span style={{ color: `${colors.primary[200]}`, fontSize: 12 }}>Add reviews here</span>
          : <ReviewStars setStars={setStars} stars={member ? member.stars : stars} />}
        {!member && <AddIcon className='add-button' onClick={() => addReview({ setStars, stars, editable })} />}
      </div>

      <Input id='title' type='text' placeholder='Your full name' editable={editable}
        fieldstyle='fw-bold fs-4' value={title} setFunction={setTitle} />

      <Input id='designation' type='text' placeholder='Your Designation' editable={editable}
        fieldstyle='fs-xss' value={designation} setFunction={setDesignation} />

      <div className='d-flex justify-content-center'>
        <Input id='experience' type='number' placeholder='Years of experience' editable={editable}
          fieldstyle='fw-bold mb-2 fs-6 mns-7' value={experience} setFunction={setExperience} />
        {member && <p className='mt-2 fw-bold ps-3'> years</p>}
      </div>

    </div>
  </>
}
