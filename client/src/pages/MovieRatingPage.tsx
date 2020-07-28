import React from 'react';
import { connect } from 'react-redux'

import Container from '../components/Generic/Container';
import Movie from '../../../types/Movie';
import MovieLink from '../../../types/MovieLink';
import { ApplicationState } from '../store'
import { fetchTmdbDetails, fetchRandomRequest, addMovieRating } from '../store/movie-rating/actions'
import { MovieDetailsTitle, MovieDetailsRow, MovieDetailsContainer, MovieRatedNumber } from '../components/Movie/MovieDetails';
import { Button, Rate} from 'antd';
import { ImageWrapper, Image } from '../components/Generic/Image';

interface PropsFromState {
  movie: Movie
  movieLink: MovieLink
  loading: boolean
  errors?: string
  ratedMovies: any[]
  skippedMovies: number[]
  movieImagePath: string
}

interface PropsFromDispatch {
  fetchTmdbDetails: typeof fetchTmdbDetails
  fetchRandomRequest: typeof fetchRandomRequest
  addMovieRating: typeof addMovieRating
}

interface State {
  rating: number
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class MovieRatingPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      rating: 0
    }
  }

  componentDidMount() {
    this.fetchRandomMovieWithAssociatedImage();
  }

  fetchRandomMovieWithAssociatedImage() {
    const { fetchRandomRequest, fetchTmdbDetails } = this.props;
    
    fetchRandomRequest();
    fetchTmdbDetails();
  }

  handleRateChange = (value: number) => {
    const { addMovieRating, movie } = this.props;
    const movieId = movie.movieId;
    addMovieRating({ movieId, rating: value })
    this.fetchRandomMovieWithAssociatedImage();
    this.setState({
      rating: 0
    })
  }

  render() {
    const { movie, movieImagePath, ratedMovies } = this.props;
    const self = this;
    return (
      <Container centered>
        <MovieDetailsContainer height={480}>
          <MovieDetailsRow>
            <MovieRatedNumber>{ratedMovies.length} / 10</MovieRatedNumber>
          </MovieDetailsRow>
          <MovieDetailsRow>
            <MovieDetailsTitle>
              { movie ? (
                movie.title
              ) : <div />}
            </MovieDetailsTitle>
          </MovieDetailsRow>
          <MovieDetailsRow>
            <ImageWrapper height={300}>
              <Image src={movieImagePath} />
            </ImageWrapper>
          </MovieDetailsRow>
          <MovieDetailsRow>
            <Rate style={{background: '#b9d9eb'}} allowClear defaultValue={0} onChange={this.handleRateChange} value={this.state.rating} />
          </MovieDetailsRow>
          <MovieDetailsRow>
            <Button type="link" onClick={() => this.fetchRandomMovieWithAssociatedImage()}>Have not seen ? Skip !</Button>
          </MovieDetailsRow>
        </MovieDetailsContainer>
      </Container>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ movieRating }: ApplicationState) => ({
  movie: movieRating.movie,
  movieLink: movieRating.movieLink,
  loading: movieRating.loading,
  errors: movieRating.errors,
  ratedMovies: movieRating.ratedMovies,
  skippedMovies: movieRating.skippedMovies,
  movieImagePath: movieRating.movieImagePath
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRandomRequest,
  fetchTmdbDetails,
  addMovieRating
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieRatingPage);
