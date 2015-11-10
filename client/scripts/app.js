

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

var App = React.createClass({
  render: function() {
    return (<div className="container">
        Hola, world
        <SearchBar />
      </div>);
  }
});

var SearchBar = React.createClass({
  getSongs: function(query) {
    SC.initialize({
      client_id: '9cf8c397a36be5e79964b5c800788392'
    });
    SC.get('/tracks', {
      q: query,
      license: 'cc-by-sa'
    }).then(function(tracks) {
      console.log('tracks/' + tracks[0].id);
      SC.stream('/tracks/' + tracks[0].id).then(function(player){
        player.play();
      });
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var searchQuery = this.refs.search.getDOMNode().value;
    console.log(searchQuery);
    this.getSongs(searchQuery);
    this.refs.search.getDOMNode().value = '';
  },
  render: function() {
    return(<form onSubmit={this.handleSubmit}>
              Search For a Song or Aritst: <br />
              <input type="text" id="search" defaultValue="" ref="search"></input>
              <button type="submit" placeholder="Jimi Hendrix">Search</button>
           </form>)
  }
});

React.render(<App />, document.body)