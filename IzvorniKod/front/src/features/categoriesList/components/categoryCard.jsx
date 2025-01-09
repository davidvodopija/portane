import React from "react";
import "./categoryCard.css"

function CategoryCard({src, txt}) {
    return (
        <div className="card category-card">
            <img 
                src={src} 
                className="card-img-top" 
                alt={txt}
            />
            <div className="card-body">
                <p className="card-text text-center">{txt}</p>
            </div>
        </div>
    );
}

export default CategoryCard;