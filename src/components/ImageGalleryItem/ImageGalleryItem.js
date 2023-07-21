import React from "react";
import css from './ImageGalleryItem.module.css';
import { useState } from "react";


import { Modal } from "components/Modal/Modal";


export const ImageGalleryItem = ({id, webformatURL, largeImageURL}) => {

  const [showModal, setShowModal] = useState(false);

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

