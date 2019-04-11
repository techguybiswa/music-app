import { Component } from 'react'
import  React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { AutoComplete , Spin} from 'antd';
import PropTypes from 'prop-types';

import "../index.css";
import { Row, Col, Icon, Button } from 'antd';
const GET_ARTIST_DETAILS = gql`
query getData($mbid: MBID!) {
	lookup{
    artist(mbid: $mbid){
      name
     theAudioDB{
      biography
    }
    fanArt{
        backgrounds{
          url
        }
      }
      releases{
        nodes{
          title
          date
          coverArtArchive{
            images{
              image
            }
            
          }
        }
      }
    }
  }
}

`;
class ArtistDetails extends Component {
  constructor(props) {
		super(props)
        this.state = { 
        searchQuery: null,
        suggestions: [],
        timer: [],
        }
        // this.onSelect = this.onSelect.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
        // this.clearSuggestions = this.clearSuggestions.bind(this);
    }
   
  render() {
    return (

        <div>
    
<Query
        query={GET_ARTIST_DETAILS}
        variables={{ mbid: "122d63fc-8671-43e4-9752-34e846d62a9c" }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return (
            <Row>
              <Col span={5}>
              </Col>
              <Col span={14}>
              <Spin spinning={true } tip="Fetching your data..." style={{padding: '20px'}}>
                {/* <Skeleton active avatar title /> */}
                <div style={{width: '100%' , height: '130px'}}
                ></div>
                </Spin>
              </Col>
            </Row>
          )
          if (error) return (
            <div>            
            `Error!: ${error}`
            </div>
            );
    
          return (

            <div style={{backgroundColor: 'black' , height: '100%'}}>
            <div style={{backgroundColor: 'black', zIndex: '999', width: '100%', height: '500px'}}>
        <div style={{width: '100%', height: '500px' ,backgroundImage: `url(${data.lookup.artist.fanArt.backgrounds[0].url})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', 
    filter: 'grayscale(0%)'
    }}>
     <div style={{backgroundColor: "black", height: '500px', position: 'relative', filter: 'opacity(35%)'}}>
    </div>
    <div style={{ width: '50%', position: 'absolute', bottom: '0px', padding: '60px'}}>
    <h1 style={{color: 'white', fontSize: '32px'}}> {data.lookup.artist.name} </h1>
    <p style={{color: 'white', maxHeight: '100px', overflow: 'scroll'}}>
    {data.lookup.artist.theAudioDB.biography}
    </p>
    <Button size={"large"}  ><Icon type="arrow-left" />Go Back</Button>
    <Button size={"large"} style={{marginLeft: "20px"}}> <Icon type="heart" /> Add as favourite</Button>
    </div>
            </div>
        </div>
        <Row>
                <Col span={1}>

                </Col>
                <Col span={22}>
                <h2 style={{fontFamily: 'PingFang SC' , color: 'white', marginTop: '25px'}}>Top Releases of "{data.lookup.artist.name}"</h2>
                <Row>

                    {
                        data.lookup.artist.releases.nodes.map((eachRelease) => (
                            (eachRelease.coverArtArchive.images.length > 0) && 

                            (<Col span={4} style={{margin: '20px', height: '250px'}}>
                            <div className="album-image" style={{  backgroundImage: `url(${eachRelease.coverArtArchive.images[0].image}})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', height: '200px'  }}>
                            </div>
                            <p style={{color: "white", fontSize: '15px' , fontFamily: 'PingFang SC',}}>
                            {eachRelease.title} <br/>
                            <span style={{color: '#AAAAAA'}}>Release . {eachRelease.date}</span> 
                            </p>
                           </Col>)
                        ))
                    }
                 
                </Row>
                </Col>
                <Col span={1}>

                </Col>
              </Row>
       </div>
         
          );
        }}
      </Query>




        </div>


      
    );
  }
}

// SearchBar.propTypes = {
//     getArtistName: PropTypes.func
//   };

export default ArtistDetails;
