import React from 'react'
import {useLocation,useNavigate  } from 'react-router-dom';
import './Success.css'
 
function Success() {

  const location = useLocation();
const navigate = useNavigate();
  const {secret , hint_msg} = location.state;


  return (
    <div className="SuccessCont">
      <h1>Success</h1>
      <h2>Secret = {secret}</h2>
      <h2>Hint Message = {hint_msg}</h2>
         
         <a className='decodeLink' type="button" onClick={()=>{
           navigate("/encryptMessage",{
            state:{
              value:true,
              des:"value from success",
            }
           })         
         }}> to decode the Message click here ...</a>

    </div>
  )
}

export default Success
