import React from 'react';
import Animation from '../Animation/Animation1'


const Loader = ({isLoading}) => {
  if(!isLoading) return null;
  return (
    <div id="loader" className="d-flex justify-content-center align-items-center flex-column">
      {/* <img src="https://react-pdf.org/images/logo.png" alt="loader" className="mb-5 App-logo" /> */}
      <div  style={{width:'30%'}}>
        <Animation />
      </div>
      {/* <p>Loading...</p> */}
    </div>
  )
}

export default Loader
