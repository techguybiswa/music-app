import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import SearchPage from './pages/SearchPage'
// import ArtistList from './components/ArtistList';
// import SearchBar from './components/SearchBar';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ArtistDetailsPage from './pages/ArtistDetailsPage';
import logo from './logo.svg';
import ArtistSearchResult from './components/ArtistSearchResult'
import './App.css';
import { Route } from 'react-router-dom'
const client = new ApolloClient({
  uri: "https://graphbrainz.herokuapp.com/"
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        artistSearchQuery: '',
    } 
    this.getArtistName = this.getArtistName.bind(this);
  }
  getArtistName(name) {
    this.setState({
      artistSearchQuery: name
    })
  }
  render() {
    return (
      <ApolloProvider client={client}>
            {/* <SearchBar getArtistName={this.getArtistName}/>  */}
        {/* <ArtistList searchQuery={this.state.artistSearchQuery}/> */}
  {/* <ArtistDetails/> */}
  <Route exact path="/" component={SearchPage} />
  <Route exact path="/search" component={SearchPage} />

  <Route exact path="/artist-details/:mbid" component={ArtistDetailsPage}   />
      </ApolloProvider>
    );
  }
}

export default App;
