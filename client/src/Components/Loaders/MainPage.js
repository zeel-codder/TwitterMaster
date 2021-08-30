import React from 'react';
import {FaTwitter} from 'react-icons/fa';
import Slide from 'react-reveal/Slide';
import Bounce from 'react-reveal/Bounce';


function Start_Load() {
  return (
    <div className="start-load-container">
      <div className="flex">
      <Bounce top>
      <h1>Twitter</h1>
      
     
      <h1>Master</h1>
      </Bounce>
      </div>
      <Bounce bottom>

      <FaTwitter></FaTwitter>
      </Bounce>

    </div>
  );
}

export default Start_Load;