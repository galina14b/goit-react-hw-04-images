import React from "react";
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';


import { Modal } from "components/Modal/Modal";

export class ImageGalleryItem extends React.Component {
  state = {
    webformatURL: null,
    largeImageURL: null,
    showModal: false,
  };

  componentDidMount() {
    this.setState({
      webformatURL: this.props.webformatURL,
      largeImageURL: this.props.largeImageURL
    })
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }
  
  render() {
    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
          <img className={css["ImageGalleryItem-image"]} src={this.state.webformatURL} alt="" />
        </li>
        {this.state.showModal && <Modal largeImageURL={this.state.largeImageURL} onToggle={this.toggleModal} />}
      </>
    )
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
}