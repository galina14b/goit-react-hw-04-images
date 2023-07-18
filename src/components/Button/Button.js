import React from "react";
import css from './Button.module.css';


export const Button = ({ func, disabled }) => {
  return (
    <button type="button" disabled={disabled} className={css.Button} onClick={func}>Load More</button>
  )
};

// Button.propTypes = {
//   func: PropTypes.func,
//   disabled: PropTypes.bool,
// }


