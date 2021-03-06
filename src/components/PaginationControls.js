import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import styles from './PaginationControls.css';

import { times } from 'lodash';

const PaginationControls = props => (
  <div>
    <ul className={`${styles.pagination} pagination`}>
      <li aria-hidden={props.currentPage === 0} className={classnames({
        [styles.invisiblePaginationItem]: props.currentPage === 0,
      })}>
        <button className="btn btn-default" aria-label="Backward" onClick={props.handlePaginationToFirstPage}>
          <i className="fa fa-fast-backward" aria-hidden="true"></i>
        </button>
      </li>
      <li aria-hidden={props.currentPage === 0} className={classnames({
        [styles.invisiblePaginationItem]: props.currentPage === 0,
      })}>
        <button className="btn btn-default" aria-label="Previous" onClick={props.handlePaginationToPreviousPage}>
          <i className="fa fa-step-backward" aria-hidden="true"></i>
        </button>
      </li>
      {
        times(props.totalPages, (i) => {
          const checkVisibility = (itemIndex) => {
            return !(props.currentPage === itemIndex || props.currentPage + 1 === itemIndex || props.currentPage - 1 === itemIndex);
          }

          return (<li key={i} className={classnames({
            [styles.invisibleShrunkenPaginationItem]: checkVisibility(i),
          })}>
            <button aria-label={`Page ${i + 1}`} className={classnames("btn btn-default", {
              [styles.activePage]: i === props.currentPage,
            })} onClick={props.handlePaginationToPageNumber.bind(null, i)}>
              {i + 1}
            </button>
          </li>
        )})
      }
      <li aria-hidden={props.currentPage + 1 === props.totalPages} className={classnames({
        [styles.invisiblePaginationItem]: props.currentPage + 1 === props.totalPages,
      })}>
        <button className="btn btn-default" aria-label="Next" onClick={props.handlePaginationToNextPage}>
        <i className="fa fa-step-forward" aria-hidden="true"></i>
        </button>
      </li>
      <li aria-hidden={props.currentPage + 1 === props.totalPages} className={classnames({
        [styles.invisiblePaginationItem]: props.currentPage + 1 === props.totalPages,
      })}>
        <button className="btn btn-default" aria-label="Forward" onClick={props.handlePaginationToLastPage}>
          <i className="fa fa-fast-forward" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
    <p className={styles.paginationLegend}>Showing <strong>{props.startingItemIndex} - {props.endingItemIndex}</strong> out of <strong>{props.totalCount}</strong></p>
  </div>
);

PaginationControls.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  startingItemIndex: PropTypes.number.isRequired,
  endingItemIndex: PropTypes.number.isRequired,
  handlePaginationToNextPage: PropTypes.func.isRequired,
  handlePaginationToPreviousPage: PropTypes.func.isRequired,
  handlePaginationToPageNumber: PropTypes.func.isRequired,
};

export default PaginationControls;