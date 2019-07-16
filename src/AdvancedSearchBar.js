import React, { Component } from "react";
import { PropTypes } from "prop-types";

// Add here configurable form from CVV

import "./style.css";


export default class AdvancedSearchBar extends Component {

  handleAdvancedSearch() {
    //This is going to have a call back and will send config variables to ConfigurableGlobalSearchBar
  }

  render() {



    return (
      <span>
        <div>
        <span> Place Holder for Form </span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleAdvancedSearch}
        >
          Search
        </button>

      </span>
    );
  }
}


AdvancedSearchBar.propTypes = {
  completeCallback: PropTypes.func,
  handleAdvancedSearch: PropTypes.func,
  options: PropTypes.array,
  handleSelectedChange: PropTypes.func

};
