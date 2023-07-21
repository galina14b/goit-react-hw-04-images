import React from "react";

import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";

export const ImageGallery = ({ foundImg, btnFunction, disabled }) => {

  return (
    <>
          <ul className={css.ImageGallery}>
        {foundImg && foundImg.map(item => {
              return (
                
                <ImageGalleryItem key={item.id} webformatURL={item.webformatURL} largeImageURL={item.largeImageURL} />
          )})}
          </ul>
          <Button func={btnFunction} disabled={disabled} />
        </>
  )
}


ImageGallery.propTypes = {
  foundImg: PropTypes.array,
  btnFunction: PropTypes.func,
  disabled: PropTypes.bool,
}
