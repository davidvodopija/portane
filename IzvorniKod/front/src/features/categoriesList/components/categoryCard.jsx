import React, {useContext, useEffect, useState} from "react";
import "./categoryCard.css"
import {searchContext} from "../../itemSearch/contex/searchContex.jsx";
import {CodebooksContext} from "../../codebooks/context/codebooksContext.jsx";
import {useNavigate} from "react-router-dom";

function CategoryCard({src, txt}) {
    const {setFormData} = useContext(searchContext);
    const {codebooks} = useContext(CodebooksContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (codebooks) {
            setIsLoading(false);
        }
    }, [codebooks]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleClick = () => {
        const categoryId = codebooks["categories"].find(category => category.name === txt)?.id;

        if (!categoryId) {
            console.error(`Category ID not found for category name: ${txt}`);
            return;
        }

        setFormData(prevFormData => {
            const currentCategoryIds = prevFormData.categoryIds || [];
            const isCategorySelected = currentCategoryIds.includes(categoryId);

            return {
                ...prevFormData,
                categoryIds: isCategorySelected
                    ? currentCategoryIds.filter(id => id !== categoryId)
                    : [...currentCategoryIds, categoryId]
            };
        });
        navigate("/search");
    };

    return (
        <div className="card category-card" onClick={handleClick}>
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