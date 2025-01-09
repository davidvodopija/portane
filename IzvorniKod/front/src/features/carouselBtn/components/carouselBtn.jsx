import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './carouselBtn.css';
import CarouselCard from './carouselCard';
import item from '../../../assets/item.png';

function CarouselBtn() {
  return (
    <div className="container mb-5">
      <div id="carouselItems" className="carousel-items-container carousel slide">
        <div className="carousel-inner  ">
          <div className="carousel-item active">
            <div className="cards-container">
              <CarouselCard src={item} txt="Item 1" />
              <CarouselCard src={item} txt="Item 1" />
              <CarouselCard src={item} txt="Item 1" />
              <CarouselCard src={item} txt="Item 1" />
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-container">
              <CarouselCard src={item} txt="Item 2" />
              <CarouselCard src={item} txt="Item 2" />
              <CarouselCard src={item} txt="Item 2" />
              <CarouselCard src={item} txt="Item 2" />
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-container">
              <CarouselCard src={item} txt="Item 3" />
              <CarouselCard src={item} txt="Item 3" />
              <CarouselCard src={item} txt="Item 3" />
              <CarouselCard src={item} txt="Item 3" />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselItems" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next " type="button" data-bs-target="#carouselItems" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </div>
  );
}

export default CarouselBtn;