import React from "react";
import css from './Modal.module.css';
import { useEffect } from "react";

import { useContextArea } from './../Context/Context';



export const Modal = () => {

  const context = useContextArea();
  const { largeImageURL, showModal, addShowModal } = context;

  const toggleModal = () => {
    addShowModal(!showModal);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return (
      window.removeEventListener('keydown', handleKeyDown)
    )
  }, [])

  const handleKeyDown = (event) => {
    console.log(event.code)
    if (event.code === "Escape") {
      toggleModal();
    }
  }

  const handleClickOnOverlay = (event) => {
    if (event.currentTarget === event.target) {
      toggleModal();
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