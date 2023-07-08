import React from "react";
import css from './Button.module.css';
import PropTypes from 'prop-types';


export const Button = ({ func }) => {
  return (
    <button type="button" className={css.Button} onClick={func}>Load More</button>
  )
};

Button.propTypes = {
  func: PropTypes.func,
}