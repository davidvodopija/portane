import React, {useRef, useState, useEffect, useContext} from "react";
import "./categorySelect.css"
import Select from "react-select";

import {CodebooksContext} from "../../../codebooks/context/codebooksContext.jsx";
import "../../../../app/routes/app/wardrobeView.css"
import Button from "../../../../components/button/button.jsx";
import WardrobeItem from "../../../wardrobeView/components/wardrobeItemSearch.jsx";
import {handleSubmitAdverts, handleSubmitArticle} from "../../utils/formUtils.jsx";
import {searchContext} from "../../contex/searchContex.jsx";
import MultiRangeSlider from "../../../../components/slider/slider.jsx";
import {useAuth} from "../../../auth/hooks/useAuth.jsx";
import GalleryAd from "../../../galleryView/components/galleryAd.jsx";


function CategorySelect({mode}) {
    const {codebooks} = useContext(CodebooksContext);
    const {user} = useAuth();
    const {searchTerm, entered, setTotalPages, page, formData, setFormData} = useContext(searchContext);
    const [isLoading, setIsLoading] = useState(true);

    //console.log(formData)

    let size = 12;
    const [itemList, setItemList] = useState([]);
    const formRef = useRef(null);
    const [priceRange, setPriceRange] = useState({
        minPrice: null,
        maxPrice: null,
    })

    const [adFormData, setAdFormData] = useState({
        articleSearchForm: null,
        minPrice: null,
        maxPrice: null,
        sellerId: null,
        galleryId: null,
    });
    const setArticleSearchForm = () => {
        return new Promise((resolve) => {
            formData.label = searchTerm;
            setAdFormData((prevState) => {
                const updatedState = {
                    ...prevState,
                    maxPrice: priceRange.maxPrice,
                    minPrice: priceRange.minPrice,
                    articleSearchForm: formData,
                };
                resolve(updatedState);
                return updatedState;
            });
        });
    };
    const handleSubmitForm = async () => {
        if (mode === "sharedItems") {
            formData.public = true;
            formData.label = searchTerm;
            await handleSubmitArticle(formData, mode, setItemList, page, size, setTotalPages);
        } else if (mode === "myItems") {
            formData.label = searchTerm;
            formData.userId = user.id;
            await handleSubmitArticle(formData, mode, setItemList, page, size, setTotalPages);
        } else if (mode === "adverts") {
            formData.public = null;
            formData.userId = null;
            const updatedAdFormData = await setArticleSearchForm();
            await handleSubmitAdverts(updatedAdFormData, mode, setItemList, page, size, setTotalPages);
        } else {
            console.error("wrong mode");
        }
    };

    useEffect(() => {
        if (!formData.categoryIds || !formData.categoryIds.includes(6)) {
            formData.footwearTypeIds = null;
        }
        handleSubmitForm();
    }, [mode, entered, page, formData]);


    useEffect(() => {
        if (codebooks) {
            setIsLoading(false);
        }
    }, [codebooks]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const handleSelectChange = (selectedOptions, actionMeta) => {
        const {name} = actionMeta;
        const values = selectedOptions
            ? selectedOptions.map((option) => option.value)
            : [];
        setFormData((prevData) => ({
            ...prevData,
            [name]: (values.length > 0) ? values : null,
        }));
    };


    return (
        <div className="d-flex container-div">
            <div className="mx-4 category-select p-3 mb-2 flex-wrap">
                <div className="title-style mb-2">Filtri</div>
                <form ref={formRef} className="custom-form">
                    <div className="mb-2"> {
                    }
                        <div className="form-label">Godišnje doba:</div>
                        <Select
                            id="seasonIds"
                            name="seasonIds"
                            isMulti
                            options={codebooks["seasons"].map((style) => ({
                                value: style.id,
                                label: style.name,
                            }))}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="form-label">Stil:</div>
                        <Select
                            id="styleIds"
                            name="styleIds"
                            isMulti
                            options={codebooks["styles"].map((style) => ({
                                value: style.id,
                                label: style.name,
                            }))}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="form-label">Glavna boja:</div>
                        <Select
                            id="primaryColorIds"
                            name="primaryColorIds"
                            isMulti
                            options={codebooks["colors"].map((style) => ({
                                value: style.id,
                                label: style.name,
                            }))}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="form-label">Sporedna boja:</div>
                        <Select
                            id="secondaryColorIds"
                            name="secondaryColorIds"
                            isMulti
                            options={codebooks["colors"].map((style) => ({
                                value: style.id,
                                label: style.name,
                            }))}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="form-label">Kategorija:</div>
                        <Select
                            id="categoryIds"
                            name="categoryIds"
                            isMulti
                            options={codebooks["categories"].map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                            defaultValue={
                                formData.categoryIds
                                    ? codebooks["categories"]
                                        .filter((category) => formData.categoryIds.includes(category.id))
                                        .map((category) => ({
                                            value: category.id,
                                            label: category.name,
                                        }))
                                    : []
                            }
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className="mb-2">
                        <div className="form-label">Stanje/očuvanost:</div>
                        <Select
                            id="conditionIds"
                            name="conditionIds"
                            isMulti
                            options={codebooks["conditions"].map((style) => ({
                                value: style.id,
                                label: style.name,
                            }))}
                            onChange={handleSelectChange}
                        />
                    </div>
                    {
                        formData.categoryIds && (formData.categoryIds.includes(6)) && (
                            <div className="mb-2">
                                <div className="form-label">Otvorenost(obuća):</div>
                                <Select
                                    id="footwearTypeIds"
                                    name="footwearTypeIds"
                                    isMulti
                                    options={codebooks["footwear-types"].map((style) => ({
                                        value: style.id,
                                        label: style.name,
                                    }))}
                                    onChange={handleSelectChange}
                                />
                            </div>
                        )
                    }


                    {
                        (mode === "adverts") ?
                            <div className="mb-2">
                                <div className="form-label">Cijena(€):</div>
                                <MultiRangeSlider funcSetValues={setPriceRange}></MultiRangeSlider>
                            </div>
                            : <></>
                    }
                    <div className="justify-content-center d-flex px-2 mt-3">
                        <Button color="orange" size="large" radius="mediumround"
                                onClick={handleSubmitForm}>Primjeni</Button>
                    </div>
                </form>
            </div>
            {
                <div className="wardrobe-items-container d-flex flex-wrap mx-lg-5 mx-md-2 mx-sm-0 mb-5">
                    {itemList.length === 0 ? (
                        <div></div>
                    ) : (mode === "adverts" && itemList[0].gallery) ? (
                        itemList.map((item) => (
                            <GalleryAd
                                key={item.id}
                                id={item.id}
                                galleryId={item.gallery.id}
                                actions={false}
                            />
                        ))
                    ) : (
                        (itemList[0].gallery) ? <>Loading...</> :
                            itemList.map((item) => (
                                <WardrobeItem
                                    key={item.id}
                                    location={mode === "myItems" ? item.closetCustomComponent?.title : null}
                                    wardrobeId={mode === "myItems" ? item.closetCustomComponent?.closetId : null}
                                    itemName={item.label}
                                    id={item.id}
                                    actions={false}
                                    pathOnClick="closet"
                                />
                            ))
                    )}
                </div>

            }
        </div>
    );
}

export default CategorySelect;
