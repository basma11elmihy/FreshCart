import React from 'react'
import slider1 from '../assets/images/slider-2.jpeg';
import slider2 from '../assets/images/grocery-banner.png';
import slider3 from '../assets/images/grocery-banner-2.jpeg';

import image1 from '../assets/images/slider-image-1.jpeg';
import image2 from '../assets/images/slider-image-2.jpeg';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MainSlider() {
  return (
    <div className='row g-0'>
        <div className='col-md-9'>

            <OwlCarousel className='owl-theme' loop items={1}>
                <img height={200} src={slider1} className='w-100'/>
                <img height={200} src={slider3} className='w-100'/>
                <img height={200} src={slider2} className='w-100'/>


            </OwlCarousel>
        </div>
        <div className='col-md-3'>
        <img height={100} src={image2} className='w-100'/>
        <img height={100} src={image1} className='w-100'/>

        </div>
    </div>
  )
}
