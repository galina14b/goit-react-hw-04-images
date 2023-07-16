import React from "react";

import css from './ImageGallery.module.css';
import { useContextArea } from './../Context/Context';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";

export const ImageGallery = () => {

  const context = useContextArea();

  const { foundImg } = context;

  
  return (
    <>
      <ul className={css.ImageGallery}>
      {foundImg && <ImageGalleryItem/>}
      </ul>
      <Button />
    </>
  )
}
