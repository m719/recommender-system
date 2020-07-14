import React from 'react';
import './App.css';

import MovieDbService from '../api/MovieDbService';
import Movie from '../../../types/Movie';
// import Header from './Header';

interface State {
  movies: Movie[]
}

class App extends React.Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      movies: []  
    };
  }

  async componentDidMount() {
    const res = await MovieDbService.getMovie();
    const data = res.data.movies;
    this.setState({
      movies: data
    })
  }


  render() {
    return (
      <div className="App">
        <ul>
          { this.state.movies.map(m => 
              <li key={parseInt(m.movieId)}>movieId { m.movieId }; title: { m.title }, genres: { m.genres }</li>) 
          }
        </ul>
      </div>
    );
  }
}

export default App;
