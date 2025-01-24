import React from "react";
import './carouselCard.css';
import {useNavigate} from "react-router-dom";

function CarouselCard({src, txt, user, id}) {
    const navigate = useNavigate();
    return (
        <div className="card carousel-card" onClick={() => navigate(`itemInfo/article/${id}`)}>
            <img
                src={src}
                className="card-img-top"
                alt={txt}
            />
            <div className="card-body py-2 p-0">
                <p className="user-posted text-center mb-1">posted
                    by: {user?.firstname || 'Unknown Seller'} {user?.lastname || ''}</p>
                <p className="card-text text-center">{txt}</p>
            </div>
        </div>
    );
}

export default CarouselCard;