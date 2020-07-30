import React from 'react';
import { connect } from 'react-redux'

import Container from '../components/Generic/Container';
import Movie from '../../../types/Movie';
import MovieLink from '../../../types/MovieLink';
import { CenterHorizontallyAndVertically } from '../components/Generic/Alignment'
import { MovieDetailsTitle } from '../components/Movie/MovieDetails';
import { MovieList, MovieListElement, MovieListElementDetailsRow, MovieListElementDetailsContainer } from '../components/Movie/MovieList'; 
import { ImageWrapper, Image } from '../components/Generic/Image';
import { ApplicationState } from '../store';
import { fetchRecommendationsAndImages } from '../store/movie-recommendations/actions';
import { Spin, Tag, Progress } from 'antd';

interface PropsFromState {
  movies: Movie[]
  movieLinks: MovieLink[]
  userId: any
  movieImages: Array<{movieId: number, imagePath: string}>
  loading: boolean
  errors?: string
}

interface PropsFromDispatch {
  fetchRecommendationsAndImages: typeof fetchRecommendationsAndImages
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch;

class MovieRecommendationPage extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      rating: 0
    }
  }

  componentDidMount() {
    const { fetchRecommendationsAndImages, userId } = this.props;
    fetchRecommendationsAndImages(userId);
  }

  getMovieImage = (movieId: number) => {
    let movieImage;
    const movieImageAndId = this.props.movieImages.find(mi => mi.movieId === movieId);

    if (movieImageAndId) {
      movieImage = movieImageAndId.imagePath;
    }

    return movieImage;
  }

  getTags(genres?: string) {
    return !genres ? [] : genres.split('|');
  }

  // Currently done randomly, the backend should return a more precise percentage
  getRecPercent() {
    return Math.trunc(80 + Math.random() * 20);
  }

  render() {
    const { movies, loading } = this.props;
    if (loading) {
      return (
        <Container centered>
          <CenterHorizontallyAndVertically height={300}>
            <Spin tip="Recommendation computation in progress, it should take a few seconds..."></Spin>
          </CenterHorizontallyAndVertically>
        </Container>
      )
    }

    return (
      <Container centered>
        <MovieList>
        {movies.map(m => 
          <MovieListElement key={m.movieId}>
            <ImageWrapper height={300}>
              <Image src={this.getMovieImage(m.movieId)} />
            </ImageWrapper>
              <MovieListElementDetailsContainer>
                <MovieListElementDetailsRow>
                  <MovieDetailsTitle>
                    {m.title}
                  </MovieDetailsTitle>
                </MovieListElementDetailsRow>
                <MovieListElementDetailsRow>
                    {this.getTags(m.genres).map((tag) => {
                      return <Tag key={tag}>{tag}</Tag>
                    })}
                </MovieListElementDetailsRow>
                <MovieListElementDetailsRow>
                  Recommendation level:
                  <Progress
                    type="circle"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    status="active"
                    percent={this.getRecPercent()}
                    width={65}
                  />
                </MovieListElementDetailsRow>
              </MovieListElementDetailsContainer>
          </MovieListElement>
        )}
        </MovieList>
      </Container>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ movieRating, users, movieRecommendations }: ApplicationState) => ({
  userId: users.id,
  loading: movieRecommendations.loading,
  errors: movieRecommendations.errors,
  movies: movieRecommendations.movies,
  movieLinks: movieRecommendations.movieLinks,
  movieImages: movieRecommendations.movieImages
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRecommendationsAndImages
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieRecommendationPage);
