import { Component } from 'react'
import  React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { AutoComplete , Spin, message} from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import FavouriteArtistList from './FavourtiveArtistList'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

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
        this.setFavouriteButtonStatus = this.setFavouriteButtonStatus.bind(this);
    }

    setAsFavourite(name , url) {
        if(this.state.favourite) {
            localStorage.removeItem(this.state.mbid, JSON.stringify(artistDetail));
            message.warning('Removed from favourite');

            this.setState({
                btnText: "Add as favourite",
                favourite: false,
                favouriteEdited: !this.state.favouriteEdited,
            })

        } else {
            console.log("Setting " + name + " url " + url );
            message.success('Added as favourite');
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
    setFavouriteButtonStatus() {
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
    }
   componentWillMount()
   {
       this.setFavouriteButtonStatus();
       message.config({
        bottom: 200,
        duration: 2,
        maxCount: 3,
      });
    // console.log("mbid is " + mbid[0]);
    
}

componentDidUpdate(prevProps, prevState){  
    console.log("Updating Shit.....");
    let mbid = window.location.href;
    mbid = mbid.split("/").reverse()[0];
 //    mbid = mbid.split("")
     console.log(prevState  );
    if(prevState.mbid!==mbid){
        this.setFavouriteButtonStatus();

        window.scrollTo(0, 0);

        this.setState({
            mbid: mbid,
          
        })
    }
 }


componentDidMount() {
    console.log("State is " , this.state);
    window.scrollTo(0, 0);

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
              <Spin spinning={true } tip="Fetching artist data..." style={{padding: '20px'}}>
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

                <Button size={"large"} style={{marginLeft: "10px"}} 
              onClick={() => this.setAsFavourite(data.lookup.artist.name,data.lookup.artist.fanArt.backgrounds[0].url )}>
                {!this.state.favourite ?     <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> :     <Icon type="check-circle" theme="twoTone"  twoToneColor="#eb2f96" />}
               {this.state.btnText} </Button>
                              <NavLink to="/"><Button style={{marginLeft: "10px"}}  size={"large"}><Icon type="home" />Home</Button></NavLink>

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
        <FavouriteArtistList shouldRefetch={this.state.favouriteEdited}/>

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
                            {/* <div className="album-image" style={{  backgroundImage: `url(${eachRelease.coverArtArchive.images[0].image}})`, backgroundSize : 'cover', backgroundRepeat: 'no-repeat', height: '200px'  }}>
                            </div> */}
                             <div className="album-image">
                                <LazyLoadImage
                                alt={eachRelease.title}
                                effect="blur"
                                height={'200px'}
                                placeholderSrc={'data:image/jpeg;base64,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'}
                                src={eachRelease.coverArtArchive.images[0].image} />
                            </div>
                            <p style={{color: "white", fontSize: '15px' , fontFamily: 'PingFang SC',}}>
                            <b>{eachRelease.title}</b> <br/>
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
