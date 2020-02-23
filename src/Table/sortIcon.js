import React, {  useEffect } from 'react';
import {
  isUndefined,
} from './lib/util'; 

function SortIcon(props){

useEffect(()=>{
  document.getElementById('dsc').checked = true;
}, [])

 const _sortClicked = (val) => {
    if(val==="dsc"){
      document.getElementById('dsc').checked = true;
      document.getElementById('asc').checked = false;
    }else{
      document.getElementById('dsc').checked = false;
      document.getElementById('asc').checked = true;
    }
    props.sort(val);
  }

  
    const sortClass = !isUndefined(props.sortType) ? (' ' + props.sortType) : '';
    return (<div className={['sort-parent clear-fix', sortClass].join('')} >
      <label><input id="dsc" type="radio" name="sorting" className="dsc" onClick={()=> _sortClicked('dsc') } /> Sort A-z</label>
      <label><input id="asc" type="radio" name="sorting" className="asc" onClick={()=> _sortClicked('asc') }/>Sort Z-a</label>
    </div>);
  }

export default SortIcon;
