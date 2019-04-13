import { Component } from 'react'
import  React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { AutoComplete , Spin} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import FavouriteArtistList from './FavourtiveArtistList'

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
       
        mbid: null,
        name: "",
        imageUrl: "",
        btnText: "",
        favourite: false,
        favouriteEdited: false,
        }

        
        // this.onSelect = this.onSelect.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
        // this.clearSuggestions = this.clearSuggestions.bind(this);
        this.setAsFavourite = this.setAsFavourite.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    setAsFavourite(name , url) {
        if(this.state.favourite) {
            localStorage.removeItem(this.state.mbid, JSON.stringify(artistDetail));
            this.setState({
                btnText: "Add as favourite",
                favourite: false,
                favouriteEdited: !this.state.favouriteEdited,
            })

        } else {
            console.log("Setting " + name + " url " + url );
            this.setState({
                btnText: "Added as favourite",
                favourite: true,
                favouriteEdited: !this.state.favouriteEdited

            })
            var artistDetail = {'name': name, 'url': url, 'mbid': this.state.mbid};
            localStorage.setItem(this.state.mbid, JSON.stringify(artistDetail));
        }
    


        console.log(this.state);
    }
    goBack() {
        // window.location.href = '/'+'search?q='+this.state.name;
        // window.location.href="../";
        window.history.back();
    }
   componentWillMount()
   {
       let mbid = window.location.href;
       mbid = mbid.split("/").reverse()[0];
    //    mbid = mbid.split("")
    this.setState({
        mbid: mbid,
      
    })
    if(localStorage.getItem(mbid)) {
        this.setState({
            btnText: "Added as favourite",
            favourite: true,
        })
    } else {
        this.setState({
            btnText: "Add as favourite",
            favourite: false
        })
    }
       console.log(mbid);
    // console.log("mbid is " + mbid[0]);
    
}
componentDidMount() {
    console.log("State is " , this.state);
}

  render() {
    return (
        <div>
    
<Query
        query={GET_ARTIST_DETAILS}
        variables={{ mbid: this.state.mbid}}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return (
            <Row>
              {/* <Col span={}>
              </Col> */}
              <Col span={24}>
              <Spin spinning={true } tip="Fetching your data..." style={{padding: '20px'}}>
                {/* <Skeleton active avatar title /> */}
                <div style={{width: '100%' , height: '100vh', backgroundColor: 'black', }}
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
   
          {
              (data.lookup.artist.fanArt.backgrounds[0]) ? 
                (<div style={{width: '100%', height: '500px' ,backgroundImage: `url(${data.lookup.artist.fanArt.backgrounds[0].url})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', 
                filter: 'grayscale(0%)'
                }}>
                    
                 <div style={{backgroundColor: "black", height: '500px', position: 'relative', filter: 'opacity(35%)'}}>
                </div>
                <div style={{ width: '50%', position: 'absolute', bottom: '0px', padding: '60px'}}>
                <h1 style={{color: 'white', fontSize: '32px'}}> {data.lookup.artist.name} </h1>
                <p style={{color: 'white', maxHeight: '100px', overflow: 'scroll'}}>
                {data.lookup.artist.theAudioDB.biography}
                </p>
                <Button size={"large"}   onClick={() => this.goBack()}><Icon type="arrow-left" />Go Back</Button>
                <Button size={"large"} style={{marginLeft: "20px"}} 
              onClick={() => this.setAsFavourite(data.lookup.artist.name,data.lookup.artist.fanArt.backgrounds[0].url )}> <Icon type="heart" /> {this.state.btnText} </Button>
                </div>
                        </div>) : (<div style={{width: '100%', height: '500px' ,backgroundImage: `url(https://www.desktopbackground.org/p/2013/01/20/517949_headphones-red-backgrounds-image-of-music-hd-wallpapers_1920x1080_h.jpg)`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', 
                filter: 'grayscale(0%)'
                }}>
                    
                 <div style={{backgroundColor: "black", height: '500px', position: 'relative', filter: 'opacity(35%)'}}>
                </div>
                <div style={{ width: '50%', position: 'absolute', bottom: '0px', padding: '60px'}}>
                <h1 style={{color: 'white', fontSize: '32px'}}> {data.lookup.artist.name} </h1>
                <p style={{color: 'white', maxHeight: '100px', overflow: 'scroll'}}>
                </p>
                <Button size={"large"}  ><Icon type="arrow-left" />Go Back</Button>
                <Button size={"large"} style={{marginLeft: "20px"}} 
              onClick={() => this.setAsFavourite(data.lookup.artist.name,data.lookup.artist.fanArt.backgrounds[0].url )}> <Icon type="heart" /> {this.state.btnText} </Button>
                </div>
                        </div>)
          }
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
      <FavouriteArtistList shouldRefetch={this.state.favouriteEdited}/>




        </div>


      
    );
  }
}

// SearchBar.propTypes = {
//     getArtistName: PropTypes.func
//   };

export default ArtistDetails;
