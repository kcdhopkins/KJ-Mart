import React, { useRef } from "react";
import './searchBar.css'
import { useNavigate } from "react-router";
const SearchBar = () => {
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        navigate(`/shop/${encodeURIComponent(searchRef.current?.value || '')}/list`);
    }

    return (
        <div>
           <input ref={searchRef} className="search-input" placeholder="Search for any item..."/>
           <button className="search-button" onClick={()=>handleSubmit()}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
    )
}

export default SearchBar;