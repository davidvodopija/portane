import React, {useRef, useState, useEffect} from 'react';
import Button from "../../../../components/button/button.jsx";
import "./createWardrobeForm.css";
import MapLocationForm from "../MapLocationWidget/MapLocationWidget.jsx";
import {useWardrobeComponents} from "../../hooks/useWardrobeComponents.jsx";
import {handleFormSubmit} from "../../utils/formUtils.jsx";

function CreateWardrobeForm() {
    const {wardrobeComponents, addWardrobe} = useWardrobeComponents();
    const formRef = useRef(null);

    // Use a loading indicator if wardrobeComponents hasn’t loaded yet
    const [isLoading, setIsLoading] = useState(true);

    // Load wardrobeComponents and reset loading state
    useEffect(() => {
        if (wardrobeComponents) {
            setIsLoading(false);
        }
    }, [wardrobeComponents]);

    const [formData, setFormData] = useState({});
    const [wardrobeName, setWardrobeName] = useState('');
    //const [location, setLocation] = useState({latitude: '', longitude: ''});

    // Initialize form data after wardrobeComponents loads
    useEffect(() => {
        if (wardrobeComponents) {
            setFormData(
                wardrobeComponents.reduce((acc, component) => {
                    acc[component.label] = '';
                    return acc;
                }, {})
            );
        }
    }, [wardrobeComponents]);

    const handleInputChange = (label, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [label]: value,
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="m-3 mt-4 p-4 create-closet-form">
            <p className="title-style">NOVI ORMAR - NOVI PROSTOR ZA STIL</p>
            <form ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="wardrobeName" className="form-label">NAZIV ORMARA</label>
                    <input
                        type="text"
                        name="wardrobeName"
                        value={wardrobeName}
                        onChange={(e) => setWardrobeName(e.target.value)}
                        placeholder={`Unesite naziv ormara`}
                        className="form-control w-50"
                        required
                    />
                </div>

                {wardrobeComponents.map((component) => {
                    const {label, id} = component;

                    return (
                        <div key={id} className="form-group mb-4">
                            <label htmlFor={label} className="form-label">{label.toUpperCase()}</label>
                            <input
                                type="number"
                                id={id}
                                name={id}
                                value={formData[label]}
                                onChange={(e) => handleInputChange(label, e.target.value)}
                                placeholder={`Unesite broj ${label.toLowerCase()}`}
                                className="form-control w-50"
                                min="0"
                                max="10"
                            />
                        </div>
                    );
                })}

                {/*<div className="mb-3">
                    <div className="form-label">LOKACIJA ORMARA</div>
                    <div className="col-8">
                        <MapLocationForm className="mb-3" location={location} setLocation={setLocation}/>
                    </div>
                </div>*/}

                <div className="mt-4 pt-2">
                    <Button size="small" color="red" radius="rounded" type="submit"
                            onClick={() => handleFormSubmit(formRef, addWardrobe)}>
                        Kreiraj ormar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateWardrobeForm;
