import React from 'react';
import { connect } from 'react-redux'

import Container from '../components/Generic/Container';
import Movie from '../../../types/Movie';
import MovieLink from '../../../types/MovieLink';
import { ApplicationState } from '../store'
import { fetchTmdbDetails } from '../store/movie-rating/actions'
import { fetchRandomRequest } from '../store/movie-rating/actions'
import { MovieDetailsTitle, MovieDetailsRow, MovieDetailsContainer } from '../components/Movie/MovieDetails';
import { Button, Rate} from 'antd';
import { ImageWrapper, Image } from '../components/Generic/Image';

interface PropsFromState {
  movie: Movie
  movieLink: MovieLink
  loading: boolean
  errors?: string
  ratedMovies: any[]
  skippedMovies: any[]
  movieImagePath: string
}

interface PropsFromDispatch {
  fetchTmdbDetails: typeof fetchTmdbDetails
  fetchRandomRequest: typeof fetchRandomRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class MovieRatingPage extends React.Component<AllProps> {
  componentDidMount() {
    this.fetchRandomMovieWithAssociatedImage();
  }

  fetchRandomMovieWithAssociatedImage() {
    const { fetchRandomRequest, fetchTmdbDetails } = this.props;
    
    fetchRandomRequest();
    fetchTmdbDetails();
  }

  render() {
    const { movie, movieLink, movieImagePath } = this.props;
    return (
      <Container centered>
        <MovieDetailsContainer height={450}>
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
            <Rate defaultValue={3} />
          </MovieDetailsRow>
          <MovieDetailsRow>
            <Button type="primary">Have not seen</Button>
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
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRandomRequest,
  fetchTmdbDetails
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieRatingPage);
