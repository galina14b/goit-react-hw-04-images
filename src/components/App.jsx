import React from "react";
import css from "./App.module.css"
import { Dna } from "react-loader-spinner";
import { useEffect } from "react";

import { useContextArea } from './Context/Context';
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {

  const context = useContextArea();
  
  const {searchImg, foundImg, addFoundImg, status, addStatus, page, addPage, error, addError, addFinished} = context;

  useEffect(() => {
    addFoundImg(null);
    addStatus('paginated');
    addPage(1);
    addFinished(false);

    const API = `https://pixabay.com/api/?q=${searchImg}&page=${page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
    setTimeout(fetch(API)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`картинки на тему "${searchImg}" не знайдено`))
        }
        return response.json();
      })
      .then((response) => {
        if (response.hits.length === 0) {
          addStatus('rejected');
          return Promise.reject(new Error(`картинки на тему "${searchImg}" не знайдено`))
        }
        addFoundImg(response.hits);
        addStatus('resolved');
      })
    
      .catch(error => {
        addError(error.message);
        addStatus('rejected');
      })
      , 2000)

  }, [searchImg]);

  useEffect(() => {
    addStatus('paginated');

    const API = `https://pixabay.com/api/?q=${searchImg}&page=${page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
    setTimeout(fetch(API)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error(`картинки на тему "${searchImg}" не знайдено`))
        }
        return response.json();
      })
      .then((response) => {
        if (response.hits.length === 0) {
          addStatus('rejected');
          return Promise.reject(new Error(`картинки на тему "${searchImg}" не знайдено`))
        }
        
        if ((response.totalHits - 12) <= foundImg.length) {
          addFinished(true);
          }
        addFoundImg([ ...foundImg, ...response.hits])
        addStatus('resolved');
      })
    
      .catch(error => {
        addError(error.message);
        addStatus('rejected');
      })
      , 2000)

  }, [page]);
  
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
          
            <ImageGallery />
        </div>
      )
    }
  
  
};



