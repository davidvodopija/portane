import CreateWardrobeForm from "../../../features/createWardrobe/components/createWardrobeForm/createWardrobeForm.jsx";
import Header from "../../../components/header/header.jsx";
import WardrobeList from "../../../features/wardrobeList/components/wardrobeList.jsx";
import SecondaryHeading from "../../../components/secondaryHeading/secondaryHeading.jsx";
import SearchBar from "../../../components/searchBar/searchBar.jsx";

function CreateWardrobe() {
    return (<><Header></Header>
        <div className="container-fluid">
            <CreateWardrobeForm/>
        </div>
        <div className="container-fluid">
            <div className="d-flex justify-content-between pe-5 w-100">
                <SecondaryHeading text="MOJI ORMARI (n)"/>
                <div className="mt-2 pt-5">
                    <SearchBar size="small" text="Pretraži svoje ormare"/>
                </div>
            </div>
            <WardrobeList></WardrobeList>
        </div>
    </>);
}

export default CreateWardrobe;
