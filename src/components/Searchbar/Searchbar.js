import React from "react";
import { useState } from "react";

import css from "./Searchbar.module.css";
import { useContextArea } from "components/Context/Context";

export const SearchBar = () => {

  const context = useContextArea();

  const [inputImg, setInputImg] = useState('');

  const handleInput = (e) => {
    setInputImg(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    context.addPage(1);
    context.addSearchImg(inputImg);
    reset();
  }

  const reset = () => {
    setInputImg('');
  }

    return(
    <header className={css.Searchbar}>
      <form className={css['Searchbar-form']} onSubmit={submitForm}>
        <button type="submit" className={css["SearchForm-button"]}>
          <span className={css["SearchForm-button-label"]}>Search</span>
        </button>

        <input
          className={css["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={inputImg}
        />
      </form>
      </header>
    )

}