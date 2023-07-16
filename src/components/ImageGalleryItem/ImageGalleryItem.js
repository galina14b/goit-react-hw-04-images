import React from "react";
import css from './ImageGalleryItem.module.css';

import { useContextArea } from './../Context/Context';
import { Modal } from "components/Modal/Modal";


export const ImageGalleryItem = () => {

  const context = useContextArea();

  const { showModal, addShowModal, foundImg, largeImageURL, addLargeImageURL } = context;
  
  const toggleModal = () => {
    addShowModal(!showModal);
  }
  
  return (
    foundImg.map(item => {
      return (
        <>
      <li key={item.id} className={css.ImageGalleryItem} onClick={toggleModal}>
        <img className={css["ImageGalleryItem-image"]} src={item.webformatURL} alt="" />
      </li>
      {showModal && <Modal />}
    </>
    )
    })
  )
}

