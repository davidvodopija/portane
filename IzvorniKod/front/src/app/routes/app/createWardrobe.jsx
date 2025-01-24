import CreateWardrobeForm from "../../../features/createWardrobe/components/createWardrobeForm/createWardrobeForm.jsx";
import Header from "../../../components/header/header.jsx";
import WardrobeList from "../../../features/wardrobeList/components/wardrobeList.jsx";
import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading.jsx";
import SearchBar from "../../../components/searchBar/searchBar.jsx";
import {useEffect, useState, useContext} from "react";
import {wardrobesContext} from "../../../features/wardrobeList/context/wardrobesContext.jsx";

function CreateWardrobe() {
    const {wardrobes} = useContext(wardrobesContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (wardrobes) {
            setIsLoading(false);
        }
    }, [wardrobes]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header></Header>
            <CreateWardrobeForm/>
            <div className="container-fluid">
                <div className="d-flex justify-content-between pe-5 w-100">
                    <SecondaryHeading
                        text={`MOJI ORMARI (${wardrobes ? wardrobes.length : 0})`}
                    />
                    <div className="mt-2 pt-5">
                        <SearchBar size="small" text="Pretraži svoje ormare" searchMode="myItems"/>
                    </div>
                </div>
                <WardrobeList></WardrobeList>
            </div>
        </>
    );
}

export default CreateWardrobe;
