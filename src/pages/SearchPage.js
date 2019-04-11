import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import ArtistList from '../components/ArtistList';
import SearchBar from '../components/SearchBar';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ArtistDetails from '../components/ArtistDetails';
import '../App.css';
import { parse } from 'url';
const client = new ApolloClient({
  uri: "https://graphbrainz.herokuapp.com/"
});
class SearchPage extends Component {
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
           <div>
              <SearchBar getArtistName={this.getArtistName}/> 
        <ArtistList searchQuery={this.state.artistSearchQuery}/>
             </div>
    );
  }
}

export default SearchPage;
