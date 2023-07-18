import React from "react";

import css from './ImageGallery.module.css';
// import { useContextArea } from './../Context/Context';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";

export const ImageGallery = ({ foundImg, btnFunction, disabled }) => {

  // state = {
  //   foundImg: '',
  //   func: null,
  //   disabled: null,
  // }

  // useEffect(() => {

  // }, [foundImg]);
  

  // componentDidUpdate(prevProps) {
  //   if (prevProps.foundImg !== this.state.foundImg) {
  //     this.setState({foundImg: this.props.foundImg})
  //   }
  // }

    
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
    // }
}

