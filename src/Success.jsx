import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css'

function Success() {

  const location = useLocation();
  const navigate = useNavigate();
  const { secret, hint_msg } = location.state || {};


  return (
    <div className="SuccessCont">
      <h1>Success</h1>
      <h2>Secret = {secret}</h2>
      <h2>Hint Message = {hint_msg}</h2>

      <a className='decodeLink' style={{ cursor: "pointer" }} onClick={() => {
        navigate("/")
      }}> to decode the Message click here ...</a>
      {/* https://github.com/RiteshDafale/PortfolioRD */}
    </div>
  )
}

export default Success
