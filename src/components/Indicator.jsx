import React from 'react'

const Indicator = (props) => {
  return (
    <div className='flex gap-3'>
        <div className='bg-red-500 w-4 h-10 border rounded'></div>
        <p className='pt-2 text-lg font-mono'>{props.indicator}</p>
    </div>
  )
}

export default Indicator