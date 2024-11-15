import React from 'react';
import CarouselBtn from '../carousel/carouselBtn';
import "./items.css";
import SecondaryHeading from "../secondaryHeading/secondaryHeading.jsx";

export default function items() {
    return (
        <div id="item">
            <div className='container-fluid'>
                <SecondaryHeading text="STILOVI TVOG KVARTA"/>
            </div>
            <CarouselBtn></CarouselBtn>
        </div>
    );
}
