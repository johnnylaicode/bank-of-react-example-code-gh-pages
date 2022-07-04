// src/components/Credits.js
import React from 'react';
import {Link} from 'react-router-dom';

const Credits = (props) => {
  console.log("credit ", props)
  return (
    <div>
      <h1>Credits</h1>

      <Link to="/">Return to Home</Link>
    </div>
  )
}

export default Credits;