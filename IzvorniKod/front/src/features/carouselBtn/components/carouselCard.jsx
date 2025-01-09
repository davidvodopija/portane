import React from "react";
import './carouselCard.css';

function CarouselCard({src, txt}) {
    return (
        <div className="card carousel-card">
            <img 
                src={src} 
                className="card-img-top" 
                alt={txt}
            />
            <div className="card-body py-2 p-0">
                <p className="user-posted text-center mb-1">posted by: korisnikUsername</p>
                <p className="card-text text-center">{txt}</p>
            </div>
        </div>
    );
}

export default CarouselCard;