import React from "react";
import PropTypes from 'prop-types';


import css from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";

export class ImageGallery extends React.Component {

  state = {
    foundImg: '',
    func: null,
  }

  componentDidMount() {
    this.setState({foundImg: this.props.foundImg, func: this.props.btnFunction})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.foundImg !== this.state.foundImg) {
      this.setState({foundImg: this.props.foundImg})
    }
  }

  render() {
    
      return (
        <>
          <ul className={css.ImageGallery}>
          {this.state.foundImg && this.state.foundImg.map(item => {
            return <ImageGalleryItem key={item.id} webformatURL={item.webformatURL} largeImageURL={item.largeImageURL}/>
          })}
          </ul>
          <Button func={this.state.func} />
        </>
      )
    // }
  }
}

ImageGallery.propTypes = {
  searchImg: PropTypes.arrayOf(PropTypes.object),
  func: PropTypes.func,
}