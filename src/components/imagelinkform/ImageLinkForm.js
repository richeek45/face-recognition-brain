import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div className="f4">
      <p>{'This Magic Brain will detect faces in your picture.Give this a go.'}</p>
      <div className='center'>
        <div className="form pa3 br3 shadow-5 center">
          <input className='w-70 f5 pa2' type='text' onChange={onInputChange}/>
          <button 
          className='w-30 grow f5 link ph3 pv2 dib white bg-light-purple'
          onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;