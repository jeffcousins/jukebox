/** @jsx React.DOM */

  $(window).scroll(function(){
        $('.playerQueue').css('left', 0 - $(this).scrollLeft());
    });


var App = React.createClass({
  getInitialState: function() {
    return {searchString: '',
            songs: [],
            playerQueue: []};
  },
  loadSongs: getSongs,
  handleSearch: function(childString) {
    this.setState({searchString: childString});
  },
  handleQueue: function(song) {
    var newPlayerQueue = this.state.playerQueue;
    console.log(newPlayerQueue.push(song));
    this.setState({playerQueue: newPlayerQueue});
    console.log(this.state.playerQueue)
  },
  render: function() {
    return (<div className="container">
            <div className="row">
            Main App
              <SearchBar loadSongs={this.loadSongs} grabSearch={this.handleSearch} />
              <SongQueue songs={this.state.songs} handleQueue={this.handleQueue} />
            </div>
            <Player songs={this.state.playerQueue} handleQueue={this.handleQueue} />
            </div>
            )
  }
});

var SearchBar = React.createClass({
  sendToParent: function() {
    var userInput = this.refs.userInput.getDOMNode().value;
    this.props.grabSearch(userInput);
    this.props.loadSongs(userInput);
  },
  render: function() {
    return(<div>
              Search For a Song or Artist: <br />
              <input type="text" placeholder="type here" ref="userInput"></input>
              <button type="button" onClick={this.sendToParent} placeholder="">Search</button>
           </div>)
  }
});

// this.props.handleQueue
var Song = React.createClass({
  addToPlayer: function() {
    this.props.handleQueue(this.props.song);
  },
  render: function() {
    return (

          <div className="card col-xs-2 cardview" key={this.props.song.title}>
              <img className="card-img-top" src={this.props.song.artwork_url || 'https:i1.sndcdn.com/artworks-000077325920-ecs8lu-large.jpg'} alt="album artwork" />
              <div className="card-block">
                <h5 className="card-title">{this.props.song.title.slice(0, 15)}</h5>
                <p className="card-text">{this.props.song.genre || 'Disco'} - {this.props.song['release_year'] || 2015}</p>
                <a href="#" className="btn btn-primary" onClick={this.addToPlayer}>Play | Add</a>
            </div>
          </div>
          )
  }
});

// for search results
// new SongQueue songs={this.state.searchresults}

// for play next queue
// new SongQueue songs={this.state.songQueue}

// passed in when rendering SongQueue: <SongQueue boxHeader={SearchBar.getSongs}/>
// passed in when rendering SongQueue: handleQueue={this.handleQueue} --- this.props.handleQueue
var SongQueue = React.createClass({
  
  render: function() {
    var context = this;// pass in all found songs --> this.props.songs
    var songs = context.props.songs.map(function(song) {
      return <Song song={song} key={song.title} handleQueue={context.props.handleQueue} />
    });

    return (<div className="container">
              <div className="row">
                {songs}
              </div>
            </div>)
  }
});
      // SC.stream('/tracks/' + tracks[0].id).then(function(player){
      //   player.play();
      // });

var Controls = React.createClass({
  getInitialState: function() {
    return {currentSong: '',
            currentPicture: 'https:i1.sndcdn.com/artworks-000077325920-ecs8lu-large.jpg'};
  },
  playNow: function() {
    var context = this;
    SC.stream('/tracks/' + context.props.song.id).then(function(player){
      player.play();
    });
  },
  render: function() {
    return (<div id='controller' className="col-xs-3">
          <img id="currentPicture"src={this.state.currentPicture} style={{"opacity" :"1", "z-index": "5"}} /><br />
          <button onClick={this.playNow}type="button" className="btn btn-default" aria-label="Left Align" id="play"><span className="glyphicon glyphicon-play"></span></button>
          <button type="button" className="btn btn-default" aria-label="Left Align" id="pause"><span className="glyphicon glyphicon-pause"></span></button>
          <button type="button" className="btn btn-default" aria-label="Left Align" id="stop"><span className="glyphicon glyphicon-stop"></span></button>
      </div>)
  }
});
//this.props.songs === App playerQueue array
//                    [  [ ]   [ ]   [ ]   [ ]   [ ]  ] className={this.props.colsize}
                    // [           ] [ [] [] [] [] []  ] 
var Player = React.createClass({
  render: function() {
    return (
            <footer className="footer-fixed-bottom playerQueue" id="footer">
              <div className="container">
                <div className='row'>
                  <Controls song={this.props.songs[0]} />
                  <div className="col-xs-9 " >
                    <SongQueue songs={this.props.songs} />
                  </div>
                </div>
              </div>
            </footer>)
  }
});

React.render(<App />, document.getElementById('main'))


// <div className="container">
//   <div className="row">
//     <div id='main' className='col-lg-6'>
//     <div>
//       Main App
//       // SearchBar
//       <div>
//         Search For a Song or Aritst: <br />
//         <input type="text" placeholder="type here" ref="userInput"></input>
//         <button type="button" onClick={this.sendToParent} placeholder="">Search</button>
//       </div>
//       // SongQueue
//       <div>
//         // Songs
//         <div className="card" key={this.props.song.title}>
//           <img className="card-img-top" src={this.props.song.artwork_url} alt="Card image cap"></img>
//           <div className="card card-block">
//             <h4 className="card-title">Card title</h4>
//             <p className="card-text">{this.props.song.description}</p>
//             <a href="#" className="btn btn-primary">Button</a>
//         </div>
//       </div>
//       </div>
//       <button onClick={this.logger}>Logger</button>
//     </div>
// </div>
//   </div>
// </div>
// <div></div>










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
      // SC.stream('/tracks/' + tracks[0].id).then(function(player){
      //   player.play();
      // });
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

// artwork_url: "https://i1.sndcdn.com/artworks-000077325920-ecs8lu-large.jpg"
// description: "Avril Lavigne performing Hello Kitty. (C) 2014 Epic Records, a unit of Sony Music Entertainment. Buy the "Avril Lavigne" album here: http://smarturl.it/avril-lavigne (Download the remix free)"
// genre: "Metal"
// id: 146025784
// original_format: "mp3"
// permalink: "avril-lavigne-hello-kitty-metal-version-remix-by-flexo"
// permalink_url: "https://soundcloud.com/avrillavignemusic/avril-lavigne-hello-kitty-metal-version-remix-by-flexo"
// playback_count: 148389
// release_day: 22
// release_month: 4
// release_year: 2014
// state: "finished"
// stream_url: "https://api.soundcloud.com/tracks/146025784/stream"
// streamable: true
// tag_list: "Dubstep Metal Rock Remix "Hello Kitty" 2014"
// title: "Avril Lavigne - Hello Kitty (Metal Version) [Remix by FlexO]"
// user: Object
// user_id: 90870361
// user_playback_count: null
// waveform_url: "https://w1.sndcdn.com/V4D0bC22RND3_m.png"







// React.render(<App />, document.body)













