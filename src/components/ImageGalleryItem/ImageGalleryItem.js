import React from "react";
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({webformatURL, largeImageURL}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css["ImageGalleryItem-image"]} src={webformatURL} alt="" />
    </li>
  )
}