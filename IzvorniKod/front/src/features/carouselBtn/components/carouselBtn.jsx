import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './carouselBtn.css';
import CarouselCard from './carouselCard';
import {getClosetNearYou} from "../api/carouselBtnAPI";
import {useNavigate} from "react-router-dom";


function CarouselBtn() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getClosetNearYou();
                setItems(data);
            } catch (error) {
                console.error('Error occured while fetching items: ', error);
            }
        };

        fetchItems();
    }, []);

    const itemGroups = items?.reduce((groups, item, index) => {
        if (index % 4 === 0) {
            groups.push([]);
        }
        groups[groups.length - 1].push(item);

        return groups;
    }, []);

    return (
        <div className="container mb-5">
            <div id="carouselItems" className="carousel-items-container carousel slide">
                <div className="carousel-inner">
                    {itemGroups.map((group, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="cards-container mx-2">
                                {group.map((item) => (
                                    <CarouselCard
                                        key={item.id}
                                        id={item.id}
                                        src={item.picture}
                                        txt={item.label}
                                        user={item.closetCustomComponent.closet.user}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselItems"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next " type="button" data-bs-target="#carouselItems"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
        </div>
    );
}

export default CarouselBtn;