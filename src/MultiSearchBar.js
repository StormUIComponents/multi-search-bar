import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { composeThemeFromProps } from "@css-modules-theme/react";

import MultiSelect from "@khanacademy/react-multi-select";
import ConfigurableForm from "configurable-form-builder";
import SearchBar from "./SearchBar";
import buildThemingProps from "./ThemeUtils";

import {
  BASIC,
  ADVANCED,
  BASIC_SEARCH_LABEL,
  ADVANCED_SEARCH_LABEL,
  NO_SEARCH_ATTRS,
  SELECT_SOME_ITEMS,
  ALL_ITEMS_ARE_SELECTED,
  SELECT_ALL,
  SEARCH
} from "./constants";

import multiSearchStyles from "../resources/styles/multiSearch.scss";

export default class MultiSearchBar extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchType = this.toggleSearchType.bind(this);
    this.onHandleSelectedChanged = this.onHandleSelectedChanged.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);
    let { defaultSearch, advancedSearch, basicSearch, messages } = this.props;

    if (
      (!defaultSearch || defaultSearch === BASIC) &&
      (basicSearch ||
        (basicSearch === undefined && advancedSearch === undefined) ||
        // if default is not set, default to basic if both options are undefined or basic search is set
        (!basicSearch && !advancedSearch)) // if by mistake both advanced and basic are off, will default to basic
    ) {
      this.state = {
        selected: [],
        label: messages.advancedSearchLabel,
        type: BASIC
      };
    } else {
      this.state = {
        selected: [],
        label: messages.basicSearchLabel,
        type: ADVANCED
      };
    }
  }

  onHandleSearch = value => {
    this.props.handleSearch(value, this.state.type);
  };

  onHandleSelectedChanged = selected => {
    this.setState({ selected });
    this.props.handleSelectedChange(selected);
  };
  toggleSearchType() {
    const { basicSearchLabel, advancedSearchLabel } = this.props.messages;
    if (this.state.type === BASIC) {
      this.setState({
        label: basicSearchLabel,
        type: ADVANCED
      });
    } else {
      this.setState({
        label: advancedSearchLabel,
        type: BASIC
      });
    }
  }
  getSearchComponent(theme, themeProps, themeProperties) {
    let {
      allowBlankBasicSearch,
      advancedSearchAttributes,
      messages
    } = this.props;
    if (this.state.type === BASIC) {
      return (
        <SearchBar
          handleSearch={this.onHandleSearch}
          allowBlankBasicSearch={allowBlankBasicSearch}
          theme={theme}
          themeProps={themeProps}
          messages={messages}
        />
      );
    } else {
      return (
        <ConfigurableForm
          fields={advancedSearchAttributes.fields}
          breakpoints={advancedSearchAttributes.breakpoints}
          primaryButtonText={advancedSearchAttributes.primaryButtonText}
          primaryButtonCallback={this.onHandleSearch}
          noAttrText={messages.noAttrText}
          theme={theme}
          {...themeProperties}
        />
      );
    }
  }
  loadToggleButton(theme) {
    let { basicSearch, advancedSearch, advancedSearchAttributes } = this.props;
    if (
      (basicSearch === undefined &&
        advancedSearch === undefined &&
        advancedSearchAttributes !== undefined) ||
      (advancedSearch && basicSearch)
    ) {
      return (
        <button
          type="button"
          className={`${theme.primary} ${theme.toggleButton}`}
          onClick={this.toggleSearchType}
        >
          {this.state.label}
        </button>
      );
    }
  }

  loadOptions() {
    let { options } = this.props;
    const {
      selectSomeItems,
      allItemsAreSelected,
      selectAll,
      search
    } = this.props.messages;
    if (options)
      return (
        <MultiSelect
          options={options}
          selected={this.state.selected}
          onSelectedChanged={this.onHandleSelectedChanged}
          overrideStrings={{
            selectSomeItems,
            allItemsAreSelected,
            selectAll,
            search
          }}
        />
      );
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

    // the third party needs both options and selected
    return (
      <span>
        <div className={composedTheme.searchDrop}>{this.loadOptions()}</div>
        {this.getSearchComponent(theme, themeProps, themeProperties)}
        {this.loadToggleButton(composedTheme)}
      </span>
    );
  }
}

MultiSearchBar.propTypes = {
  handleSearch: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  handleSelectedChange: PropTypes.func,
  defaultSearch: PropTypes.oneOf([BASIC, ADVANCED]),
  advancedSearch: PropTypes.bool,
  basicSearch: PropTypes.bool,
  allowBlankBasicSearch: PropTypes.bool, // optional won't do anything if not defined.
  advancedSearchAttributes: PropTypes.shape({
    breakpoints: PropTypes.object,
    primaryButtonText: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        label: PropTypes.string
      })
    )
  }),
  theme: PropTypes.object,
  themeProps: PropTypes.shape({
    prefix: PropTypes.string,
    compose: PropTypes.string
  }),
  messages: PropTypes.shape({
    basicSearchLabel: PropTypes.string.isRequired,
    advancedSearchLabel: PropTypes.string.isRequired,
    noAttrText: PropTypes.string.isRequired,
    selectSomeItems: PropTypes.string.isRequired,
    allItemsAreSelected: PropTypes.string.isRequired,
    selectAll: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  })
};

MultiSearchBar.defaultProps = {
  theme: {},
  themeProps: {
    prefix: "multiSearchBar",
    compose: "merge"
  },
  messages: {
    basicSearchLabel: BASIC_SEARCH_LABEL,
    advancedSearchLabel: ADVANCED_SEARCH_LABEL,
    noAttrText: NO_SEARCH_ATTRS,
    selectSomeItems: SELECT_SOME_ITEMS,
    allItemsAreSelected: ALL_ITEMS_ARE_SELECTED,
    selectAll: SELECT_ALL,
    search: SEARCH
  }
};
