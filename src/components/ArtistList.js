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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
 <Row style={{marginTop: '80px'}}>
 <h2 style={{fontFamily: 'PingFang SC' , color: 'white', }}>Top Artist Suggestions</h2>

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
          <div style={{width: '100%' , height: '250px', backgroundColor: 'black', filter: 'opacity(50%)' , margin: '100px'}}
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


            (
              
              <Col span={4} style={{margin: '15px', height: '250px'}}>
          <NavLink  to={`artist-details/${eachArtist.mbid}`} mbid={eachArtist.mbid}>

    {/* <div className="album-image" style={{  backgroundImage: `url(${eachArtist.image})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', height: '200px'  }}>
    </div> */}
    <div className="album-image">
      <LazyLoadImage
      alt={eachArtist.name}
      effect="blur"
      height={'200px'}
      placeholderSrc={'data:image/jpeg;base64,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'}
      src={eachArtist.image} />
    </div>
   
    </NavLink>
    <p style={{color: "white", fontSize: '15px' , fontFamily: 'PingFang SC',}}>
    {eachArtist.name} <br/>
    <span style={{color: '#AAAAAA'}}>Music Artist </span> 
    </p>
   </Col>
   )
          
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
