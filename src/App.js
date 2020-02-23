import React, { Component } from 'react';
import TableFilter from './Table/index'
import data from "./data.json"
import Pagination from './Pagination';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'episodes': data._embedded.episodes,
       pageOfItems: []

    };
    this._filterUpdated = this._filterUpdated.bind(this);
    this.onChangePage = this.onChangePage.bind(this);

  }

  _filterUpdated(newData, filtersObject) {
    this.setState({
      'episodes': newData,
    });
  }
   onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

  render() {
    const episodes = this.state.episodes;
    const elementsHtml = this.state.pageOfItems.map((item, index) => {


      console.log(item)

      var dateMain = new Date(item.airstamp);
      var dateGet= (dateMain.getDate() < 10)? "0"+dateMain.getDate(): dateMain.getDate();
      var dateMonth=dateMain.getMonth()+1;
      dateMonth = (dateMonth < 10) ? "0"+ dateMonth : dateMonth;
      var dateYear=1900 + dateMain.getYear();
      var day = dateGet+"-"+dateMonth+"-"+dateYear;
      
      
      return (
        <tr key={'row_'+index}>
          <td className="cell">
            { item.id }
          </td>
          <td className="cell">
            { item.name }
          </td>
          <td className="cell">
            { item.season }
          </td>
          <td className="cell">
            { item.number }
          </td>
          <td className="cell">
            { day }
          </td>
        </tr>
      );
    });
    return (
      <div className="container">
            <table className="basic-table table">
              <thead>
                <TableFilter
                  rows={episodes}
                  onFilterUpdate={this._filterUpdated}>
                  <th key="id" filterkey="id" className="cell" casesensitive={'true'} showsearch={'false'}>
                    id
                  </th>   
                  <th key="name" filterkey="name" className="cell" casesensitive={'true'} showsearch={'false'}>
                    Name
                  </th>
                  <th key="season" filterkey="season" className="cell" showsearch={'false'}>
                    Season
                  </th>
                  <th key="number" filterkey="number" className="cell" alignleft={'true'} showsearch={'false'}>
                    Number
                  </th>
                  <th key="airstamp" filterkey="airstamp" className="cell" alignleft={'true'} showsearch={'false'}>
                  airstamp
                  </th>
                </TableFilter>
              </thead>
              <tbody>
                
                { elementsHtml }
              </tbody>
            </table>
            <Pagination items={this.state.episodes} onChangePage={this.onChangePage} />

      </div>
    );
  }
} 

export default App;
