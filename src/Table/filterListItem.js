import React from 'react';
 
function FilterListItem(props){

  const _checkBoxClicked = () => {
    props.filterClicked(props.index);
  }
 const checkBoxClass = [props.selected ? 'selected ' : '', 'filter-check-box'].join('');
 const isDisabled = (props.nameclass) ? 'filter-list-item ripple  disabled':'filter-list-item ripple '
    return (
    
    <div className={isDisabled} onClick={_checkBoxClicked}>
      <div className={ checkBoxClass } ></div>
      <div className="filter-label">{props.label}</div>
    </div>
    
    );
  }
export default FilterListItem;
