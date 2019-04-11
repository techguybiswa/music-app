import React, { Component } from 'react';
import 'antd/dist/antd.css'; 
import ArtistList from '../components/ArtistList';
import SearchBar from '../components/SearchBar';
import ArtistDetails from '../components/ArtistDetails';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import '../App.css';
const client = new ApolloClient({
  uri: "https://graphbrainz.herokuapp.com/"
});
class ArtistDetailsPage extends Component {
  constructor({props}) {
    super(props);
    this.state = {
        artistSearchQuery: '',
    } 
    console.log("From artists detail page " , this.props);

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
            <ArtistDetails />
             </div>
    );
  }
}

export default ArtistDetailsPage;
