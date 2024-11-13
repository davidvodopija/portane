import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './carouselBtn.css';
import Cards from '../cards/cards';
import item from '../../assets/item.png';

function CarouselBtn() {
  return (
    <div  id = "carouselBtn" className="container">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="cards-container">
              <Cards src={item} txt="Item 1" />
              <Cards src={item} txt="Item 1" />
              <Cards src={item} txt="Item 1" />
              <Cards src={item} txt="Item 1" />
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-container">
              <Cards src={item} txt="Item 2" />
              <Cards src={item} txt="Item 2" />
              <Cards src={item} txt="Item 2" />
              <Cards src={item} txt="Item 2" />
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-container">
              <Cards src={item} txt="Item 3" />
              <Cards src={item} txt="Item 3" />
              <Cards src={item} txt="Item 3" />
              <Cards src={item} txt="Item 3" />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselBtn;