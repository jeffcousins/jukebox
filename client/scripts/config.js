var SOUND_CLOUD_KEY =  '9cf8c397a36be5e79964b5c800788392';


var getSongs = function(userInput) {
    var context = this;
    var query = userInput;

    SC.initialize({
      client_id: SOUND_CLOUD_KEY
    });

    SC.get('/tracks', {
      limit: 50,
      q: query,
      license: 'cc-by-sa'
    }).then(function(tracks) {
      console.log(tracks)
      context.setState({songs: tracks});
    });
  }
