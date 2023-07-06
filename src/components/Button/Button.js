import React from "react";
import css from './Button.module.css';

export const Button = ({func}) => {
  return (
    <button type="button" className={css.Button} onClick={func}>Load More</button>
  )
}