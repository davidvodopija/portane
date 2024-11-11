import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./carouselAuto.css";
import Button from "../button/button";

export const CarouselAuto = () => {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide d-flex" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://picsum.photos/id/856/800/600" class="d-block w-100" alt="Slide 1"/>
        </div>
        <div className="carousel-item">
          <img src="https://picsum.photos/id/823/800/600" class="d-block w-100" alt="Slide 2"/>
        </div>
        <div className="carousel-item">
          <img src="https://picsum.photos/id/604/800/600" class="d-block w-100" alt="Slide 3"/>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1">
          <a>Posloži,</a>
          <a>Pretraži,</a>
          <a>Prodaj -</a>
        </div>
        <div className="naslov">PORTANE</div>
        <div className="btnContainer"><Button size="small" color="red" radius="rounded">Otvori vrata svog stila!</Button></div>
      </div>
    </div>
  );
}

export default CarouselAuto;