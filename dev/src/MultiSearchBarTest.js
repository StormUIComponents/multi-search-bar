import React, { Component } from "react";
import { PropTypes } from "prop-types";
import MultiSearchBar from "../../src/MultiSearchBar";
import OPTIONS_CONFIG from "./options-config";
import FORM_CONFIG from "./form-config";

import themeFile from "../resources/styles/TestTheme.scss";

class MultiSearchBarTest extends Component {
  constructor(props) {
    super(props);
    this.onHandleSearch = this.onHandleSearch.bind(this);
    this.onSelectedChange = this.onSelectedChange.bind(this);
    this.state = {
      selected: [],
      options: OPTIONS_CONFIG,
      searched: "",
      advancedSearchAttrs: [],
      type: ""
    };
  }

  onHandleSearch = (value, type) => {
    this.setState({ searched: JSON.stringify(value) });
    this.setState({ type: type });
  };
  onSelectedChange = selected => {
    this.setState({ selected: selected });
  };
  render() {
    let themeProps = {
      prefix: "multiSearchBar-",
      compose: "merge"
    };

    return (
      <span>
        <MultiSearchBar
          handleSearch={this.onHandleSearch}
          options={this.state.options}
          allowBlankBasicSearch={true}
          advancedSearchAttributes={FORM_CONFIG}
          handleSelectedChange={this.onSelectedChange}
          theme={themeFile}
          themeProps={themeProps}
          messages={{
            basicSearchLabel: "Basic",
            advancedSearchLabel: "Advanced",
            noAttrText: "No searchable attributes for selected entity types",
            searchLabel: "Search",
            searchPlaceholder: "Search...",
            selectSomeItems: "Select Some Items...",
            allItemsAreSelected: "All Items Are Selected",
            selectAll: "Select All",
            search: "Search"
          }}
        />
        <h2>Searching text:</h2>
        {this.state.searched}
        <h2>Selected Options:</h2>
        {JSON.stringify(this.state.selected)}
        <br /> <h2> Search Type:</h2>
        {JSON.stringify(this.state.type)}
      </span>
    );
  }
}
export default MultiSearchBarTest;

MultiSearchBarTest.propTypes = {
  completeCallback: PropTypes.func,
  history: PropTypes.object
};
