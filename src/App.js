import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import ArtistList from './components/ArtistList';
import SearchBar from './components/SearchBar';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ArtistDetails from './components/ArtistDetails';
import logo from './logo.svg';
import './App.css';
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
            <SearchBar getArtistName={this.getArtistName}/> 
        {/* <ArtistList searchQuery={this.state.artistSearchQuery}/> */}
  <ArtistDetails/>
      </ApolloProvider>
    );
  }
}

export default App;
