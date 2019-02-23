import React from 'react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  if (notification.type==='notification') {
    const style = {
      color: 'green',
      fontStyle: 'italic',
      fontSize:'16px',
      border:'dotted',
      margin:'10px'
    }
    return (
      <div style={style} className='notification'>
        {notification.message}
      </div>
    )
  } else {
    const style = {
      color: 'red',
      fontStyle: 'italic',
      fontSize:'16px',
      border:'dotted',
      margin:'10px'
    }
    return (
      <div style={style} className='error'>
        {notification.message}
      </div>
    )
  }
}

export default Notification