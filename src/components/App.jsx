import React from "react";
import css from "./App.module.css"
import { Dna } from "react-loader-spinner";
import { useState, useEffect } from "react";

import { useContextArea } from './Context/Context';
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {

  const context = useContextArea();

  const [foundImg, setFoundImg] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const API = `https://pixabay.com/api/?q=${context.searchImg}&page=${context.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
    setTimeout(fetch(API)
        
        .then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(`картинки на тему "${context.searchImg}" не знайдено`))
          }
          return response.json();
        })
        .then((response) => {
          if (response.hits.length === 0) {
            this.setState({status: 'rejected'})
            return Promise.reject(new Error(`картинки на тему "${context.searchImg}" не знайдено`))
          }

          if (context.searchImg === null) {
            return
          }

          if ((response.hits / 12) <= context.page) {
            setFinished(true);
          }
          
          if (context.page > 1) {
            setFoundImg(prevState => 
            [...prevState, response.hits]
          );
          }

          if (context.page === 1) {
            setFoundImg(response.hits);
          }
          setStatus('resolved');
        })
    
        .catch(error => { 
          setError(error.message);
          setStatus('rejected');
        })
    , 2000)
  }, [context.page, context.searchImg])

  const downloadMoreImages = (e) => {
    e.preventDefault();
    context.addPage(prevState => 
      prevState + 1
    )
  }
  

    if (status === 'idle') {
      return (
        <div className={css.App}>
        <SearchBar />
        
        <h2>Картинки на яку тему ви шукаєте?</h2>
    </div>)
    }

    if (status === 'paginated') {
      return (
        <div className={css.App}>
          <SearchBar />
          
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )
    }

    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <SearchBar />
        
          <h2>Упс, щось пішло не так - {error}</h2>
        </div>
      )
    }

    if (status === 'resolved') {
      return (
          <div className={css.App}>
            <SearchBar />
          
            <ImageGallery foundImg={foundImg} btnFunction={downloadMoreImages} disabled={finished} />
        </div>
      )
    }

  
};

