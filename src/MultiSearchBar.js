import React, { Component } from "react";
import { PropTypes } from "prop-types";

import MultiSelect from "@khanacademy/react-multi-select";
import ConfigurableForm from "configurable-form-builder";
import SearchBar from "./SearchBar";
import "./style.css";

import {
  THEME,
  BASIC,
  ADVANCED,
  BASIC_SEARCH,
  ADVANCED_SEARCH,
  NO_SEARCH_ATTRS
} from "./constants";
import "../resources/styles/multiSearch.scss";

export default class MultiSearchBar extends Component {

  constructor(props) {
    super(props);
    this.toggleSearchType = this.toggleSearchType.bind(this);
    let {defaultSearch,advancedSearch, basicSearch} = this.props;

    if ((!defaultSearch || defaultSearch === BASIC)
      && (basicSearch || (basicSearch === undefined && advancedSearch === undefined)
        // if default is not set, default to basic if both options are undefined or basic search is set
      || (!basicSearch && !advancedSearch)) // if by mistake both advanced and basic are off, will default to basic
        ) {
      this.state = {
        selected: [],
        label: BASIC_SEARCH.toggleLabel,
        type: BASIC
      };
    } else {
      this.state = {
        selected: [],
        label: ADVANCED_SEARCH.toggleLabel,
        type: ADVANCED
      };
    }
  }

  onHandleSearch = value => {
   this.props.handleSearch(value);
  };

  onHandleSelectedChanged = selected => {
    this.setState({selected});
    this.props.handleSelectedChange(selected);
  }
  toggleSearchType() {
    if (this.state.type === BASIC) {
      this.setState({
          label: BASIC_SEARCH.label,
          type: ADVANCED_SEARCH.type
        }
      );
    } else {
      this.setState({
          label: ADVANCED_SEARCH.label,
          type: BASIC_SEARCH.type
        }
      );
    }
  }
  getSearchComponent() {
    let {allowBlankBasicSearch, advancedSearchAttributes} = this.props;
    if (this.state.type === BASIC) {
      return ( <SearchBar handleSearch={this.onHandleSearch} theme={THEME} allowBlankBasicSearch={allowBlankBasicSearch}/>);
    } else {
      return (
        <ConfigurableForm
          fields={advancedSearchAttributes.fields}
          breakpoints={advancedSearchAttributes.breakpoints}
          primaryButtonText={advancedSearchAttributes.primaryButtonText}
          primaryButtonCallback={this.onHandleSearch}
          noAttrText={NO_SEARCH_ATTRS}
        />
      );
    }
  }
  loadToggleButton() {
let {basicSearch, advancedSearch,advancedSearchAttributes} = this.props;
    if ((basicSearch === undefined && advancedSearch=== undefined && advancedSearchAttributes!== undefined) ||
      (advancedSearch && basicSearch))
    {
      return (
        <button
        type="button"
        className="primary toggle-button"
        onClick={this.toggleSearchType}
      >
        {this.state.label}
      </button>);
    }
  }

  loadOptions() {
    let {options} = this.props;
    if(options)
    return (

      <MultiSelect
        options={options}
        selected={this.state.selected}
        onSelectedChanged={this.onHandleSelectedChanged}
      />
    )
  }
  render() {




// the third party needs both options and selected
    return (
      <span>
        <div className="search-drop">
        {this.loadOptions()}

        </div>
        {this.getSearchComponent()}
        {this.loadToggleButton()}
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
  advancedSearch: PropTypes.boolean,
  basicSearch: PropTypes.boolean,
  allowBlankBasicSearch: PropTypes.boolean, // optional won't do anything if not defined.
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
  })
};
