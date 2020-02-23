import React, { useState, useEffect } from 'react';

function SelectAllItem(props)
{
 
  const [enable, setEnable] = useState(false)

  useEffect(()=>{
    document.getElementById('all').checked = true;
  }, [])

 const _selectAllClicked = (val) => {
   setEnable(false);
    props.filterClicked(val);
  }
 const _selectFewClicked = (val) => {
   setEnable(true);
    props.filterClicked(val);
  }



    return (
    <>
    
    <div className="filter-list-item" onClick={()=>_selectAllClicked("all")}>
      <label><input type="radio" id="all" name="filterby" />Filter By - All</label>
    </div>

      {
        (enable) ?
<div className="filter-list-item "  onClick={()=>_selectFewClicked("few")}>
      <label><input type="radio" name="filterby"/>Filter By - From The List</label>
    </div>
        :
<div className="filter-list-item disable"  onClick={()=>_selectFewClicked("few")}>
      <label><input type="radio" name="filterby" />Filter By - From The List</label>
    </div>

      }

    
    </>
    );
 
  }



export default SelectAllItem;
