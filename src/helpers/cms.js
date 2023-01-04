import StarRateIcon from '@mui/icons-material/StarRate';

export const removeStar = ({setStars, key, stars}) => {
  console.log('remove stars')
  let filteredStars = stars.filter(item => item !== key)
  setStars(filteredStars)
}

export const addReview = ({stars, setStars, editable}) => {
  if (stars.length < 5)
    setStars([...stars, {
      component: < StarRateIcon key={stars.length}
        className='review-star fs-5'
        onClick={() => {  removeStar({ setStars, key: stars.length, stars}) }} />,
      id: stars.length
    }])
}

export const ReviewStars = ({stars}) => {
  
  let reviewstars = []
  stars.map((item) => {
    reviewstars.push(item.component)
    return reviewstars
  })
  return reviewstars;
}