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
            <input type="text" placeholder="Enter name" maxLength="40" onChange={handleSearchChange}/>
            <button type="submit">Reset</button>            
        </form>
    )
}

export default SearchForm;