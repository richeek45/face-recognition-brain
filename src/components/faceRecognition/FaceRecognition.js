import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='center'>
      <div className='absolute mt2'>
        <img id='input_image' alt='' src={imageUrl}
        width='500px' height='auto' />
        <div className='bounding-box' 
        style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
        </div>
      </div>
    </div>
  )
}
// https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg

export default FaceRecognition;