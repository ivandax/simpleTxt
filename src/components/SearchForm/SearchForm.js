import React from 'react';

import './SearchForm.scss';

const SearchForm = ({getSearchString}) => {
    
    const onSearch = (event) => {
        event.preventDefault();
        getSearchString('');
    }

    const handleSearchChange = (event) => {
        const {value} = event.target;
        value && getSearchString(value);
    }

    return (
        <form className="searchForm" onSubmit={onSearch}>
            <input type="text" placeholder="Enter username..." maxLength="15" onChange={handleSearchChange}/>
            <button type="submit">Reset</button>            
        </form>
    )
}

export default SearchForm;