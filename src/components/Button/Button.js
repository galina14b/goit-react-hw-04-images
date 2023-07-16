import React from "react";
import css from './Button.module.css';
import { useContextArea } from './../Context/Context';


export const Button = () => {
  const context = useContextArea();
  const { disabled, addPage } = context;

  const downloadMoreImages = (e) => {
    e.preventDefault();
    addPage(prevState => prevState + 1);
  }

  return (
    <button type="button" disabled={disabled} className={css.Button} onClick={downloadMoreImages}>Load More</button>
  )
};



