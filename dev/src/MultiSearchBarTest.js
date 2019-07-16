import React, { Component } from "react";
import { PropTypes } from "prop-types";
import MultiSearchBar from "../../src/MultiSearchBar";
import OPTIONS_CONFIG from "./options-config";
import FORM_CONFIG from "./form-config";



class MultiSearchBarTest extends Component {
    constructor(props) {
        super(props);

      this.state = {
        selected: [],
        options: OPTIONS_CONFIG,
        searched: "",
        advancedSearchAttrs: []
      };
    }

  onHandleSearch = value => {
    this.setState({searched: JSON.stringify(value)});
  };
  onSelectedChange = selected => {
    this.setState({selected: selected});
  }
    render() {
        return (
          <span>
            <MultiSearchBar
              handleSearch={this.onHandleSearch}
              options={this.state.options}
              allowBlankBasicSearch={true}
              advancedSearchAttributes={FORM_CONFIG}
              handleSelectedChange={this.onSelectedChange}/>

            <h2>Searching text:</h2>
            {this.state.searched}
            <h2>Selected Options:</h2>
            {JSON.stringify(this.state.selected)}
          </span>
        );
    }
} export default MultiSearchBarTest;

MultiSearchBarTest.propTypes = {
  completeCallback: PropTypes.func,
  history: PropTypes.object
};
