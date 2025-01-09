import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./carouselAuto.css";
import Button from "../../../components/button/button";
import {useNavigate} from "react-router-dom";
import carouselImage1 from "../../../assets/frontpage1.jpg";
import carouselImage2 from "../../../assets/frontpage2.jpg";
import carouselImage3 from "../../../assets/frontpage3.jpg";

export const CarouselAuto = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center mt-4 pt-3">
      <div className="big-carousel-container d-flex">
        <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block" src={carouselImage1} alt="First slide"/>
                </div>
                <div className="carousel-item">
                  <img className="d-block" src={carouselImage2} alt="Second slide"/>
                </div>
                <div className="carousel-item">
                  <img className="d-block" src={carouselImage3} alt="Third slide"/>
                </div>
            </div>
        </div>
        <div className="container d-flex flex-column justify-content-center m-0 pe-0">
           <div className="small-txt">
               Posloži,<br/>Pretraži,<br/>Prodaj -<br/>
            </div>
            <div className="title-text">PORTANE</div>
            <div className="pb-4 mt-2 me-2">
              <Button 
              size="small"
              color="red"
              radius="rounded"
              onClick={() => navigate("/auth/register")}>Otvori vrata svog stila!
              </Button></div>
      </div>
      </div>
  </div>
  );
}

export default CarouselAuto;