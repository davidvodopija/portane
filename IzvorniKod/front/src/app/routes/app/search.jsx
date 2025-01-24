import Header from "../../../components/header/header";
import SearchSelector from "../../../features/itemSearch/components/selector/searchSelector.jsx";
import {useContext, useState} from "react";
import {searchContext} from "../../../features/itemSearch/contex/searchContex.jsx";

function Search() {
    const {searchMode} = useContext(searchContext);
    return <>
        <Header></Header>
        <SearchSelector mode={searchMode}></SearchSelector>
    </>;
}

export default Search;
