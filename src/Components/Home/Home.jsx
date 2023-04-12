import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import MainSlider from '../MainSlider/MainSlider';
import $ from 'jquery'

export default function Home() {

  let baseUrl = 'https://route-ecommerce.onrender.com';

  let [ProductList, setProduct] = useState([]);

  useEffect(() => {
    getAllProducts();
  },[])

  async function getAllProducts(){
    let {data} = await axios.get(`${baseUrl}/api/v1/products`);
    setProduct(data.data);
    $('.loading').fadeOut(800);
  }
  return (
    <>
    <MainSlider/>

    <div className='position-fixed bg-light opacity-75 top-0 start-0 bottom-0 end-0 loading'>
      <i className='fa-solid fa-spinner fa-spin fa-4x text-success'></i>
    </div>
    <div className='row g-3 my-5'>
      {ProductList.map((prod)=>{
        return <div key= {prod._id} className='col-md-2 product'>
          <Link to={'/ProductDetails/' + prod._id}>
          <div className='border p-2'>
          <div className='product-image'>

          <img src={prod.imageCover} alt="" className='w-100'/>
          </div>
          <span className='text-success'>{prod.category.name}</span>
          <h2 className='h6 fw-bolder'>{prod.title.split(" ").splice(0,2).join(" ")}</h2>

          <div className='d-flex justify-content-between'>
          <p>{prod.price}EGP</p>
          <div className=''>
            <i className='fa-solid fa-star text-warning'></i>{prod.ratingsAverage}
          </div>
          </div>
        </div>
          </Link>
        
      </div>
      })}
      
    </div>
    </>
    
  )
}
