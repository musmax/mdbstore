import React from 'react'


function handleRating(colorArray) {
    const colorDisplay = [];
    for (let i = 0; i < colorArray.length; i++) {
        colorDisplay.push(<i key={i} className={`fa fa-circle text-${colorArray[i]}-400`} aria-hidden="true"></i>);
    }
    return colorDisplay;
  }

const ColorCircle = ({ colorArray}) => {
    const ratings = handleRating(colorArray);
  return (
    <div className="rating flex gap-2">
      {ratings}
    </div>
  )
}

export default ColorCircle


