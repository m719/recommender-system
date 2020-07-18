import React from 'react';
import { connect } from 'react-redux'

import Movie from '../../../../types/Movie';
import { ApplicationState } from '../../store'
import { fetchAllRequest } from '../../store/movies/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Movie[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchAllRequest: typeof fetchAllRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

class App extends React.Component<AllProps> {
  public componentDidMount() {
    const { fetchAllRequest: fr } = this.props
    fr()
  }

  render() {
    const { loading, data } = this.props;

    return (
      <div>
        <ul>
          { data.map(m => 
              <li key={ m.movieId }>movieId { m.movieId }; title: { m.title }, genres: { m.genres }</li>) 
          }
        </ul>
      </div>
    );
  }
}

  // It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ movies }: ApplicationState) => ({
  loading: movies.loading,
  errors: movies.errors,
  data: movies.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchAllRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
