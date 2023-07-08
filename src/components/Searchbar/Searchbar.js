import React from "react";
import css from "./Searchbar.module.css";


export class SearchBar extends React.Component {
  state = {
    searchImage: '',
  }

  handleInput = (e) => {
    this.setState({searchImage: e.target.value})
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  }

  reset = () => {
    this.setState({searchImage: ''})
  }

  render() {
    return(
    <header className={css.Searchbar}>
      <form className={css['Searchbar-form']} onSubmit={this.submitForm}>
        <button type="submit" className={css["SearchForm-button"]}>
          <span className={css["SearchForm-button-label"]}>Search</span>
        </button>

        <input
          className={css["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleInput}
          value={this.state.searchImage}
        />
      </form>
      </header>
    )
  }
}