import React, {useContext, useEffect, useState} from "react";
import SwitchLabel from "../../../auth/components/switchLabel/switchLabel.jsx";
import CategorySelect from "../categorySelect/categorySelect.jsx";
import {useAuth} from "../../../auth/hooks/useAuth.jsx";
import {searchContext} from "../../contex/searchContex.jsx";
import Paging from "../../../../components/paging/paging.jsx";

const SearchSelector = ({mode = "sharedItems"}) => {
    const [searchIn, setSearchIn] = useState(mode);
    const {page, setPage, totalPages} = useContext(searchContext);

    const {isLoggedIn, user} = useAuth();


    function determineMode(mode) {
        switch (mode) {
            case "myItems":
                return <CategorySelect mode="myItems"></CategorySelect>;
            case "sharedItems":
                return <CategorySelect mode="sharedItems"></CategorySelect>;
            case "adverts":
                return <CategorySelect mode="adverts"></CategorySelect>;
            default:
                return <div>No matching content</div>;
        }
    }

    return (
        <>
            <div className="d-flex gap-2 justify-content-between me-3 flex-wrap">
                <div className="d-flex text-center mx-4 my-2 flex-wrap">
                    {
                        (isLoggedIn && !user.seller) ? (<SwitchLabel
                            isActive={searchIn === "myItems"}
                            onClick={() => {
                                setSearchIn("myItems");
                            }}>
                            MOJI ARTIKLI
                        </SwitchLabel>) : (<></>)
                    }

                    <SwitchLabel
                        isActive={searchIn === "sharedItems"}
                        onClick={() => {
                            setSearchIn("sharedItems");
                        }}>
                        DIJELJENI ARTIKLI
                    </SwitchLabel>
                    <SwitchLabel
                        isActive={searchIn === "adverts"}
                        onClick={() => {
                            setSearchIn("adverts");
                        }}>
                        OGLASI
                    </SwitchLabel>
                </div>
                <Paging totalPages={totalPages} currentPage={page} setCurrentPage={setPage}></Paging>
            </div>
            {
                determineMode(searchIn)
            }
        </>
    );
};

export default SearchSelector;
