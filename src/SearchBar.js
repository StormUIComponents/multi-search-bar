import React, { Component } from "react";
import { PropTypes } from "prop-types";

import "./style.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearchBox = this.clearSearchBox.bind(this);

    this.state = {
      searchText: "",
      clearDisplay: false
    };
  }

  handleSearch() {
    if ((this.props.handleSearch && this.state.searchText.trim())|| this.props.allowBlankBasicSearch) {
      this.props.handleSearch(this.state.searchText);
    }
    this.clearSearchBox();
  }

  handleSearchBarClick(val) {
    if (this.props.handleSearch) {
      this.props.handleSearch(val);
    }
    this.clearSearchBox();
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value,
      clearDisplay: e.target.value ? true : false
    });
  }

  clearSearchBox() {
    this.setState({
      searchText: "",
      clearDisplay: false
    });
  }

  render() {
    let { theme } = this.props;
    let { searchText } = this.state;
    let display = this.state.clearDisplay ? "clear-show" : "clear-hidden";
    const placeholder = "Search...";
    return (
      <span>
        <input
          type="text"
          value={searchText}
          onChange={e => this.handleChange(e)}
          onKeyDown={e => {
            if (e.key === "Enter")
              this.handleSearchBarClick(e.target.value.trim());
          }}
          className={theme}
          placeholder={placeholder}
        />
        <button
          className={"close-icon " + display}
          type="reset"
          onClick={this.clearSearchBox}
        >
          {" "}
          x{" "}
        </button>
        <button
          type="button"
          className="primary"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </span>
    );
  }
}


SearchBar.propTypes = {
  theme: PropTypes.string.isRequired,
  handleSearch: PropTypes.func,
  allowBlankBasicSearch: PropTypes.boolean
};
