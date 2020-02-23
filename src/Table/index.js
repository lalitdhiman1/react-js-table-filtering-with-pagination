import {Component} from 'react';
import Template from './template.js';
import { isUndefined } from './lib/util';
import { filterAction, filterActions, filtersReset } from './lib/filter';
import { sortAction} from './lib/sort';


class TableFilter extends Component {
  constructor(props) {
    super(props);
    this.currentFilters = this.props.initialFilters || {};
    const rows = this._applyInitialFilters(this.props.rows);
    const stateData = this._createData(rows);
     
    this.state = {
      initialData: stateData.initialData,
      filteredData: stateData.filteredData,
      sortKey: undefined,
    };
  }

  _applyInitialFilters = (rows=[]) => {
    const currentFilters = this.currentFilters;
    if ( !isUndefined(currentFilters) && Object.keys(currentFilters).length > 0 ) {
      const filterKeys = Object.keys(currentFilters);
      let filteredArray;
       filterKeys.map((currKey) => {
        const filterValues = currentFilters[currKey];
        
        const filterToApply = filterValues.map((currValue) => {
          return {
            key: currKey,
            value: currValue,
          };
        });

        const result = filterActions(rows, filterToApply, true, this._getValueFunctionForKey(currKey));
        filteredArray = result.filteredArray;
        rows = result.dataWithFilter;
      });

     this.props.onFilterUpdate && this.props.onFilterUpdate(filteredArray, currentFilters);
    }

    return rows;
  }

  _getValueFunctionForKey = (filterKey) => {
    let valueFunc;
    this.props.children.map((child, index) => {
      if (!isUndefined(child) && !isUndefined(child.props.filterkey, true) && child.props.filterkey === filterKey) {
        valueFunc = child.props.itemDisplayValueFunc;
      }
    });

    return valueFunc;
  }

  _createData = (rows = []) => {
    const initialData = [];
    const filteredData = [];
    rows.map((item) => {
      initialData.push(Object.assign({}, item));
      filteredData.push(Object.assign({}, item));
    });

    return {
      initialData,
      filteredData,
    };
  }

  _filterMulipleRows = (addFilterArray=[], removeFilterArray=[], valueFunc=undefined) => {
    const filteredData = this.state.filteredData;

    if (!isUndefined(addFilterArray)) {
      removeFilterArray.map((filterItem) => {
        this._updateCurrentFilter(filterItem.value, false, filterItem.key);
      });

      addFilterArray.map((filterItem) => {
        this._updateCurrentFilter(filterItem.value, true, filterItem.key);
      });

      let result = filterActions(filteredData, removeFilterArray, false, valueFunc);

      result = filterActions(result.dataWithFilter, addFilterArray, true, valueFunc);

      if (!isUndefined(result)) {
        const filteredArray = result.filteredArray;
        const dataWithFilter = result.dataWithFilter;

        this.setState({
          filteredData: dataWithFilter,
        });
        this.props.onFilterUpdate && this.props.onFilterUpdate(filteredArray, this._getCurrentFilters());
      }
    }
  }

   _filterRows = (value=undefined, key=undefined, addFilter=true, valueFunc=undefined) => {
    const filteredData = this.state.filteredData;
    if (!isUndefined(value) && !isUndefined(key)) {
      this._updateCurrentFilters([value], addFilter, key);
      const result = filterAction(filteredData, {key, value}, addFilter, valueFunc);
      if (!isUndefined(result)) {
        const filteredArray = result.filteredArray;
        const dataWithFilter = result.dataWithFilter;

        this.setState({
          filteredData: dataWithFilter,
        });
        this.props.onFilterUpdate && this.props.onFilterUpdate(filteredArray, this._getCurrentFilters());
      }
    }
  }

  _updateCurrentFilter = (filter, add=true, key=undefined) => {
    if (!isUndefined(key, true) && !isUndefined(filter, true)) {
      if (isUndefined(this.currentFilters[key])) {
        this.currentFilters[key] = [];
      }

      if (add) {
        if (this.currentFilters[key].indexOf(filter) < 0) {
          this.currentFilters[key].push(filter);
        }
      } else {
        if (this.currentFilters[key].indexOf(filter) >= 0) {
          const index = this.currentFilters[key].indexOf(filter);
          this.currentFilters[key] = [...this.currentFilters[key].slice(0, index), ...this.currentFilters[key].slice(index + 1)];
        }
      }
    }
  }

    _updateCurrentFilters = (filters=[], add=true, key) => {
    if (!isUndefined(filters) && !isUndefined(key)) {
      filters.map((filterItem) => {
        this._updateCurrentFilter(filterItem, add, key);
      });
    }
  }

   
  _getCurrentFilters = () => {
    return this.currentFilters;
  }
 
  _resetRows = (filterValues=[], key=undefined, selectAll=true, valueFunc=undefined) => {
    if (!isUndefined(key)) {
      const filteredData = this.state.filteredData;
      this._updateCurrentFilters(filterValues, !selectAll, key);
      const result = filtersReset(filteredData, filterValues, key, selectAll, valueFunc);
      if (!isUndefined(result)) {
        const filteredArray = result.filteredArray;
        const dataWithFilter = result.dataWithFilter;

        this.setState({
          filteredData: dataWithFilter,
        });
        this.props.onFilterUpdate && this.props.onFilterUpdate(filteredArray, this._getCurrentFilters());
      }
    }
  }

   _sortRows = (sortType=undefined, {valueFunc=undefined, caseSensitive=false, key=undefined} = {}) => {
    if (!isUndefined(sortType)) {
      const filteredData = this.state.filteredData;
      const result = sortAction(filteredData, sortType, {valueFunc, caseSensitive, key} );

      const filteredArray = [];

      this.setState({
        filteredData: result,
        sortKey: key,
        sortType: sortType,
      });

      result.map((item) => {
        if (isUndefined(item.appliedFilters) || Object.keys(item.appliedFilters).length === 0) {
          const itemCopy = Object.assign({}, item);
          delete itemCopy['appliedFilters'];
          filteredArray.push(itemCopy);
        }
      });

      this.props.onFilterUpdate && this.props.onFilterUpdate(filteredArray, this._getCurrentFilters());
    }
  }

 
  reset = (rows, resetFilters=true) => {
    if (!resetFilters) {
      rows = this._applyInitialFilters(rows);
    } else {
      this.currentFilters = {};
    }

    const stateData = this._createData(rows);
    this.setState({
      initialData: stateData.initialData,
      filteredData: stateData.filteredData,
    });
  }

 
  render() {
    return Template.call(this);
  }
}


export default TableFilter;
