import fetch from 'node-fetch';

let playlists = [];
let artists = [];

const urlDatos = 'https://spotify23.p.rapidapi.com/user_profile/?id=monsterberg&playlistLimit=20&artistLimit=10';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7f9957d316mshe8a676c0e954363p1bb84fjsn6c7ee451e234',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

function fetchData(url) {
    try {
        return fetch(url, options);
    } catch (error) {
        console.error(error);
    }
}

fetchData(urlDatos)
    .then((result) => result.json())
    .then(datos => {

        //RESULTADOS:
        console.group("DATOS DE USUARIO:")
        console.log(`Nombre de Usuario: ${datos.name}`);
        console.log(`Seguidores: ${datos.followers_count}`);
        console.log(`Siguiendo: ${datos.following_count}`);
        console.groupEnd();
 
        // ARTISTAS RECIENTEMENTE ESCUCHAD0S:
        datos.recently_played_artists.map(artist => {
            let artistUrl = artist.uri;
            let artistName = artist.name;
            let artistImg = artist.image_url;

            artists.push({artistUrl, artistName, artistImg});
        });
 
        // PLAYLISTS PUBLICAS:
        datos.public_playlists.map(playlist => {
            let idPlaylist = playlist.uri.toString().replace("spotify:playlist:", "");
            let namePlaylist = playlist.name;
            let ownerPlaylist = playlist.owner_name;
            let imgPlaylist = playlist.image_url.toString().replace("spotify:image:", "https://i.scdn.co/image/");

            playlists.push({idPlaylist, namePlaylist, ownerPlaylist, imgPlaylist});
        });

    }).finally( () => {
        console.log(artists);
        console.log(playlists);
    })