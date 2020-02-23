import React from 'react';
function SearchBar(props){
   
  const _searchInputChanged = (e) => {
    const newValue = e.target.value;
    _callSearchChanged(newValue);
  }

  const _callSearchChanged = (val) => {
    props.searchChanged && props.searchChanged(val);
  }

 
    return (
      <div className="search-parent filter-list-item">
        <input className="search-input" type="text" placeholder="search" onChange={_searchInputChanged}/>
      </div>
    );
  }
 
export default SearchBar;
