var SOUND_CLOUD_KEY =  '9cf8c397a36be5e79964b5c800788392';


var getSongs = function(query) {
  SC.initialize({
    client_id: SOUND_CLOUD_KEY
  });

  SC.get('/tracks', {
    q: query,
    license: 'cc-by-sa'
  }).then(function(tracks) {
    console.log(tracks['genre']);
    console.log(tracks[0].description);
  });
}