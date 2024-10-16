import React, { useContext } from 'react';
import { Carousel } from 'antd'; 
import { useShoppingCart } from '../contexts/ShopingcartContext';

const contentStyle: React.CSSProperties = {
    height: '500px',
    color: '#fff',
    lineHeight: '1000px',
    textAlign: 'center',
    background: '#364d79',
  };


const Slider: React.FC = () => {
 const {jsonData} = useShoppingCart()

  return (
    <Carousel autoplay>
      {jsonData.map((item) => (
        <div key={item.name} className='mr-5 ml-5 mt-24 shadow-xl'>
          <img src={item.photo} alt={item.name} style={contentStyle} className='object-contain'/>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
