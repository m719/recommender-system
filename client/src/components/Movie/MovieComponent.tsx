import React from 'react';
import './App.css';

import MovieDbService from '../../api/MovieDbService';
import Movie from '../../types/Movie';

class MovieComponent extends React.Component {
  async componentDidMount() {
    const res = await MovieDbService.getMovie();
    const data = res.data;
    console.log(data);
  }


  render() {
    return (
      <div className="App">
        Coucou
      </div>
    );
  }
}

export default MovieComponent;
