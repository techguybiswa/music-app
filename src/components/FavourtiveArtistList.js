import { Component } from 'react'
import React from 'react';
import gql from "graphql-tag";
import { Row, Col , Avatar, Skeleton, Spin, Tag} from 'antd';
import "../index.css";
import { NavLink } from 'react-router-dom'




class FavouriteArtistList extends Component {
  constructor(props) {
    super(props)
   
    this.state = { 
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
   this.setState({
    favourites: listOfFavourite
   })
    return listOfFavourite;
  }
   
  componentDidUpdate(prevProps, prevState){  
    
    if(prevProps.shouldRefetch!==this.props.shouldRefetch){
        console.log("Refetching...");
        this.fetchListOfFavourite();
    }
 }
 componentDidMount() {
   let listOfFavourite = this.fetchListOfFavourite();
   console.log("fav " , listOfFavourite);
   this.setState({
    favourites: listOfFavourite
   })
 }
  render() {
    return (
    <div style={{background: 'black', height: '100%'}}>

    { (!this.state.artistSearchName )  &&
       <div>
         <Row>
       <Col span={1}>

       </Col>
       <Col span={14}>
       {
         (this.state.favourites.length) &&
         <h2 style={{fontFamily: 'PingFang SC' , color: 'white', paddingTop: '20px'}}>
           My Favourite Artists
         </h2>
       }
       </Col>
     </Row>
     

  <Row>
 
  <Col span={1}>

</Col>
<Col span={22}>
  <Row>
{    
  this.state.favourites.map((eachArtist) => (
        (<Col span={4} style={{margin: '15px', height: '250px'}}>
              <NavLink  to={`artist-details/${eachArtist.mbid}`} mbid={eachArtist.mbid}>

        <div className="album-image" style={{  backgroundImage: `url(${eachArtist.url})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', height: '200px'  }}>
        </div>
        </NavLink>
        <p style={{color: "white", fontSize: '15px' , fontFamily: 'PingFang SC',}}>
        {eachArtist.name} <br/>
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
    }
    
      
    </div>
    );
  }
}
export default FavouriteArtistList;
