import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa4"> <img style={{padding: '5px'}} alt="logo" src={brain} /> </div>
      </Tilt>
      {/* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
       from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
       
    </div>
  )
}

export default Logo;