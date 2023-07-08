import React from "react";
import css from "./App.module.css"
import { Dna } from "react-loader-spinner";
import PropTypes from 'prop-types';


import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends React.Component {
  state = {
    searchImg: ' ',
    foundImg: null,
    page: 1,
    status: 'idle',
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchImg = prevState.searchImg;
    const newSearchImg = this.state.searchImg;
    if (prevSearchImg !== newSearchImg) {
      this.setState({ status: 'paginated', page: 1 })
      const API = `https://pixabay.com/api/?q=${newSearchImg}&page=${this.state.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
      setTimeout(fetch(API)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(`картинки на тему "${newSearchImg}" не знайдено`))
          }
          return response.json();
        })
        .then((response) => {
          if (response.hits.length === 0) {
            this.setState({status: 'rejected'})
            return Promise.reject(new Error(`картинки на тему "${newSearchImg}" не знайдено`))
          }

          this.setState({ foundImg: response.hits, status: 'resolved' })
        })
    
        .catch(error => this.setState({error: error.message, status: 'rejected'}))
    , 2000)}

    if (prevSearchImg === newSearchImg && prevState.page !== this.state.page) {
      this.setState({ status: 'paginated'})
      const API = `https://pixabay.com/api/?q=${newSearchImg}&page=${this.state.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
      setTimeout(fetch(API)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(`Картинки на тему "${newSearchImg}" не знайдено`))
          }
          return response.json();
        })
        .then((response) => {
          if (response.hits.length === 0) {
            this.setState({status: 'rejected'})
            return Promise.reject(new Error(`Картинки на тему "${newSearchImg}" не знайдено`))
          }

          this.setState(prevState => ({ foundImg: [ ...prevState.foundImg, ...response.hits], status: 'resolved' }))
        })
    
        .catch(error => this.setState({error: error.message, status: 'rejected'}))
        , 2000)
    }
    
  }

  handleSubmit = (data) => {
    this.setState({searchImg: data.searchImage})
  }

  downloadMoreImages = (e) => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      }
    })
  }

  render() {
    
    const { status, foundImg, error } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.App}>
        <SearchBar onSubmit={this.handleSubmit} />
        
        <h2>Картинки на яку тему ви шукаєте?</h2>
    </div>)
    }

    if (status === 'paginated') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.handleSubmit} />
          
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )
    }

    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.handleSubmit} />
        
          <h2>Упс, щось пішло не так - {error}</h2>
        </div>
      )
    }

    if (status === 'resolved') {
      return (
          <div className={css.App}>
            <SearchBar onSubmit={this.handleSubmit} />
          
            <ImageGallery foundImg={foundImg} btnFunction={this.downloadMoreImages} />
        </div>
      )
    }
  }
  
};

App.propTypes = {
  data: PropTypes.string,
}
