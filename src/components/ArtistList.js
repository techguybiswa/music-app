import { Component } from 'react'
import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col , Avatar, Skeleton, Spin, Tag} from 'antd';
import "../index.css";
import { NavLink } from 'react-router-dom'
import { Route } from "react-router-dom";
import FavouriteArtistList from './FavourtiveArtistList'
import ArtistSearchResult from './ArtistSearchResult'
const GET_TOP_ARTISTS = gql`
query getData {
  lastFM{
    chart{
      topArtists{
        nodes{
          name
          image
          mbid
        }
      }
    }
  }
  }
`;


class ArtistList extends Component {
  constructor(props) {
    super(props)
   
    this.state = { 
      artists: null,
      artistSearchName: false,
      favourites: [],
    }
    this.fetchListOfFavourite = this.fetchListOfFavourite.bind(this);
  }

  fetchListOfFavourite() {
    let listOfFavourite= [];
    for(var i=0;i<localStorage.length;i++) {
      let eachFavourite = localStorage.getItem(localStorage.key(i));
      eachFavourite = JSON.parse(eachFavourite);
      listOfFavourite.push(eachFavourite)
    }
   console.log("listOfFavourite " , listOfFavourite);
    return listOfFavourite;
  }

 

  onDogFetched = data => {
    console.log(data);
    this.setState(() => ({ artists: data }));
  }
   
 componentDidMount() {
  window.scrollTo(0, 0);

   let listOfFavourite = this.fetchListOfFavourite();
   console.log("fav " , listOfFavourite);
   this.setState({
    favourites: listOfFavourite
   })
 }
  render() {
    return (
    <div style={{background: 'black', height: '100%'}}>

      <ArtistSearchResult/>
      <FavouriteArtistList/>
    { 
       <div>
       
     

 


<Row>

 <Col span={1}>

</Col> 
<Col span={22}>
 <Row>
 <h2 style={{fontFamily: 'PingFang SC' , color: 'white', paddingTop: '20px'}}>Top Artist Suggestions</h2>

{
  <Query query={GET_TOP_ARTISTS}>
  {({ loading, error, data }) => {
     if (loading) return (
      <Row style={{marginBottom: '100px' }}>
        {/* <Col span={}>
        </Col> */}
        <Col span={24}>
        <Spin spinning={true } tip="Fetching top artist list data..." style={{padding: '20px' , }}>
          {/* <Skeleton active avatar title /> */}
          <div style={{width: '100%' , height: '70px', backgroundColor: 'black', filter: 'opacity(50%)' , margin: '100px'}}
          ></div>
          </Spin>
        </Col>
      </Row>
    )
    if (error) return  (
      <Row style={{marginBottom: '100px' }}>
        {/* <Col span={}>
        </Col> */}
        <Col span={24}>
          {/* <Skeleton active avatar title /> */}
          <div style={{width: '100%' , height: '70px', backgroundColor: 'black', filter: 'opacity(50%)' , margin: '100px'}}
          >
          <h1 style={{color: 'red'}}>`Error! ${error.message}`;</h1>
          </div>
        </Col>
      </Row>
    )  

    return (
        data.lastFM.chart.topArtists.nodes.map(eachArtist => (
          (eachArtist.mbid) &&
            (<Col span={4} style={{margin: '15px', height: '250px'}}>
          <NavLink  to={`artist-details/${eachArtist.mbid}`} mbid={eachArtist.mbid}>

    <div className="album-image" style={{  backgroundImage: `url(${eachArtist.image})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', height: '200px'  }}>
    </div>
    </NavLink>
    <p style={{color: "white", fontSize: '15px' , fontFamily: 'PingFang SC',}}>
    {eachArtist.name} <br/>
    <span style={{color: '#AAAAAA'}}>Music Artist </span> 
    </p>
   </Col>)
          
        ))
    );
  }}
</Query>
}
 </Row>
</Col>
      <Col span={1}>

</Col>
</Row>
       </div>
    }
    
      
    </div>
    );
  }
}
export default ArtistList;
