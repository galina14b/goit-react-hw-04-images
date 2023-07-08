import React from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';


export class Modal extends React.Component {

  state = {
    largeImageURL: null
  }

  componentDidMount() {
    this.setState({ largeImageURL: this.props.largeImageURL });
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onToggle()
    }
  }

  handleClickOnOverlay = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onToggle()
    }
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleClickOnOverlay}>
        <div className={css.Modal}>
          <img src={this.state.largeImageURL} alt="" />
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  onToggle: PropTypes.func,
}