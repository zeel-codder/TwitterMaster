import {FaTwitter} from 'react-icons/fa';
import { useEffect ,useRef} from 'react';



function Start_Load() {
  const Load=useRef<HTMLDivElement>(null);


  useEffect(()=>{

  const timer=setTimeout(() :void=>{

    Load.current?.classList.add('remove');


  },1000);
  return ()=>{
    clearTimeout(timer);
  }
  },[])
  return (
    <div className="start-load-container" ref={Load}>
      <div className="flex">
    
      <h1>Twitter</h1>
      
     
      <h1>Master</h1>
  
      </div>
      

      <FaTwitter></FaTwitter>
      

    </div>
  );
}

export default Start_Load;