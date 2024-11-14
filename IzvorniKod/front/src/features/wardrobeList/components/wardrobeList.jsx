import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeList.css";
import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading";
import WardrobeCard from "../../../features/wardrobeList/components/wardrobeCard";
import {useWardrobes} from "../hooks/useWardrobes.jsx";
import React, {useEffect, useState} from "react";

function WardrobeList() {
    const {wardrobes} = useWardrobes();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (wardrobes) {
            setIsLoading(false);
        }
    }, [wardrobes]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (wardrobes.length === 0) {
        return <div className="container-fluid ps-4 pb-2">Created closets will be visible here</div>
    }

    return (
        <div className="w-75">
            <div className="wardrobes-container d-flex flex-wrap mx-5 ">
                {wardrobes.map(((wardrobe) => {
                    const {title, id, componentsList} = (wardrobe);
                    return (
                        <div key={id} className="form-group mb-3">
                            <WardrobeCard wardrobeName={title} numOfShelves={componentsList[0]}
                                          numOfDrawers={componentsList[1]} numOfRods={componentsList[2]}
                                          wardrobeID={id}/>
                        </div>
                    );
                }))}
            </div>
        </div>
    );
}

export default WardrobeList;
