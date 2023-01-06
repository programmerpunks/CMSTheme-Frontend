import React, { useEffect, useState } from 'react'
import Header from '../components/Header/header'
import { Box, useTheme } from '@mui/material'
import { SaveChanges } from '../components/button/savechanges'
import { useFetchTemplate } from '../../customHooks/useFetchTemplate'
import { tokens } from "../../theme"
import { BsCheck } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'
import { ConfirmationModal } from '../components/modal/confirmation'
import { uploadImage } from '../../helpers/users'
import './styles/styles.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Images = () => {

  const [fetching, setFetching] = useState(false)
  const [open, setOpen] = useState(false)
  const [template] = useFetchTemplate({ fetching, setFetching })
  const [cloudinaryImages, setCloudinaryImages] = useState([])
  const [storedImages, setStoredImages] = useState([])
  const [displayImages, setDisplayImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploaded, setImgUploaded] = useState(null)
  const [current, setCurrent] = useState()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  useEffect(() => {
    setDisplayImages([])
    setCloudinaryImages([])
    setStoredImages(template.length !== 0 ? template.images : [])
  }, [fetching, template])


  const handleOpen = (image) => {
    setOpen(true)
    setCurrent(image)
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
      flexDirection='column' textAlign='center' >
      <Header className='text-center' title="Carousel Images" subtitle="Website images" />
      <Box width='80%'
        textAlign='left'
        backgroundColor={`${colors.primary[400]} !important`}
        className='p-3 rounded'>

        <input id="file-input" accept="image/png, image/jpg, image/gif, image/jpeg"
          type="file" multiple onChange={(e) => {
            setImgUploaded(false)
            setCloudinaryImages(e.target.files)
            setDisplayImages(e.target.files)
          }} />
        {cloudinaryImages.length !== 0 && (
          <>
            <div className='images-details'>
              <p>{cloudinaryImages.length} images attached</p>
              <div className='loader'>

                {loading ?
                  (<div className='loader mt-2'><ClipLoader size={20} color='#50b7f5' /></div>)
                  :
                  uploaded ? <BsCheck size={40} color='green' />
                    :
                    <button className='btn btn-success'
                      onClick={() => uploadImage({ cloudinaryImages, setCloudinaryImages, setLoading, setImgUploaded, storedImages })}>Upload</button>
                }
              </div>
            </div>
          </>
        )}
        <Box className='template-images mt-4'>
          {storedImages.length !== 0 && storedImages.map((image, index) =>
          (
            <>
              <div className='image-container' key={image}>
                <img src={image} className='image m-4' alt='template' />
                <div class="overlay">
                  <DeleteOutlineIcon
                    className='delete-button'
                    onClick={() => handleOpen(index)} />
                </div>
              </div>

            </>
          ))
          }
          {displayImages.length !== 0 && Object.entries(displayImages).map((image) =>
          (
            <img
              src={URL.createObjectURL(image[1])}
              alt='template'
              className='image m-4' style={{ opacity: uploaded ? 1 : 0.1 }} />
          ))
          }
        </Box>

        {uploaded && (
          <>
            <SaveChanges images={cloudinaryImages} storedImages={storedImages} />
          </>
        )}
      </Box>

      {open &&
        <ConfirmationModal
          content='image'
          open={open}
          colors={colors}
          setOpen={setOpen}
          current={current}
          setCurrent={setCurrent}
        />}
    </Box>
  )
}