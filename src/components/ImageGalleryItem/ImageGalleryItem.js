import React from "react";
import css from './ImageGalleryItem.module.css';
import { useState } from "react";


import { Modal } from "components/Modal/Modal";


export const ImageGalleryItem = ({webformatURL, largeImageURL}) => {
  // state = {
  //   webformatURL: null,
  //   largeImageURL: null,
  //   showModal: false,
  // };

  const [showModal, setShowModal] = useState(false);

  // componentDidMount() {
  //   this.setState({
  //     webformatURL: this.props.webformatURL,
  //     largeImageURL: this.props.largeImageURL
  //   })
  // }

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
    return (
      <>
        <li className={css.ImageGalleryItem} onClick={toggleModal}>
          <img className={css["ImageGalleryItem-image"]} src={webformatURL} alt="" />
        </li>
        {showModal && <Modal largeImageURL={largeImageURL} onToggle={toggleModal} />}
      </>
    )
}

