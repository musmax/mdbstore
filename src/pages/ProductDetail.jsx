import React, { useState } from 'react'
import Rating from '../components/Rating'
import ColorCircle from '../components/ColorCircle'

const ProductDetail = () => {
  const [counter, setCounter] = useState(0);

  const [likedColor, setLikedColor] = useState('black');

  function toggleLikedColor() {
    setLikedColor((prevColor) => (prevColor === 'black' ? 'red' : 'black'));
  }

  function determineCounter(determinant) {
    if (determinant == 'increase') {
      setCounter(counter + 1);
    }
    if (determinant == 'decrease') {
      setCounter(counter - 1);
      if  (counter <= 0) {
        setCounter(0);
      }
    }
  }
  return (
    <div className='flex gap-16 product-container'>
      <div className='flex gap-3'>
      <div className="grid grid-rows-4 gap-2 justify-items-center">
          <div>
            <img src="public/images/Frame 895.png" alt="product image" />
          </div>
          <div>
            <img src="public/images/Frame 896.png" alt="product image" />
          </div>
          <div>
            <img src="public/images/Frame 897.png" alt="product image" />
          </div>
          <div>
            <img src="public/images/Frame 919.png" alt="product image" />
          </div>
        </div>
        <div className='grid'>
        <img src="public\images\Frame 894.png" alt="product image" />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
          <p>Havit HV-G92 Game Pad</p>
          <div className='flex gap-3'>
            <p><Rating rate={4} />
            </p>
            <p>
            (150 Reviews) | In-stock
            </p>
          </div>
          <p>₦ 3,000</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dignissimos
          </p>
          <p className='w-52 text-gray-400'>-</p>
          <div className='flex items-center gap-3'>
            colors: <ColorCircle colorArray={['red','yellow']}/>
          </div>
          <div className='flex gap-3'>
            <p>Size:</p>
            <ul className='flex gap-3'>
              <li>XS</li>
              <li>S</li>
              <li>M</li>
              <li>L</li>
              <li>XL</li>
            </ul>
          </div>
          <div className='flex gap-10'>
          <div className='flex gap-1'>
          <button className='bg-red-500 rounded text-white px-4' onClick={() => determineCounter('decrease')}>-</button>
            <p className='border rounded p-3'>{counter}</p>
            <button className='bg-red-500 rounded text-white px-4' onClick={() => determineCounter('increase')}>+</button>
          </div>
          <div>
            <button className='border p-4 bg-red-500 rounded text-white'>Buy Now</button>
          </div>
          <div>
  <button>
    <i
      className={`fa fa-heart border rounded bg-black-600 p-5 ${
        likedColor === 'black' ? 'text-black-300' : 'text-green-300'
      }`}
      aria-hidden="true"
      onClick={toggleLikedColor}
    ></i>
  </button>
</div>


          </div>
          <div>
          <img src="public\images\Frame 911.png" alt="product image" />
          </div>
      </div>
    </div>
  )
}

export default ProductDetail