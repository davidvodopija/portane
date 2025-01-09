// Categories.jsx
import React from 'react'
import CategoryCard from './categoryCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./categoriesList.css"
import images from '../../../utils/imagesUtils.js';
import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading.jsx";

function Categories() {
    return (
        <div id="categories" className='container-fluid'>
            <SecondaryHeading text="KATEGORIJE"></SecondaryHeading>
            <div className='categories-list d-flex flex-wrap'>
                <CategoryCard
                    src={images['majiceLogo.png']}
                    txt="Majice"
                />
                <CategoryCard
                    src={images['haljineLogo.png']}
                    txt="Haljine"
                />
                <CategoryCard
                    src={images['dzemperiVesteLogo.png']}
                    txt="Džemperi i veste"
                />
                <CategoryCard
                    src={images['hlaceLogo.png']}
                    txt="Hlače"
                />
                <CategoryCard
                    src={images['jakneKaputiLogo.png']}
                    txt="Jakne i kaputi"
                />
                <CategoryCard
                    src={images['obucaLogo.png']}
                    txt="Obuća"
                />
            </div>
        </div>
    );
}

export default Categories;