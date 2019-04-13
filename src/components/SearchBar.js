import { Component } from 'react'
import  React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { AutoComplete , Spin} from 'antd';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import "../index.css";
// import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
import { Row, Col, Icon } from 'antd';

class SearchBar extends Component {
  constructor(props) {
		super(props)
        this.state = { 
        searchQuery: null,
        suggestions: [],
        timer: [],
        }
        this.onSelect = this.onSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
    }
    onSelect(value) {
        this.setState({
            suggestions: []
        });
        console.log(value);
        window.location.href="/search?q="+value;

        // this.props.getArtistName(value);

    }
    clearSuggestions() {
        this.setState({
            suggestions: []
        });
    }
    handleSearch = async ({ value, client }) => {
        this.setState({
            searchQuery: value,
            suggestions: []
        });

      console.log("Firing quesry with: " + this.state.searchQuery);
         {
          const { data } = await client.query({
            query: gql`
            query getData($query: String!) {
                search {
                  artists(query: $query) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
              `,
            variables: { query: this.state.searchQuery, }
          });
          var suggestions = data.search.artists.edges.map(function(eachArtist) {return eachArtist.node.name;});
          suggestions  = [...new Set(suggestions)];
        //   suggestions.length= 5;
          this.setState({
            suggestions: suggestions ? suggestions : []
          });
        }
      };
  render() {
    return (
        <ApolloConsumer>
{
    client => (
        <div className="navbar">

        <Row>
         <Col span={5} >
         <span className="navbar-text">
         <Icon type="right-circle" style={{color: 'white'}} /> Music
           </span>
         </Col>
         <Col span={14} style={{ paddingTop: '5px'}} >
         <AutoComplete
       size="large"
       onSelect={this.onSelect}
       onFocus={this.clearSuggestions}

         style={{ width: '100%', }}
        //  dataSource={this.state.suggestions}
         placeholder="Search for your favourite artist..."
         onSearch={value => {
             let that = this;
             clearInterval(this.state.timer);

              this.state.timer  = setTimeout(() => {
                 that.handleSearch({value, client})
             }, 300)
         }}           
         filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
       >
                   {this.state.suggestions.map((eachArtist, index) => {
              return (
                <AutoComplete.Option key={index} value={eachArtist}>
                  {/* <NavLink to="/login" >{eachArtist} </NavLink> */}
                  {eachArtist} 
                </AutoComplete.Option>
              );
            })}
       </AutoComplete>
       
         </Col>
         <Col span={6} >
      
         </Col>
       </Row>
   
         
        
           </div>
    )
}
  
        </ApolloConsumer>

    );
  }
}

SearchBar.propTypes = {
    getArtistName: PropTypes.func
  };

export default SearchBar;
