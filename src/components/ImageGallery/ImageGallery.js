import React from "react";
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";

export class ImageGallery extends React.Component {

  state = {
    foundImg: null,
    page: 1,
    status: 'idle',
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchImg = prevProps.searchImg;
    const newSearchImg = this.props.searchImg;
    if (prevSearchImg !== newSearchImg) {
      this.setState({ status: 'paginated', page: 1 })
      const API = `https://pixabay.com/api/?q=${this.props.searchImg}&page=${this.state.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
      fetch(API)
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

          this.setState({ foundImg: response.hits, status: 'resolved' })
        })
    
        .catch(error => this.setState({error: error.message, status: 'rejected'}))
    }

    if (prevSearchImg === newSearchImg && prevState.page !== this.state.page) {
      this.setState({ status: 'paginated'})
      const API = `https://pixabay.com/api/?q=${this.props.searchImg}&page=${this.state.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
      fetch(API)
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

          this.setState({ foundImg: response.hits, status: 'resolved' })
        })
    
        .catch(error => this.setState({error: error.message, status: 'rejected'}))
    }
  }

  downloadMoreImages = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      }
    })
  }

  render() {
    const { status, foundImg, error } = this.state;

    if (status === 'idle') {
      return <h2>Картинки на яку тему ви шукаєте?</h2>
    }

    if (status === 'paginated') {
      return <h2>Завантаження триває...</h2>
    }

    if (status === 'rejected') {
      return <h2>Упс, щось пішло не так - {error}</h2>
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
          {foundImg && foundImg.map(item => {
            return <ImageGalleryItem key={item.id} webformatURL={item.webformatURL} largeImageURL={item.largeImageURL} />
          })}
          </ul>
          <Button func={this.downloadMoreImages} />
        </>
      )
    }
  }
}

ImageGallery.prototypes = {
  searchImg: PropTypes.arrayOf(PropTypes.object)
}