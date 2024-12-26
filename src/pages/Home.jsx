import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Indicator from '../components/Indicator';
import ProductImage from '../components/ProductImage';
import Rating from '../components/Rating';

const Home = () => {
  const products = [
    { id: 1, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 4 },
    { id: 2, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 5 },
    { id: 3, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 2 },
    { id: 4, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 4 },
    { id: 5, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 3 },
    { id: 6, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 1 },
    { id: 7, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 1 },
    { id: 8, name: 'Havit HV-G92 Game Pad', price: '₦ 3,500', url: 'public/images/g92-2-500x500 1.png', discount: '- 34%', rate: 2 },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home">
      <div className="intro header-container carousel">
        <div className="flex gap-2 flex-col">
          <Link to="category">Woman's Fashion</Link>
          <Link to="category">Men's Fashion</Link>
          <Link to="category">Electronics</Link>
          <Link to="category">Home & Lifestyle</Link>
          <Link to="category">Medicine</Link>
          <Link to="category">Sports & Outdoor</Link>
          <Link to="category">Baby's & Toys</Link>
          <Link to="category">Groceries & Pets</Link>
          <Link to="category">Health & Beauty</Link>
        </div>
        <div className="carousel-right-item">
          <img src="\images\Frame 560.png" alt="" className="" />
        </div>
      </div>
      <div className="productSection">
        <div className="header-container">
          <div>
            <Indicator indicator="Today's" />
          </div>

          {/* Flash Sales, Timer, and Arrows */}
          <div className="flex items-center justify-between pt-5">
            {/* Flash Sales */}
            <p className="text-36px font-semibold font-inter whitespace-nowrap">Flash Sales</p>

            {/* Timer */}
            <div className="self-center">
              {/* Timer Labels */}
              <div className="flex justify-center gap-4">
                <p className="text-gray-500 font-medium text-center">Hours</p>
                <p className="text-gray-500 font-medium text-center">Minutes</p>
                <p className="text-gray-500 font-medium text-center">Seconds</p>
              </div>

              {/* Timer Numbers */}
              <div className="flex gap-4 items-center justify-center">
                <div className="text-3xl font-bold">03</div>
                <p className="text-3xl font-bold text-red-400">:</p>
                <div className="text-3xl font-bold">05</div>
                <p className="text-3xl font-bold text-red-400">:</p>
                <div className="text-3xl font-bold">56</div>
              </div>
            </div>

            {/* Arrow Controls */}
            <div className="arrow flex gap-3">
              <button
                className="fa fa-arrow-left"
                aria-hidden="true"
                onClick={handlePrev}
                disabled={startIndex === 0}
              ></button>
              <button
                className="fa fa-arrow-right"
                aria-hidden="true"
                onClick={handleNext}
                disabled={startIndex + itemsPerPage >= products.length}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="productDisplay product-container">
        <div className="products display flex gap-4 overflow-x-auto">
{visibleProducts.map((product) => (
  <div
    key={product.id}
    className="w-60 h-85 bg-gray-300 p-2.5 rounded-sm flex flex-col gap-1 border-b"
  >
    <div>
      <ProductImage product={product} />
    </div>
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <div>
      <Rating rate={product.rate} />
    </div>
  </div>
))}

        </div>
        <div className="flex justify-center items-center mt-8">
          <button className="bg-red-600 text-white size-10 py-1 w-40 rounded">
            View All Products
          </button>
        </div>
      </div>
      <div className="productCategories">
        <div className="header-container">
          <div>
            <Indicator indicator="Categories" />
          </div>
          {/* Browse by categories */}
          <div className="flex items-center justify-between pt-5">
            {/* Arrow Controls */}
            <p className='size-18 font-bold font-inter'>Browse By Categories</p>
            <div className="arrow flex gap-3">
              <button
                className="fa fa-arrow-left"
                aria-hidden="true"
                onClick={handlePrev}
                disabled={startIndex === 0}
              ></button>
              <button
                className="fa fa-arrow-right"
                aria-hidden="true"
                onClick={handleNext}
                disabled={startIndex + itemsPerPage >= products.length}
              ></button>
            </div>
          </div>
          {/* Categories */}
          <div className='flex gap-2 pt-8'>
            <Link to='category'>
            <img src="public\images\Category-Phone.png" alt="" className="" />
            </Link>
            <Link to='category'>
            <img src="public\images\Category-Phone (1).png" alt="" className="" />
            </Link>
            <Link to='category'>
            <img src="public\images\Category-Phone (2).png" alt="" className="" />
            </Link>
            <Link to='category'>
            <img src="public\images\Category-Phone (6).png" alt="" className="" />
            </Link>
            <Link to='category'>
            <img src="public\images\Category-Phone (4).png" alt="" className="" />
            </Link>
            <Link to='category'>
            <img src="public\images\Category-Phone (5).png" alt="" className="" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bestSellingProducts">
        <div className="header-container">
          <div>
            <Indicator indicator="Categories" />
          </div>
          {/* Best selling products */}
          <div className="">
            {/* Arrow Controls */}
            <div className="flex justify-between items-center pt-3">
            <p className='size-18 font-bold font-inter'>Best Selling products</p>
              <button className='bg-red-500 text-white rounded p-2'>View All</button>
            </div>
            <div className="products display flex gap-4 overflow-x-auto pt-8">
{visibleProducts.map((product) => (
  <div
    key={product.id}
    className="w-60 h-85 bg-gray-300 p-2.5 rounded-sm flex flex-col gap-1 border-b"
  >
    <div>
      <ProductImage product={product} />
    </div>
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <div>
      <Rating rate={product.rate} />
    </div>
  </div>
))}

        </div>
          </div>
        </div>
      </div>
        <div className="enhance product-container">
          <Link to='category'>
          <img src="public\images\Frame 600.png" alt="" />
          </Link>
        </div>
        <div className="ourProducts">
        <div className="header-container">
          <div>
            <Indicator indicator="Products" />
          </div>
          {/* Browse by categories */}
          <div className="flex items-center justify-between pt-5">
            {/* Arrow Controls */}
            <p className='size-18 font-bold font-inter'>Explore Our Products</p>
            <div className="arrow flex gap-3">
              <button
                className="fa fa-arrow-left"
                aria-hidden="true"
                onClick={handlePrev}
                disabled={startIndex === 0}
              ></button>
              <button
                className="fa fa-arrow-right"
                aria-hidden="true"
                onClick={handleNext}
                disabled={startIndex + itemsPerPage >= products.length}
              ></button>
            </div>
          </div>
        </div>
        <div className="productDisplay product-container">
        <div className="products display flex gap-4 overflow-x-auto">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="w-60 h-85 bg-gray-300 p-2.5 rounded-sm flex flex-col gap-1 border-b"
            >
              <div>
                <ProductImage url={product.url} discount={product.discount} product={product}/>
              </div>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <div>
                <Rating rate={product.rate} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <button className="bg-red-600 text-white size-10 py-1 w-40 rounded">
            View All Products
          </button>
        </div>
      </div>
        </div>
        <div className="latest product-container">
        <div>
            <Indicator indicator="New Arrivals" />
            <div className="latest flex gap-2 pt-8">
              <div>
                <Link to='categories'>
                <img src="public\images\Frame 684.png" alt="" />
                </Link>
              </div>
              <div className=''>
                <div>
                <Link to='categories'>
                <img src="public\images\Frame 685.png" alt="" />
                </Link>
                </div>
                <div className='flex gap-2 pt-4'>
                  <div>
                  <Link to='categories'>
                <img src="public\images\Frame 686.png" alt="" />
                </Link>
                  </div>
                  <div>
                  <Link to='categories'>
                <img src="public\images\Frame 687.png" alt="" />
                </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="service p-20">
          <img src="public\images\Frame 702.png" alt="" />
        </div>
        </div>
    </div>
  );
};

export default Home;
