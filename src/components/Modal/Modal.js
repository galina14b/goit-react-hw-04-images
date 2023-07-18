import React from "react";
import css from './Modal.module.css';
import { useEffect } from "react";


export const Modal = ({largeImageURL, onToggle}) => {

  // state = {
  //   largeImageURL: null
  // }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return (
      window.removeEventListener('keydown', handleKeyDown)

    )
  })
  // componentDidMount() {
  //   this.setState({ largeImageURL: this.props.largeImageURL });
  //   window.addEventListener('keydown', this.handleKeyDown)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown)
  // }

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      onToggle()
    }
  }

  const handleClickOnOverlay = (event) => {
    if (event.currentTarget === event.target) {
      onToggle()
    }
  }

    return (
      <div className={css.Overlay} onClick={handleClickOnOverlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    )
}

// Modal.propTypes = {
//   largeImageURL: PropTypes.string,
//   onToggle: PropTypes.func,
// }