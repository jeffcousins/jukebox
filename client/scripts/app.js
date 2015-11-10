/** @jsx React.DOM */

var App = React.createClass({
  // functions
  grabSongs: getSongs,
  render: function() {
    return (<div>
            Main App
            <SearchBar grabSongs={this.grabSongs} />

            </div>)
  }
});


var SearchBar = React.createClass({
  // initial state
  
  getInitialState: function() {
    return {searchString: '',
            songs: []}
  },
  handleChange: function(e) {
    console.log('handlechange happened');
    e.preventDefault;
    this.setState({searchString: e.target.value})
  },
  handleSongs: function(e) {
    console.log('handlesongs happened')
    e.preventDefault;
  },
  getSongs: function(e) {
    e.preventDefault;
    var context = this;
    var query = context.state.searchString;

    SC.initialize({
      client_id: SOUND_CLOUD_KEY
    });

    SC.get('/tracks', {
      q: query,
      license: 'cc-by-sa'
    }).then(function(tracks) {
      context.setState({songs: tracks});
      console.log(context.state.songs);
    });
  },
  doiexist: function() {
    console.log('i exist');
    console.log(this.state.songs[0].description);
  },
  render: function() {
    return(<div>
              Search For a Song or Aritst: <br />
              <input type="text" value={this.state.searchString} onChange={this.handleChange} ></input>
              <button type="button" onClick={this.getSongs} placeholder="">Search</button>
              <button type="button" onClick={this.doiexist}>doiexist</button>
           </div>)
  }
});

// var Song = React.createClass({
//   render: function() {

//   }
// });

// var SongQueue = React.createClass({
//   render: function() {

//   }
// });

// var Player = React.createClass({
//   render: function() {

//   }
// });

React.render(<App />, document.body)






// Components:
  //  App
  //  SearchBar
  //  SongResultsDisplay
  //  Song --> title, artist, etc
  //  Playlist

// songProps
// artwork_url
// genre
// duration
// title
// user --> user object, contains user profile data
// state? --> "finished"
// premalink_url --> auto play opens on soundcloud
// id --> num --> streaming = /tracks/id


// var App = React.createClass({
//   render: function() {
//     return (<div className="container">
//         Hola, world
//         <SearchBar />
//       </div>);
//   }
// });
// var list = [];

// var SearchBar = React.createClass({
//   getSongs: function(query) {
//     SC.initialize({
//       client_id: '9cf8c397a36be5e79964b5c800788392'
//     });
//     SC.get('/tracks', {
//       q: query,
//       license: 'cc-by-sa'
//     }).then(function(tracks) {
//       console.log(tracks);
//       list = tracks;
//       console.log('tracks/' + tracks[0].id);
//       // SC.stream('/tracks/' + tracks[0].id).then(function(player){
//       //   player.play();
//       // });
//     });
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var searchQuery = this.refs.search.getDOMNode().value;
//     console.log(searchQuery);
//     this.getSongs(searchQuery);
//     this.refs.search.getDOMNode().value = '';
//   },
//   render: function() {
//     return(<form onSubmit={this.handleSubmit}>
//               Search For a Song or Aritst: <br />
//               <input type="text" id="search" defaultValue="" ref="search"></input>
//               <button type="submit" placeholder="Jimi Hendrix">Search</button>
//            </form>)
//   }
// });
// var SongQueue = React.createClass({
//   // add songs on search
//   render: function() {
    
//   }
// });

// var Song = React.createClass({
//   render: function() {
//     return (<div>
//               <h2>{ this.props.title }</h2>
//             </div>)
//   }
// })

// // artwork_url: "https://i1.sndcdn.com/artworks-000077325920-ecs8lu-large.jpg"
// // description: "Avril Lavigne performing Hello Kitty. (C) 2014 Epic Records, a unit of Sony Music Entertainment. Buy the "Avril Lavigne" album here: http://smarturl.it/avril-lavigne (Download the remix free)"
// // genre: "Metal"
// // id: 146025784
// // original_format: "mp3"
// // permalink: "avril-lavigne-hello-kitty-metal-version-remix-by-flexo"
// // permalink_url: "https://soundcloud.com/avrillavignemusic/avril-lavigne-hello-kitty-metal-version-remix-by-flexo"
// // playback_count: 148389
// // release_day: 22
// // release_month: 4
// // release_year: 2014
// // state: "finished"
// // stream_url: "https://api.soundcloud.com/tracks/146025784/stream"
// // streamable: true
// // tag_list: "Dubstep Metal Rock Remix "Hello Kitty" 2014"
// // title: "Avril Lavigne - Hello Kitty (Metal Version) [Remix by FlexO]"
// // user: Object
// // user_id: 90870361
// // user_playback_count: null
// // waveform_url: "https://w1.sndcdn.com/V4D0bC22RND3_m.png"







// React.render(<App />, document.body)













