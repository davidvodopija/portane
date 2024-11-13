// Categories.jsx
import React from 'react'
import Cards from '../cards/cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./categories.css"
import images from '../../utils/imagesUtils';

function Categories() {
    return (
        <div id = "categories" className='container-fluid'>
            <h1 id = "Cards" className='title'>KATEGORIJE</h1>
            <div className='cards-grid'>
                <Cards
                    src={images['majiceLogo.png']}
                    txt="Majice"
                />
                <Cards
                    src={images['haljineLogo.png']}
                    txt="Haljine"
                />
                <Cards
                    src={images['dzemperiVesteLogo.png']}
                    txt="Džemperi i veste"
                />
                <Cards
                    src={images['hlaceLogo.png']}
                    txt="Hlaće"
                />
                <Cards
                    src={images['jakneKaputiLogo.png']}
                    txt="Jakne i kaputi"
                />
                <Cards
                    src={images['obucaLogo.png']}
                    txt="Obuća"
                />
            </div>
        </div>
    );
}

export default Categories;