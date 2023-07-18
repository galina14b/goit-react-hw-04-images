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
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [finished] = useState(false);
  // state = {
  //   searchImg: ' ',
  //   foundImg: null,
  //   page: 1,
  //   status: 'idle',
  //   error: null,
  //   finished: false,
  // }

  useEffect(() => {
    const API = `https://pixabay.com/api/?q=${context.searchImg}&page=${page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
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

          // if (page > 1 && ((response.totalHits - 12) >= counts )) {
          //   setFinished(true);
          // }

          
          if (page > 1) {
            setFoundImg(prevState => 
            [...prevState, response.hits]
          );
          }

          if (page === 1) {
            setFoundImg(response.hits);
          }
          setStatus('resolved');
          // setCounts(prevState => prevState + 1);
        })
    
        .catch(error => { 
          setError(error.message);
          setStatus('rejected');
        })
    , 2000)
  }, [context.searchImg, page])

  // componentDidUpdate(prevProps, prevState) {
    // const prevSearchImg = prevState.searchImg;
    // const newSearchImg = this.state.searchImg;
    // if (prevSearchImg !== newSearchImg) {
    //   this.setState({
    //     foundImg: null,
    //     status: 'paginated',
    //     page: 1,
    //     finished: false
    //   })
    //   const API = `https://pixabay.com/api/?q=${newSearchImg}&page=${this.state.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
    //   setTimeout(fetch(API)
    //     .then(response => {
    //       if (!response.ok) {
    //         return Promise.reject(new Error(`картинки на тему "${newSearchImg}" не знайдено`))
    //       }
    //       return response.json();
    //     })
    //     .then((response) => {
    //       if (response.hits.length === 0) {
    //         this.setState({status: 'rejected'})
    //         return Promise.reject(new Error(`картинки на тему "${newSearchImg}" не знайдено`))
    //       }
    //       this.setState({ foundImg: response.hits, status: 'resolved' })
    //     })
    
    //     .catch(error => this.setState({error: error.message, status: 'rejected'}))
    // , 2000)}

  //   if (prevSearchImg === newSearchImg && prevState.page !== this.state.page) {
  //     this.setState({ status: 'paginated'})
  //     const API = `https://pixabay.com/api/?q=${newSearchImg}&page=${this.state.page}&key=30987365-3fb5ba0bc2c11b9a856e6023e&image_type=photo&orientation=horizontal&per_page=12`;
  //     setTimeout(fetch(API)
  //       .then(response => {
  //         if (!response.ok) {
  //           return Promise.reject(new Error(`Картинки на тему "${newSearchImg}" не знайдено`))
  //         }
  //         return response.json();
  //       })
  //       .then((response) => {
  //         if (response.hits.length === 0) {
  //           this.setState({status: 'rejected'})
  //           return Promise.reject(new Error(`Картинки на тему "${newSearchImg}" не знайдено`))
  //         }

  //         if ((response.totalHits - 12) <= this.state.foundImg.length) {
  //           this.setState({ finished: true })
  //         }
  //         this.setState(prevState => ({ foundImg: [ ...prevState.foundImg, ...response.hits], status: 'resolved' }))
          
  //       })
    
  //       .catch(error => this.setState({error: error.message, status: 'rejected'}))
  //       , 2000)
  //   }
    
  // }

  // handleSubmit = (data) => {
  //   this.setState({searchImg: data.searchImage})
  // }

  const downloadMoreImages = (e) => {
    e.preventDefault();
    setPage(prevState => 
      prevState + 1
    )
    // this.setState(prevState => {
    //   return {
    //     page: prevState.page + 1,
    //   }
    // })
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

// App.propTypes = {
//   data: PropTypes.string,
// }