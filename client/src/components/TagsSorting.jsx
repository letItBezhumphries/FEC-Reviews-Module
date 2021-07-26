import React from 'react';
import PropTypes from 'prop-types';
import '../assets/reviewsStyle.css';

const TagsSorting = ({ tagList, scrollToFilter, filterByTag, reviewNumber, filterBySelect }) => {
  const tagsList = tagList.length >= 5 ? tagList.slice(0, 5) : tagList.slice(0, tagList.length);
  let filtersSection = [];

  if (tagsList.length > 0) {
    filtersSection = tagsList.map((tag, i) => (
      <span
        key={'filterTag' + i}
        className="filterTag"
        onClick={(e) => {
          e.persist();
          scrollToFilter();
        }}
      >
        <label id={tag} className="filterTagLabel" htmlFor={'reviewFilter' + i}>
          <input
            type="checkbox"
            id={'reviewFilter' + i}
            onClick={(e) => {
              e.persist();
              filterByTag(e);
            }}
          />
          <span className="filterTagOption">{`${tag} (${reviewNumber.filter((review) => review.tags.includes(tag)).length})`}</span>
        </label>
      </span>
    ));
  }

  return (
    <div id="tagsSorting" className="tagsSorting">
      <div className="dropdownFilterContainer">
        <div className="dropdownFiltersLabel">Sort by</div>
        <div className="dropdownMenu">
          <select
            name="dropdownSorting"
            id="dropdownSorting"
            onChange={(e) => {
              e.persist();
              filterBySelect(e);
            }}
          >
            <option value="Newest">Newest</option>
            <option value="Highest rating">Highest rating</option>
            <option value="Lowest rating">Lowest rating</option>
          </select>
        </div>
      </div>
      <div className="dropdownFilterContainer">
        <div className="dropdownFiltersLabel">Filters</div>
        <div className="filtersSection">{filtersSection}</div>
      </div>
    </div>
  );
};

TagsSorting.propTypes = {
  tagList: PropTypes.array,
  scrollToFilter: PropTypes.func,
  filterByTag: PropTypes.func,
  reviewNumber: PropTypes.number,
  filterBySelect: PropTypes.func
};

export default TagsSorting;
