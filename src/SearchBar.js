import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { composeThemeFromProps } from "@css-modules-theme/react";

import { SEARCH_LABEL, SEARCH_PLACEHOLDER } from "./constants";
import buildThemingProps from "./ThemeUtils";
import multiSearchStyles from "../resources/styles/multiSearch.scss";

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
    if (
      (this.props.handleSearch && this.state.searchText.trim()) ||
      this.props.allowBlankBasicSearch
    ) {
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
    const { theme, themeProps } = this.props;
    const themeProperties = buildThemingProps(theme, themeProps);
    const composedTheme = composeThemeFromProps(
      multiSearchStyles,
      themeProperties,
      {
        compose: "Merge"
      }
    );

    const {
      searchPlaceholder = SEARCH_PLACEHOLDER,
      searchLabel = SEARCH_LABEL
    } = this.props.messages;
    let { searchText } = this.state;
    let display = this.state.clearDisplay
      ? composedTheme.clearShow
      : composedTheme.clearHidden;

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
          className={composedTheme.multiSearchBox}
          placeholder={searchPlaceholder}
        />
        <button
          className={`${composedTheme.closeIcon} ${display}`}
          type="reset"
          onClick={this.clearSearchBox}
        >
          {" "}
          x{" "}
        </button>
        <button
          type="button"
          className={composedTheme.primary}
          onClick={this.handleSearch}
        >
          {searchLabel}
        </button>
      </span>
    );
  }
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
  allowBlankBasicSearch: PropTypes.bool,
  theme: PropTypes.object,
  themeProps: PropTypes.shape({
    compose: PropTypes.string,
    prefix: PropTypes.string
  }),
  messages: PropTypes.shape({
    searchPlaceholder: PropTypes.string,
    searchLabel: PropTypes.string
  })
};

SearchBar.defaultProps = {
  theme: {},
  themeProps: {
    prefix: "multiSearchBar",
    compose: "merge"
  }
};
