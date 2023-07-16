import React from "react";
import { useState } from "react";

import css from "./Searchbar.module.css";
import { useContextArea } from "components/Context/Context";

export const SearchBar = () => {
  const context = useContextArea();
  const { searchImg, addSearchImg } = context;
  
  const [inputText, setInputText] = useState('');

  const handleInput = (e) => {
    setInputText(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    addSearchImg(inputText);
    reset();
  }

  const reset = () => {
    setInputText('');
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
          value={inputText}
        />
      </form>
    </header>
  )
}

