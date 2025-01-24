import Header from "../../../components/header/header";
import SearchSelector from "../../../features/itemSearch/components/selector/searchSelector.jsx";
import {useContext, useState} from "react";
import {searchContext} from "../../../features/itemSearch/contex/searchContex.jsx";

function Search() {
    //const [searchParameter, setSearchParameter] = useState("");
    //console.log("searchParameter: " + searchParameter);
    const {searchMode} = useContext(searchContext);
    //console.log(searchMode);
    return <>
        <Header></Header>
        <SearchSelector mode={searchMode}></SearchSelector>
    </>;
}

export default Search;
