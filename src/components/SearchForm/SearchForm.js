import React from 'react';

import './SearchForm.scss';

const SearchForm = ({getSearchString}) => {
    
    const onSearch = (event) => {
        event.preventDefault();
        console.log("nothing happens...")
    }

    const handleSearchChange = (event) => {
        const {value} = event.target;
        value && getSearchString(value);
    }

    return (
        <form className="searchForm" onSubmit={onSearch}>
            <input type="text" placeholder="Enter username..." maxLength="15" onChange={handleSearchChange}/>
            <button type="submit">Search</button>            
        </form>
    )
}

export default SearchForm;