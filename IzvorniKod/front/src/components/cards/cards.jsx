import React from "react";

function Cards({src, txt}) {
    return (
        <div className="card" style={{width: "10rem"}}>
            <img 
                src={src} 
                className="card-img-top" 
                alt={txt}
            />
            <div className="card-body">
                <p className="card-text">{txt}</p>
            </div>
        </div>
    );
}

export default Cards;