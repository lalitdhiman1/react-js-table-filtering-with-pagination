import React from 'react';
 
function FilterIcon(props){
 
  
 const _iconClicked = () => {
    props.iconClicked && props.iconClicked();
  }
  
    const className = [props.selected ? 'selected ': '', 'table-filter-icon'].join('');
    return (<div onClick={ _iconClicked } className={ className }></div>);
  }

 
export default FilterIcon;
