import React from 'react';
import CarouselBtn from '../carousel/carouselBtn';
import "./items.css";

export default function items() {
    return (
      <div id="item">
        <div className='container-fluid'>
          <div className='d-flex justify-content-between align-items-center'>
            <h1>STILOVI TVOG KVARTA</h1>
            <a id='smalltxt'>istraži ormare u svojoj blizini</a>
          </div>
        </div>
        <CarouselBtn></CarouselBtn>
      </div>
    );
  }
