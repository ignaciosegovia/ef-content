import React, { useState } from 'react'
import chevron from '../assets/chevron.svg'

const Dropdown = props => {
  const [open, setOpen] = useState(false)

  const containerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      width: '97%',
      paddingLeft: '1%'
  };

  let chevronStyle = {
    width: '7px'
  }

  if (open) {
    chevronStyle = {
        width: '7px',
        transform: 'rotate(90deg)'
    }
  }

  return (
    <div>
      <div onClick={() => setOpen(!open)} style={containerStyle}>
        <p style={{color: '#2CCD79', fontWeight: 'bold'}}>{props.title}</p>
        <img src={chevron} style={chevronStyle} alt="Show More" />
      </div>
      {open && props.children}
    </div>
  )
}

export default Dropdown
