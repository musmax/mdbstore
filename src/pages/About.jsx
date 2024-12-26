import React from 'react'

const About = () => {
  return (
    <div className='product-container flex flex-col gap- justify-between'>
      <div className='grid col-2 gap-3'>
        <div className=''>
          <h1>About</h1>
          <p>
            This is a simple application that demonstrates how to implement authentication in a React application. The application uses a mock user database stored in the browser's localStorage.
          </p>
        </div>
        <div className=''>
        <img src="public\images\Side Image (1).png" alt="" />
        </div>
      </div>
      <div>
        <img src="public\images\Frame 891.png" alt="" />
      </div>
      <div>
        <img src="public\images\Full services.png" alt="" />
      </div>
      <div>
        <img src="public\images\Frame 890.png" alt="" />
      </div>
      <div>
        <img src="public\images\Frame 891.png" alt="" />
      </div>
    </div>
  )
}

export default About