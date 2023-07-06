import React from "react";
import css from "./App.module.css"

import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends React.Component {
  state = {
    searchData: '',
  }

  handleSubmit = (data) => {
    this.setState({searchData: data.searchImage})
  }

  render() {
    return (
    <div
      className={css.App}>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery searchImg={this.state.searchData} />
    </div>
  );
  }
  
};
