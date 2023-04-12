import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function ProductDetails() {
    let {id} = useParams();

    let baseUrl = 'https://route-ecommerce.onrender.com';
    let [Product, setProductDetails] = useState();

    useEffect(() => {
        getProductDetails(id);
      },[])

      async function getProductDetails(id){
        let {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`);
        setProductDetails(data.data);
      }

  return (
    <div>
        {Product? <div className='row align-items-center my-3'>
        <div className='col-md-4'>
            <OwlCarousel className='owl-theme' loop items={1}>
                {
                    Product.images.map((el)=> {
                        return <img src={el} className='w-100' alt="" />

                    })
                }
            </OwlCarousel>
        </div>

        <div className='col-md-8'>

        <h2 >{Product.title}</h2>
        <p className='text-muted'>{Product.description}</p>
        <span className='text-success'>{Product.category.name}</span>

        <div className='d-flex justify-content-between'>
        <p>{Product.price}EGP</p>
        <div>
        <i className='fa-solid fa-star text-warning'></i>{Product.ratingsAverage}
        </div>
        </div>

        <button className='btn btn-success col-md-12 my-2'> + Add to Cart</button>

        </div>
        </div> : '' }
        
    </div>
  )
}
